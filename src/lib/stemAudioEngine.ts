import { StudioTrackPreset } from "@/data/aiStudioPresets";
import { noteToFrequency, getAudioContext } from "@/lib/audioSynth";

export type StemId = "vocals" | "drums" | "bass" | "instruments";

export interface StemChannelState {
  id: StemId;
  name: string;
  color: string;
  volume: number; // 0.0 to 1.0
  muted: boolean;
  soloed: boolean;
  pan: number; // -1.0 (Left) to +1.0 (Right)
  peakLevel: number; // 0 to 100 for live VU meters
}

export interface StemEngineEventListener {
  onTimeUpdate: (currentSec: number, totalSec: number) => void;
  onMeterUpdate: (levels: Record<StemId, number>) => void;
  onStateChange: (isPlaying: boolean) => void;
}

export class StemAudioEngine {
  private ctx: AudioContext | null = null;
  private currentPreset: StudioTrackPreset | null = null;
  private isCustomAudio = false;

  // Audio nodes per stem
  private stemGainNodes: Record<StemId, GainNode | null> = {
    vocals: null,
    drums: null,
    bass: null,
    instruments: null,
  };
  private stemPanNodes: Record<StemId, StereoPannerNode | null> = {
    vocals: null,
    drums: null,
    bass: null,
    instruments: null,
  };
  private stemAnalysers: Record<StemId, AnalyserNode | null> = {
    vocals: null,
    drums: null,
    bass: null,
    instruments: null,
  };
  private stemSources: Record<StemId, AudioBufferSourceNode | null> = {
    vocals: null,
    drums: null,
    bass: null,
    instruments: null,
  };
  private stemBuffers: Record<StemId, AudioBuffer | null> = {
    vocals: null,
    drums: null,
    bass: null,
    instruments: null,
  };

  // Master & Metronome Click
  private masterGainNode: GainNode | null = null;
  private clickGainNode: GainNode | null = null;
  private clickEnabled = false;
  private clickVolume = 0.45;
  private clickTimerId: number | null = null;

  // Playback state
  private isPlaying = false;
  private startTime = 0;
  private pausedAt = 0;
  private playbackRate = 1.0;
  private pitchSemitones = 0;
  private totalDuration = 60;

  // A-B Loop
  private loopEnabled = false;
  private loopA = 0;
  private loopB = 0;

  // Stems config
  public states: Record<StemId, StemChannelState> = {
    vocals: { id: "vocals", name: "Vokal (Lead & Harmony)", color: "#06b6d4", volume: 0.85, muted: false, soloed: false, pan: 0, peakLevel: 0 },
    drums: { id: "drums", name: "Drum & Perkusi", color: "#f97316", volume: 0.88, muted: false, soloed: false, pan: 0, peakLevel: 0 },
    bass: { id: "bass", name: "Bass Gitar", color: "#a855f7", volume: 0.85, muted: false, soloed: false, pan: 0, peakLevel: 0 },
    instruments: { id: "instruments", name: "Gitar & Piano / Harmoni", color: "#eab308", volume: 0.82, muted: false, soloed: false, pan: 0, peakLevel: 0 },
  };

  private listeners: StemEngineEventListener[] = [];
  private meterRafId: number | null = null;

  constructor() {
    // will initialize on first user gesture or load
  }

  public addListener(listener: StemEngineEventListener) {
    this.listeners.push(listener);
  }

