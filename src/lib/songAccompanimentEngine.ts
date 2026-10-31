import {
  getAudioContext,
  midiToFrequency,
  noteToFrequency,
  noteToMidi,
  playChordPreview,
  playInstrumentNote,
} from "@/lib/audioSynth";
import { parseChordSymbol, getChordDiagram } from "@/data/chordDiagrams";
import { transposeChord, getNoteIndex } from "@/lib/transpose";
import { ChordChartArrangement, SongSection, ChordToken } from "@/types/music";

export interface AccompanimentChordStep {
  originalChord: string;
  transposedChord: string;
  durationBeats: number;
  sectionId: string;
  sectionName: string;
  lineIndex: number;
  tokenIndex: number;
  lyrics: string;
  isBridge?: boolean;
}

export interface AccompanimentMixerConfig {
  pianoEnabled: boolean;
  guitarEnabled: boolean;
  bassEnabled: boolean;
  pianoVolume: number; // 0.0 to 1.0
  guitarVolume: number; // 0.0 to 1.0
  bassVolume: number; // 0.0 to 1.0
  masterVolume: number; // 0.0 to 1.0
}

export type AccompanimentPreset = "trio" | "piano-only" | "guitar-only" | "rhythm-only";

export class SongAccompanimentEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private bpm = 76;
  private timeSignature: "4/4" | "3/4" | "6/8" = "4/4";
  private transposeSemitones = 0;
  private targetKey = "C";

  private chordSteps: AccompanimentChordStep[] = [];
  private currentStepIndex = 0;
  private currentBeatInStep = 0;
  private currentBarNumber = 1;
  private currentBeatInBar = 0;

  private mixerConfig: AccompanimentMixerConfig = {
    pianoEnabled: true,
    guitarEnabled: true,
    bassEnabled: true,
    pianoVolume: 0.82,
    guitarVolume: 0.75,
    bassVolume: 0.88,
    masterVolume: 0.88,
  };

  private schedulerTimerId: number | null = null;
  private nextBeatTime = 0;

  // Listeners
  private onStepListeners: ((step: AccompanimentChordStep, stepIndex: number) => void)[] = [];
  private onBeatListeners: ((bar: number, beat: number) => void)[] = [];
  private onStateListeners: ((playing: boolean) => void)[] = [];

  constructor() {}

  public setMixerConfig(patch: Partial<AccompanimentMixerConfig>) {
    this.mixerConfig = { ...this.mixerConfig, ...patch };
  }

  public getMixerConfig(): AccompanimentMixerConfig {
    return { ...this.mixerConfig };
  }

  public applyPreset(preset: AccompanimentPreset) {
    if (preset === "trio") {
      this.mixerConfig = {
        pianoEnabled: true,
        guitarEnabled: true,
        bassEnabled: true,
        pianoVolume: 0.85,
        guitarVolume: 0.75,
        bassVolume: 0.88,
        masterVolume: 0.88,
      };
    } else if (preset === "piano-only") {
      this.mixerConfig = {
        pianoEnabled: true,
        guitarEnabled: false,
        bassEnabled: false,
        pianoVolume: 0.95,
        guitarVolume: 0,
        bassVolume: 0,
        masterVolume: 0.9,
      };
    } else if (preset === "guitar-only") {
      this.mixerConfig = {
        pianoEnabled: false,
        guitarEnabled: true,
        bassEnabled: false,
        pianoVolume: 0,
        guitarVolume: 0.95,
        bassVolume: 0,
        masterVolume: 0.9,
      };
    } else if (preset === "rhythm-only") {
      this.mixerConfig = {
        pianoEnabled: false,
        guitarEnabled: true,
        bassEnabled: true,
        pianoVolume: 0,
        guitarVolume: 0.75,
        bassVolume: 0.95,
        masterVolume: 0.9,
      };
    }
  }

  public loadSongArrangement(
    arrangement: ChordChartArrangement,
    bpm = 76,
    timeSignature: "4/4" | "3/4" | "6/8" = "4/4",
    transposeSemitones = 0,
    currentKey = "C"
  ) {
    this.stop();
    this.bpm = bpm;
    this.timeSignature = timeSignature;
    this.transposeSemitones = transposeSemitones;
    this.targetKey = currentKey;

    const steps: AccompanimentChordStep[] = [];
    const beatsPerBar = timeSignature === "3/4" ? 3 : timeSignature === "6/8" ? 6 : 4;

    arrangement.sections.forEach((sec: SongSection) => {
      sec.lines.forEach((line: ChordToken[], lineIdx: number) => {
        // Collect chords with their ORIGINAL index in the line for exact UI sync
        const validTokensWithIdx = line
          .map((tok, originalIdx) => ({ tok, originalIdx }))
          .filter((item) => Boolean(item.tok.chord && item.tok.chord.trim()));
        if (validTokensWithIdx.length === 0) return;

        validTokensWithIdx.forEach(({ tok, originalIdx }, tokIdx) => {
          const transposed = transposeChord(tok.chord, transposeSemitones, currentKey);
          let duration = tok.beats;
          if (!duration || duration <= 0) {
            if (validTokensWithIdx.length === 1) {
              duration = beatsPerBar;
            } else if (validTokensWithIdx.length === 2) {
              duration = beatsPerBar;
            } else if (validTokensWithIdx.length === 3) {
              duration = tokIdx === 0 ? beatsPerBar : Math.max(1, Math.floor(beatsPerBar / 2));
            } else if (validTokensWithIdx.length === 4) {
              duration = Math.max(1, Math.floor(beatsPerBar / 2));
            } else {
              duration = tok.isBridge ? 1 : Math.max(1, Math.floor(beatsPerBar / 2));
            }
          }

          steps.push({
            originalChord: tok.chord,
            transposedChord: transposed,
            durationBeats: duration,
            sectionId: sec.id,
            sectionName: sec.name,
            lineIndex: lineIdx,
            tokenIndex: originalIdx,
            lyrics: tok.lyrics || "",
            isBridge: Boolean(tok.isBridge),
          });
        });
      });
    });

    this.chordSteps = steps;
    this.currentStepIndex = 0;
    this.currentBeatInStep = 0;
    this.currentBarNumber = 1;
    this.currentBeatInBar = 0;
  }

  public setTranspose(semitones: number, currentKey: string) {
    this.transposeSemitones = semitones;
    this.targetKey = currentKey;
    this.chordSteps = this.chordSteps.map((st) => ({
      ...st,
      transposedChord: transposeChord(st.originalChord, semitones, currentKey),
    }));
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.max(40, Math.min(220, newBpm));
  }

  public getBpm(): number {
    return this.bpm;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getChordSteps(): AccompanimentChordStep[] {
    return this.chordSteps;
  }

  public getCurrentStepIndex(): number {
    return this.currentStepIndex;
  }

  public onStepChange(cb: (step: AccompanimentChordStep, stepIndex: number) => void) {
    this.onStepListeners.push(cb);
  }

  public onBeat(cb: (bar: number, beat: number) => void) {
    this.onBeatListeners.push(cb);
  }

  public onStateChange(cb: (playing: boolean) => void) {
    this.onStateListeners.push(cb);
  }

  public play() {
    if (this.isPlaying || this.chordSteps.length === 0) return;
    this.ctx = getAudioContext();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.nextBeatTime = this.ctx.currentTime + 0.08;

    this.notifyState(true);
    this.startScheduler();
  }

  public pause() {
    this.isPlaying = false;
    this.stopScheduler();
    this.notifyState(false);
  }

  public stop() {
    this.isPlaying = false;
    this.stopScheduler();
    this.currentStepIndex = 0;
    this.currentBeatInStep = 0;
    this.currentBarNumber = 1;
    this.currentBeatInBar = 0;
    this.notifyState(false);
  }

  public jumpToStep(index: number) {
    if (index >= 0 && index < this.chordSteps.length) {
      this.currentStepIndex = index;
      this.currentBeatInStep = 0;
      if (this.isPlaying) {
        this.notifyStep(this.chordSteps[index], index);
      }
    }
  }

  private startScheduler() {
    this.stopScheduler();

    const beatsPerBar = this.timeSignature === "3/4" ? 3 : this.timeSignature === "6/8" ? 6 : 4;
    const lookaheadMs = 25; // Check scheduling every 25ms
    const scheduleAheadSec = 0.12; // Schedule audio 120ms in advance for zero jitter

    this.schedulerTimerId = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying) return;

      const beatDurationSec = 60 / this.bpm;

      while (this.nextBeatTime < this.ctx.currentTime + scheduleAheadSec) {
        // Schedule sound for current beat
        const step = this.chordSteps[this.currentStepIndex];
        if (step) {
          this.scheduleAccompanimentBeat(
            step,
            this.currentBeatInStep,
            this.currentBeatInBar,
            this.nextBeatTime
          );

          // Notify UI on exact beat time
          const barToNotify = this.currentBarNumber;
          const beatToNotify = this.currentBeatInBar + 1;
          const stepToNotify = step;
          const idxToNotify = this.currentStepIndex;
          const delayMs = Math.max(0, (this.nextBeatTime - this.ctx.currentTime) * 1000);

          setTimeout(() => {
            if (this.isPlaying) {
              this.notifyBeat(barToNotify, beatToNotify);
              this.notifyStep(stepToNotify, idxToNotify);
            }
          }, delayMs);
        }

        // Advance beat counters
        this.nextBeatTime += beatDurationSec;
        this.currentBeatInBar = (this.currentBeatInBar + 1) % beatsPerBar;
        if (this.currentBeatInBar === 0) {
          this.currentBarNumber++;
        }

        this.currentBeatInStep++;
        if (step && this.currentBeatInStep >= step.durationBeats) {
          this.currentBeatInStep = 0;
          this.currentStepIndex++;
          if (this.currentStepIndex >= this.chordSteps.length) {
            // Loop back to beginning of song
            this.currentStepIndex = 0;
            this.currentBarNumber = 1;
          }
        }
      }
    }, lookaheadMs);
  }

  private stopScheduler() {
    if (this.schedulerTimerId) {
      window.clearInterval(this.schedulerTimerId);
      this.schedulerTimerId = null;
    }
  }

  /**
   * Schedules authentic professional instrument patterns on this exact beat
   */
  private scheduleAccompanimentBeat(
    step: AccompanimentChordStep,
    beatInStep: number,
    beatInBar: number,
    scheduledTime: number
  ) {
    if (!this.ctx) return;
    const chord = step.transposedChord;
    const parsed = parseChordSymbol(chord);
    const diagram = getChordDiagram(chord);

    const isNewChord = beatInStep === 0;
    const isDownbeat = beatInBar === 0;

    // 1. PROFESSIONAL PIANO ACCOMPANIMENT
    if (this.mixerConfig.pianoEnabled && this.mixerConfig.pianoVolume > 0) {
      const vol = this.mixerConfig.pianoVolume * this.mixerConfig.masterVolume;
      const bassPc = parsed.bassIdx !== null ? parsed.bassIdx : parsed.rootIdx;
      const lowBassMidi = 36 + bassPc; // C2..B2

      // Left hand: deep bass octave on downbeat or on new chord
      if (isNewChord || isDownbeat) {
        playInstrumentNote(lowBassMidi, "piano", vol * 0.9, scheduledTime);
        playInstrumentNote(lowBassMidi + 12, "piano", vol * 0.65, scheduledTime + 0.005);
      }

      // Right hand: broken chord / arpeggio flowing phrasing
      const pianoNotes = diagram.piano.notes;
      if (pianoNotes.length > 0) {
        if (isNewChord) {
          // Play warm full chord spread (sample-accurate human spread)
          pianoNotes.forEach((n, i) => {
            const midi = noteToMidi(n);
            playInstrumentNote(midi, "piano", vol * (0.55 + i * 0.05), scheduledTime + i * 0.012);
          });
        } else {
          // Flowing broken chord arpeggio on subsequent beats
          const arpeggioIdx = beatInStep % pianoNotes.length;
          const midi = noteToMidi(pianoNotes[arpeggioIdx]);
          playInstrumentNote(midi, "piano", vol * 0.65, scheduledTime);
          // Add gentle high octave sparkle
          if (beatInStep === 1 || beatInStep === 3) {
            const highMidi = noteToMidi(pianoNotes[pianoNotes.length - 1]);
            playInstrumentNote(highMidi, "piano", vol * 0.45, scheduledTime + 0.06);
          }
        }
      }
    }

    // 2. PROFESSIONAL ACOUSTIC GUITAR ACCOMPANIMENT
    if (this.mixerConfig.guitarEnabled && this.mixerConfig.guitarVolume > 0) {
      const vol = this.mixerConfig.guitarVolume * this.mixerConfig.masterVolume;
      const frets = diagram.guitar.frets;
      const sounding = frets
        .map((fret, stringIdx) => ({ fret, stringIdx }))
        .filter((s) => s.fret >= 0);

      if (sounding.length > 0) {
        if (isNewChord || isDownbeat) {
          // Beat 1: Thumb picks lowest root bass string + gentle downstroke sweep
          const bassString = sounding[0];
          const bassMidi = 40 + [0, 5, 10, 15, 19, 24][bassString.stringIdx] + bassString.fret;
          playInstrumentNote(bassMidi, "guitar", vol * 0.95, scheduledTime);

          // Quick strum across strings
          sounding.slice(1).forEach((s, idx) => {
            const openMidi = [40, 45, 50, 55, 59, 64][s.stringIdx];
            const midi = openMidi + s.fret;
            playInstrumentNote(midi, "guitar", vol * 0.65, scheduledTime + (idx + 1) * 0.016);
          });
        } else if (beatInStep % 2 === 1) {
          // Beat 2 / 4: Light acoustic upstroke on treble strings (strings 3, 2, 1)
          const trebles = sounding.slice(-3).reverse();
          trebles.forEach((s, idx) => {
            const openMidi = [40, 45, 50, 55, 59, 64][s.stringIdx];
            const midi = openMidi + s.fret;
            playInstrumentNote(midi, "guitar", vol * 0.5, scheduledTime + idx * 0.014);
          });
        } else {
          // Mid-beat arpeggio pluck
          const midString = sounding[Math.min(2, sounding.length - 1)];
          const openMidi = [40, 45, 50, 55, 59, 64][midString.stringIdx];
          playInstrumentNote(openMidi + midString.fret, "guitar", vol * 0.55, scheduledTime);
        }
      }
    }

    // 3. PROFESSIONAL BASS GUITAR ACCOMPANIMENT
    if (this.mixerConfig.bassEnabled && this.mixerConfig.bassVolume > 0) {
      const vol = this.mixerConfig.bassVolume * this.mixerConfig.masterVolume;
      const bassPc = parsed.bassIdx !== null ? parsed.bassIdx : parsed.rootIdx;
      // Target E1..D#2 (MIDI 28..39)
      const bassMidi = 28 + (((bassPc - 4) % 12) + 12) % 12;

      if (isNewChord || isDownbeat) {
        // Deep round root/slash bass note with authority
        playInstrumentNote(bassMidi, "bass", vol * 0.95, scheduledTime);
      } else if (beatInStep === 2) {
        // 5th interval pulse on beat 3 (7 semitones up)
        const fifthMidi = bassMidi + 7;
        playInstrumentNote(fifthMidi, "bass", vol * 0.6, scheduledTime);
      } else if (beatInStep === step.durationBeats - 1) {
        // Passing note into next chord
        const nextStep = this.chordSteps[(this.currentStepIndex + 1) % this.chordSteps.length];
        if (nextStep) {
          const nextParsed = parseChordSymbol(nextStep.transposedChord);
          const nextBassPc = nextParsed.bassIdx !== null ? nextParsed.bassIdx : nextParsed.rootIdx;
          const nextMidi = 28 + (((nextBassPc - 4) % 12) + 12) % 12;
          // Step 1 semitone or 2 semitones away from target
          const passingMidi = nextMidi > bassMidi ? nextMidi - 1 : nextMidi + 1;
          playInstrumentNote(passingMidi, "bass", vol * 0.5, scheduledTime);
        }
      }
    }
  }

  private notifyStep(step: AccompanimentChordStep, idx: number) {
    this.onStepListeners.forEach((l) => l(step, idx));
  }

  private notifyBeat(bar: number, beat: number) {
    this.onBeatListeners.forEach((l) => l(bar, beat));
  }

  private notifyState(playing: boolean) {
    this.onStateListeners.forEach((l) => l(playing));
  }
}