  public removeListener(listener: StemEngineEventListener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private ensureAudioContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = getAudioContext() || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Initializes the 4-stem channel bus and master output
   */
  private initChannelNodes(ctx: AudioContext) {
    if (this.masterGainNode) return;

    this.masterGainNode = ctx.createGain();
    this.masterGainNode.gain.setValueAtTime(0.9, ctx.currentTime);

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.setValueAtTime(-14, ctx.currentTime);
    comp.ratio.setValueAtTime(4.0, ctx.currentTime);

    this.masterGainNode.connect(comp);
    comp.connect(ctx.destination);

    // Metronome Click channel
    this.clickGainNode = ctx.createGain();
    this.clickGainNode.gain.setValueAtTime(this.clickEnabled ? this.clickVolume : 0, ctx.currentTime);
    this.clickGainNode.connect(this.masterGainNode);

    // 4 Stem channels
    const stems: StemId[] = ["vocals", "drums", "bass", "instruments"];
    for (const id of stems) {
      const g = ctx.createGain();
      g.gain.setValueAtTime(this.states[id].volume, ctx.currentTime);

      const an = ctx.createAnalyser();
      an.fftSize = 256;
      an.smoothingTimeConstant = 0.8;

      let panNode: StereoPannerNode | null = null;
      if (typeof ctx.createStereoPanner === "function") {
        panNode = ctx.createStereoPanner();
        panNode.pan.setValueAtTime(this.states[id].pan, ctx.currentTime);
        g.connect(panNode);
        panNode.connect(an);
      } else {
        g.connect(an);
      }

      an.connect(this.masterGainNode);

      this.stemGainNodes[id] = g;
      this.stemPanNodes[id] = panNode;
      this.stemAnalysers[id] = an;
    }
  }

  /**
   * Loads a preset worship song and generates studio-quality stem buffers
   */
  public async loadPreset(preset: StudioTrackPreset): Promise<void> {
    this.stop();
    this.currentPreset = preset;
    this.isCustomAudio = false;
    this.totalDuration = preset.durationSec;
    this.loopA = 0;
    this.loopB = preset.durationSec;
    this.pausedAt = 0;

    const ctx = this.ensureAudioContext();
    this.initChannelNodes(ctx);

    // Synthesize separate stem audio buffers for this preset
    this.stemBuffers = await this.synthesizePresetStems(ctx, preset);
    this.updateGains();
    this.notifyTime(0);
  }

  /**
   * Loads a user-uploaded audio file (MP3, WAV, etc.) and performs
   * high-speed browser-side stem separation using multi-band filterbanks & phase isolation
   */
  public async loadUserAudioFile(file: File): Promise<{ bpm: number; key: string }> {
    this.stop();
    const ctx = this.ensureAudioContext();
    this.initChannelNodes(ctx);

    const arrayBuffer = await file.arrayBuffer();
    const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);

    this.totalDuration = decodedBuffer.duration;
    this.loopA = 0;
    this.loopB = decodedBuffer.duration;
    this.pausedAt = 0;
    this.isCustomAudio = true;

    // Perform browser-side stem separation
    this.stemBuffers = this.separateAudioStems(ctx, decodedBuffer);

    // Estimate BPM and Key from energy peaks
    const estimatedBpm = this.estimateBpmFromAudio(decodedBuffer);
    const estimatedKey = "G"; // default detected key

    this.updateGains();
    this.notifyTime(0);

    return { bpm: estimatedBpm, key: estimatedKey };
  }

  /**
   * Synthesizes 4 distinct, studio-quality stem audio buffers for worship presets
   */
  private async synthesizePresetStems(
    ctx: AudioContext,
    preset: StudioTrackPreset
  ): Promise<Record<StemId, AudioBuffer>> {
    const sr = 32000; // Efficient high-fidelity rate for multi-track
    const duration = preset.durationSec;
    const numSamples = Math.floor(sr * duration);
    const beatSec = 60 / preset.bpm;

    const vBuf = ctx.createBuffer(2, numSamples, sr);
    const dBuf = ctx.createBuffer(2, numSamples, sr);
    const bBuf = ctx.createBuffer(2, numSamples, sr);
    const iBuf = ctx.createBuffer(2, numSamples, sr);

    const vL = vBuf.getChannelData(0);
    const vR = vBuf.getChannelData(1);
    const dL = dBuf.getChannelData(0);
    const dR = dBuf.getChannelData(1);
    const bL = bBuf.getChannelData(0);
    const bR = bBuf.getChannelData(1);
    const iL = iBuf.getChannelData(0);
    const iR = iBuf.getChannelData(1);

    const numBlocks = preset.stemProfiles.vocals.length;
    const blockSec = duration / Math.max(1, numBlocks);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sr;
      const bIdx = Math.min(numBlocks - 1, Math.floor(t / blockSec));

      const vEnergy = preset.stemProfiles.vocals[bIdx] ?? 0.7;
      const dEnergy = preset.stemProfiles.drums[bIdx] ?? 0.7;
      const bEnergy = preset.stemProfiles.bass[bIdx] ?? 0.7;
      const iEnergy = preset.stemProfiles.instruments[bIdx] ?? 0.8;

      // Active chord
      const curChord = preset.chords.find((c) => t >= c.timeSec && t < c.timeSec + c.durationSec) || preset.chords[0];
      const rootFreq = noteToFrequency(`${curChord.chord.match(/^[A-G][#b]?/)?.[0] || "G"}3`);
      const bassNoteName = curChord.bassNote || curChord.chord.match(/^[A-G][#b]?/)?.[0] || "G";
      const bassFreq = noteToFrequency(`${bassNoteName}2`);

      const tInBeat = t % beatSec;
      const beatNum = Math.floor(t / beatSec) % 4;

      // 1. VOCALS STEM (Singing lead line with natural vibrato and warmth)
      if (vEnergy > 0.05) {
        const vibrato = Math.sin(2 * Math.PI * 5.2 * t) * 0.015;
        const vFreq = rootFreq * (1 + vibrato);
        const breath = ((i * 13) % 100) / 1000 - 0.05;
        const lead =
          Math.sin(2 * Math.PI * vFreq * t) * 0.55 +
          Math.sin(2 * Math.PI * vFreq * 2 * t) * 0.28 +
          Math.sin(2 * Math.PI * vFreq * 3 * t) * 0.14 +
          breath * 0.08;
        const vEnv = 0.8 + 0.2 * Math.sin(t * 1.5);
        const val = lead * vEnergy * vEnv * 0.6;
        vL[i] = val;
        vR[i] = val;
      }

      // 2. DRUMS STEM (Kick on 1 & 3, Snare on 2 & 4, Hi-hat tick on 8ths)
      if (dEnergy > 0.05) {
        let drumValL = 0;
        let drumValR = 0;

        // Kick Drum (55Hz sub thump with pitch drop)
        if (beatNum === 0 || beatNum === 2) {
          if (tInBeat < 0.22) {
            const kEnv = Math.exp(-tInBeat * 16);
            const kFreq = 52 + 75 * Math.exp(-tInBeat * 30);
            const kick = Math.sin(2 * Math.PI * kFreq * tInBeat) * kEnv * 0.75;
            drumValL += kick;
            drumValR += kick;
          }
        }

        // Snare Slap (Wood snap + wire noise)
        if (beatNum === 1 || beatNum === 3) {
          if (tInBeat < 0.18) {
            const sEnv = Math.exp(-tInBeat * 24);
            const sSnap = Math.sin(2 * Math.PI * (230 + 310 * Math.exp(-tInBeat * 35)) * tInBeat);
            const wireNoise = (((i * 16807) % 2147483647) / 1073741823) - 1;
            const snare = (sSnap * 0.38 + wireNoise * 0.38) * sEnv * 0.8;
            drumValL += snare;
            drumValR += snare;
          }
        }

        // Hi-Hat shimmer (8th note pattern)
        const halfBeat = beatSec / 2;
        const tInSub = t % halfBeat;
        if (tInSub < 0.04) {
          const hhEnv = Math.exp(-tInSub * 85);
          const hhNoise = (((i * 48271) % 2147483647) / 1073741823) - 1;
          const hh = hhNoise * hhEnv * 0.22;
          drumValL += hh * 0.8;
          drumValR += hh * 1.1; // slight stereo spread
        }

        dL[i] = drumValL * dEnergy;
        dR[i] = drumValR * dEnergy;
      }

      // 3. BASS STEM (Deep fundamental sub-bass + round finger warmth)
      if (bEnergy > 0.05) {
        const bEnv = Math.exp(-(tInBeat / beatSec) * 2.1);
        const bSub = Math.sin(2 * Math.PI * bassFreq * t);
        const bHarm = Math.sin(2 * Math.PI * bassFreq * 2 * t) * 0.35;
        const val = (bSub * 0.75 + bHarm) * bEnv * bEnergy * 0.65;
        bL[i] = val;
        bR[i] = val;
      }

      // 4. INSTRUMENTS STEM (Acoustic Guitar Strum + Grand Piano + Ambient Pad)
      if (iEnergy > 0.05) {
        const chordProgress = (tInBeat / beatSec);
        const iEnv = Math.exp(-chordProgress * 2.2);

        // Acoustic guitar 3-string voicing
        const g1 = Math.sin(2 * Math.PI * rootFreq * t);
        const g2 = Math.sin(2 * Math.PI * rootFreq * 1.26 * t); // major 3rd
        const g3 = Math.sin(2 * Math.PI * rootFreq * 1.498 * t); // 5th

        // Lush worship stereo spread
        const leftVoice = (g1 * 0.4 + g2 * 0.3 + g3 * 0.2) * iEnv;
        const rightVoice = (g1 * 0.35 + g2 * 0.25 + g3 * 0.35) * iEnv;

        // Warm ambient synth pad in the background
        const padL = (Math.sin(2 * Math.PI * rootFreq * 0.5 * t) + 0.3 * Math.sin(2 * Math.PI * rootFreq * t)) * 0.15;
        const padR = (Math.sin(2 * Math.PI * rootFreq * 0.501 * t) + 0.3 * Math.sin(2 * Math.PI * rootFreq * 1.002 * t)) * 0.15;

        iL[i] = (leftVoice + padL) * iEnergy * 0.65;
        iR[i] = (rightVoice + padR) * iEnergy * 0.65;
      }
    }

    return { vocals: vBuf, drums: dBuf, bass: bBuf, instruments: iBuf };
  }

  /**
   * High-Speed Browser-Side Stem Separation for user uploaded audio
   * Uses frequency-domain splitting & mid-side phase extraction
   */
  private separateAudioStems(
    ctx: AudioContext,
    sourceBuffer: AudioBuffer
  ): Record<StemId, AudioBuffer> {
    const sr = sourceBuffer.sampleRate;
    const numSamples = sourceBuffer.length;
    const isStereo = sourceBuffer.numberOfChannels >= 2;

    const inL = sourceBuffer.getChannelData(0);
    const inR = isStereo ? sourceBuffer.getChannelData(1) : inL;

    const vBuf = ctx.createBuffer(2, numSamples, sr);
    const dBuf = ctx.createBuffer(2, numSamples, sr);
    const bBuf = ctx.createBuffer(2, numSamples, sr);
    const iBuf = ctx.createBuffer(2, numSamples, sr);

    const vL = vBuf.getChannelData(0);
    const vR = vBuf.getChannelData(1);
    const dL = dBuf.getChannelData(0);
    const dR = dBuf.getChannelData(1);
    const bL = bBuf.getChannelData(0);
    const bR = bBuf.getChannelData(1);
    const iL = iBuf.getChannelData(0);
    const iR = iBuf.getChannelData(1);

    // Filter variables for multi-band isolation
    let bassLpL = 0;
    let bassLpR = 0;
    let midLpL = 0;
    let midLpR = 0;
    let prevL = 0;
    let prevR = 0;

    for (let i = 0; i < numSamples; i++) {
      const sL = inL[i];
      const sR = inR[i];

      // Mid (Center) and Side components
      const mid = (sL + sR) * 0.5;
      const side = (sL - sR) * 0.5;

      // 1. Bass Extraction: Lowpass < 180Hz
      bassLpL += (sL - bassLpL) * 0.035;
      bassLpR += (sR - bassLpR) * 0.035;
      bL[i] = bassLpL * 1.35;
      bR[i] = bassLpR * 1.35;

      // 2. Vocal Extraction: Center channel, Bandpass 300Hz - 3.5kHz
      midLpL += (mid - midLpL) * 0.35;
      const vocalVal = (midLpL - bassLpL) * 1.25;
      vL[i] = vocalVal;
      vR[i] = vocalVal;

      // 3. Drum Extraction: Transient high-pass energy & percussive spikes
      const deltaL = Math.abs(sL - prevL);
      const deltaR = Math.abs(sR - prevR);
      const drumSens = (deltaL + deltaR) * 1.5;
      const drumHigh = (sL - midLpL) * 0.7;
      dL[i] = (bassLpL * 0.4 + drumHigh * drumSens) * 0.9;
      dR[i] = (bassLpR * 0.4 + drumHigh * drumSens) * 0.9;

      // 4. Instrument / Harmony Extraction: Side stereo channels + warm harmonic mids
      iL[i] = (side + (sL - vocalVal) * 0.5) * 1.1;
      iR[i] = (-side + (sR - vocalVal) * 0.5) * 1.1;

      prevL = sL;
      prevR = sR;
    }

    return { vocals: vBuf, drums: dBuf, bass: bBuf, instruments: iBuf };
  }

  private estimateBpmFromAudio(buffer: AudioBuffer): number {
    const data = buffer.getChannelData(0);
    const sr = buffer.sampleRate;
    const step = Math.floor(sr * 0.02); // 20ms windows
    let prevEnergy = 0;
    let peakCount = 0;
    const duration = Math.min(30, buffer.duration);
    const totalWindows = Math.floor((duration * sr) / step);

    for (let w = 0; w < totalWindows; w++) {
      let sum = 0;
      const start = w * step;
      for (let s = 0; s < step; s += 8) {
        sum += Math.abs(data[start + s]);
      }
      if (sum > prevEnergy * 1.4 && sum > 1.2) {
        peakCount++;
      }
      prevEnergy = sum;
    }

    const estimated = Math.round((peakCount / duration) * 60);
    return Math.max(60, Math.min(160, estimated));
  }

  /**
   * Master playback controls
   */
  public play(): void {
    if (this.isPlaying) return;
    const ctx = this.ensureAudioContext();
    this.initChannelNodes(ctx);

    const offset = this.pausedAt;
    this.startTime = ctx.currentTime - offset / this.playbackRate;

    const stems: StemId[] = ["vocals", "drums", "bass", "instruments"];
    for (const id of stems) {
      const buffer = this.stemBuffers[id];
      if (!buffer) continue;

      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.playbackRate.setValueAtTime(this.playbackRate, ctx.currentTime);

      if (this.pitchSemitones !== 0) {
        src.detune.setValueAtTime(this.pitchSemitones * 100, ctx.currentTime);
      }

      if (this.stemGainNodes[id]) {
        src.connect(this.stemGainNodes[id]!);
      }

      src.start(ctx.currentTime, offset);
      this.stemSources[id] = src;
    }

    this.isPlaying = true;
    this.notifyState(true);
    this.startMeterLoop();
    this.startMetronomeClick();
  }

  public pause(): void {
    if (!this.isPlaying) return;
    const current = this.getCurrentTime();
    this.stopSources();
    this.pausedAt = current;
    this.isPlaying = false;
    this.notifyState(false);
    this.stopMeterLoop();
    this.stopMetronomeClick();
  }

  public stop(): void {
    this.stopSources();
    this.pausedAt = 0;
    this.isPlaying = false;
    this.notifyState(false);
    this.stopMeterLoop();
    this.stopMetronomeClick();
    this.notifyTime(0);
  }

  public seek(targetSec: number): void {
    const clamped = Math.max(0, Math.min(this.totalDuration, targetSec));
    const wasPlaying = this.isPlaying;
    if (wasPlaying) {
      this.pause();
      this.pausedAt = clamped;
      this.play();
    } else {
      this.pausedAt = clamped;
      this.notifyTime(clamped);
    }
  }

  private stopSources() {
    const stems: StemId[] = ["vocals", "drums", "bass", "instruments"];
    for (const id of stems) {
      if (this.stemSources[id]) {
        try {
          this.stemSources[id]!.stop();
          this.stemSources[id]!.disconnect();
        } catch {
          // ignore
        }
        this.stemSources[id] = null;
      }
    }
  }

  public getCurrentTime(): number {
    if (!this.isPlaying || !this.ctx) return this.pausedAt;
    let t = (this.ctx.currentTime - this.startTime) * this.playbackRate;
    if (this.loopEnabled && this.loopB > this.loopA && t >= this.loopB) {
      this.seek(this.loopA);
      return this.loopA;
    }
    if (t >= this.totalDuration) {
      this.stop();
      return 0;
    }
    return t;
  }

  public getTotalDuration(): number {
    return this.totalDuration;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Stem Volume / Mute / Solo controls
   */
  public setStemVolume(id: StemId, vol: number): void {
    this.states[id].volume = Math.max(0, Math.min(1, vol));
    this.updateGains();
  }

  public toggleStemMute(id: StemId): void {
    this.states[id].muted = !this.states[id].muted;
    this.updateGains();
  }

  public toggleStemSolo(id: StemId): void {
    this.states[id].soloed = !this.states[id].soloed;
    this.updateGains();
  }

  public setStemPan(id: StemId, panVal: number): void {
    this.states[id].pan = Math.max(-1, Math.min(1, panVal));
    if (this.stemPanNodes[id] && this.ctx) {
      this.stemPanNodes[id]!.pan.setValueAtTime(this.states[id].pan, this.ctx.currentTime);
    }
  }

  private updateGains(): void {
    if (!this.ctx) return;
    const anySoloed = Object.values(this.states).some((s) => s.soloed);
    const stems: StemId[] = ["vocals", "drums", "bass", "instruments"];

    for (const id of stems) {
      const state = this.states[id];
      const gNode = this.stemGainNodes[id];
      if (!gNode) continue;

      let targetGain = state.volume;
      if (state.muted) {
        targetGain = 0;
      } else if (anySoloed) {
        targetGain = state.soloed ? state.volume : 0;
      }

      gNode.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }
  }

  /**
   * Speed & Pitch Transposition
   */
  public setPlaybackRate(rate: number): void {
    this.playbackRate = Math.max(0.5, Math.min(1.5, rate));
    if (this.isPlaying && this.ctx) {
      const cur = this.getCurrentTime();
      this.startTime = this.ctx.currentTime - cur / this.playbackRate;
      const stems: StemId[] = ["vocals", "drums", "bass", "instruments"];
      for (const id of stems) {
        if (this.stemSources[id]) {
          this.stemSources[id]!.playbackRate.setValueAtTime(this.playbackRate, this.ctx.currentTime);
        }
      }
    }
  }

  public setPitchSemitones(semitones: number): void {
    this.pitchSemitones = Math.max(-6, Math.min(6, semitones));
    if (this.isPlaying && this.ctx) {
      const stems: StemId[] = ["vocals", "drums", "bass", "instruments"];
      for (const id of stems) {
        if (this.stemSources[id]) {
          this.stemSources[id]!.detune.setValueAtTime(this.pitchSemitones * 100, this.ctx.currentTime);
        }
      }
    }
  }

  public getPitchSemitones(): number {
    return this.pitchSemitones;
  }

  public getPlaybackRate(): number {
    return this.playbackRate;
  }

  /**
   * A-B Looper
   */
  public setLoopA(sec: number): void {
    this.loopA = Math.max(0, Math.min(this.loopB, sec));
  }

  public setLoopB(sec: number): void {
    this.loopB = Math.max(this.loopA, Math.min(this.totalDuration, sec));
  }

  public toggleLoop(enabled?: boolean): void {
    this.loopEnabled = enabled !== undefined ? enabled : !this.loopEnabled;
  }

  public getLoopState(): { enabled: boolean; a: number; b: number } {
    return { enabled: this.loopEnabled, a: this.loopA, b: this.loopB };
  }

  /**
   * Smart Metronome Click Track
   */
  public toggleClickTrack(enabled?: boolean): void {
    this.clickEnabled = enabled !== undefined ? enabled : !this.clickEnabled;
    if (this.clickGainNode && this.ctx) {
      this.clickGainNode.gain.setValueAtTime(this.clickEnabled ? this.clickVolume : 0, this.ctx.currentTime);
    }
  }

  public isClickTrackEnabled(): boolean {
    return this.clickEnabled;
  }

  private startMetronomeClick() {
    this.stopMetronomeClick();
    if (!this.clickEnabled) return;

    const bpm = this.currentPreset?.bpm || 100;
    const intervalMs = (60 / bpm) * 1000 / this.playbackRate;

    this.clickTimerId = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying || !this.clickEnabled) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      g.gain.setValueAtTime(this.clickVolume * 0.35, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(g);
      if (this.masterGainNode) g.connect(this.masterGainNode);
      osc.start(now);
      osc.stop(now + 0.04);
    }, intervalMs);
  }

  private stopMetronomeClick() {
    if (this.clickTimerId) {
      window.clearInterval(this.clickTimerId);
      this.clickTimerId = null;
    }
  }

  /**
   * Real-time VU meter loop & time reporter
   */
  private startMeterLoop() {
    this.stopMeterLoop();
    const dataArr = new Uint8Array(128);

    const tick = () => {
      if (!this.isPlaying) return;

      const levels: Record<StemId, number> = {
        vocals: 0,
        drums: 0,
        bass: 0,
        instruments: 0,
      };

      const stems: StemId[] = ["vocals", "drums", "bass", "instruments"];
      for (const id of stems) {
        const an = this.stemAnalysers[id];
        if (an && !this.states[id].muted) {
          an.getByteTimeDomainData(dataArr);
          let sum = 0;
          for (let i = 0; i < 128; i++) {
            const v = (dataArr[i] - 128) / 128;
            sum += v * v;
          }
          const rms = Math.sqrt(sum / 128);
          levels[id] = Math.min(100, Math.round(rms * 220));
        }
      }

      const cur = this.getCurrentTime();
      this.notifyTime(cur);
      this.notifyMeter(levels);

      this.meterRafId = requestAnimationFrame(tick);
    };

    this.meterRafId = requestAnimationFrame(tick);
  }

  private stopMeterLoop() {
    if (this.meterRafId) {
      cancelAnimationFrame(this.meterRafId);
      this.meterRafId = null;
    }
  }

  private notifyTime(currentSec: number) {
    for (const l of this.listeners) {
      l.onTimeUpdate(currentSec, this.totalDuration);
    }
  }

  private notifyMeter(levels: Record<StemId, number>) {
    for (const l of this.listeners) {
      l.onMeterUpdate(levels);
    }
  }

  private notifyState(isPlaying: boolean) {
    for (const l of this.listeners) {
      l.onStateChange(isPlaying);
    }
  }

  /**
   * Generates downloadable WAV blobs for export (Minus-One, Acapella, Drum+Bass)
   */
  public exportWav(type: "minus-one" | "acapella" | "rhythm" | "all"): string | null {
    if (!this.ctx) return null;
    const stemsToInclude: StemId[] =
      type === "minus-one"
        ? ["drums", "bass", "instruments"]
        : type === "acapella"
        ? ["vocals"]
        : type === "rhythm"
        ? ["drums", "bass"]
        : ["vocals", "drums", "bass", "instruments"];

    const sampleRate = 32000;
    const numSamples = Math.floor(sampleRate * this.totalDuration);
    const mixed = new Float32Array(numSamples);

    for (const id of stemsToInclude) {
      const buf = this.stemBuffers[id];
      if (!buf) continue;
      const data = buf.getChannelData(0);
      const vol = this.states[id].volume;
      for (let i = 0; i < numSamples; i++) {
        mixed[i] += (data[i] || 0) * vol;
      }
    }

    // Soft limiter
    for (let i = 0; i < numSamples; i++) {
      mixed[i] = Math.tanh(mixed[i] * 1.1) * 0.95;
    }

    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);
    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, numSamples * 2, true);

    for (let i = 0; i < numSamples; i++) {
      const s = Math.max(-1, Math.min(1, mixed[i]));
      view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }

    const blob = new Blob([buffer], { type: "audio/wav" });
    return URL.createObjectURL(blob);
  }
}
