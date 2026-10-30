"use client";

import React from "react";
import { Volume2 } from "lucide-react";
import { InstrumentType } from "@/types/music";
import { getChordDiagram } from "@/data/chordDiagrams";
import { playChordPreview } from "@/lib/audioSynth";
import { CHROMATIC_SHARP, getNoteIndex } from "@/lib/transpose";

interface ChordDiagramCardProps {
  chordSymbol: string;
  instrument: InstrumentType;
  isSelected?: boolean;
  onSelect?: (chord: string) => void;
  compact?: boolean;
}

const GUITAR_STRING_NAMES = ["E", "A", "D", "G", "B", "E"];
const BASS_STRING_NAMES = ["E", "A", "D", "G"];

export function ChordDiagramCard({
  chordSymbol,
  instrument,
  isSelected = false,
  onSelect,
  compact = false,
}: ChordDiagramCardProps) {
  const diagram = getChordDiagram(chordSymbol);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playChordPreview(chordSymbol, instrument);
  };

  return (
    <div
      onClick={() => onSelect?.(chordSymbol)}
      className={`group relative rounded-xl border transition-all duration-200 ${
        onSelect ? "cursor-pointer" : ""
      } ${
        isSelected
          ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
          : "border-slate-800/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 hover:border-emerald-500/50"
      } ${compact ? "p-3" : "p-4"}`}
    >
      {/* Header: Chord Name + Play Preview */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {diagram.chordName}
          </span>
          {!compact && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              {diagram.intervals}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handlePlay}
          title={`Dengarkan bunyi chord ${diagram.chordName} (${instrument})`}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-colors"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Instrument Diagram SVG */}
      <div className="flex justify-center items-center my-1">
        {instrument === "guitar" && (
          <FretboardSvg
            frets={diagram.guitar.frets}
            fingers={diagram.guitar.fingers}
            baseFret={diagram.guitar.baseFret || 1}
            barres={diagram.guitar.barres}
            stringNames={GUITAR_STRING_NAMES}
          />
        )}
        {instrument === "bass" && (
          <FretboardSvg
            frets={diagram.bass.frets}
            fingers={diagram.bass.fingers}
            baseFret={diagram.bass.baseFret || 1}
            barres={diagram.bass.barres}
            stringNames={BASS_STRING_NAMES}
          />
        )}
        {instrument === "piano" && (
          <PianoKeyboardSvg
            notes={diagram.piano.notes}
            fingers={diagram.piano.fingers}
          />
        )}
      </div>

      {/* Footer Note / Finger Hint */}
      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="capitalize">
          {instrument === "guitar"
            ? "Gitar 6-Senar"
            : instrument === "bass"
            ? "Bass 4-Senar"
            : "Piano / Keyboard"}
        </span>
        {instrument === "piano" ? (
          <span className="font-mono text-emerald-600 dark:text-emerald-400">
            {diagram.piano.notes.map((n) => n.replace(/\d/, "")).join(" · ")}
          </span>
        ) : (
          <span className="font-mono">
            Fret {(instrument === "guitar" ? diagram.guitar.baseFret : diagram.bass.baseFret) || 1}
          </span>
        )}
      </div>
    </div>
  );
}

interface FretboardSvgProps {
  frets: number[];
  fingers: number[];
  baseFret: number;
  barres?: number[];
  stringNames: string[];
}

function FretboardSvg({ frets, fingers, baseFret, barres, stringNames }: FretboardSvgProps) {
  const numStrings = stringNames.length;
  const numFrets = 4;
  const width = numStrings === 6 ? 150 : 126;
  const height = 148;
  const padLeft = 24;
  const padRight = 18;
  const padTop = 26;
  const padBottom = 22;

  const gridWidth = width - padLeft - padRight;
  const gridHeight = height - padTop - padBottom;
  const stringSpacing = gridWidth / (numStrings - 1);
  const fretSpacing = gridHeight / numFrets;

  // Compute min positive fret to normalize display relative to baseFret
  const positiveFrets = frets.filter((f) => f > 0);
  const minFret = positiveFrets.length > 0 ? Math.min(...positiveFrets) : 1;
  const maxFret = positiveFrets.length > 0 ? Math.max(...positiveFrets) : 1;
  const effectiveBase = maxFret <= 4 ? 1 : baseFret || minFret;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="select-none">
      {/* Nut (thick line if effectiveBase === 1) */}
      <line
        x1={padLeft}
        y1={padTop}
        x2={padLeft + gridWidth}
        y2={padTop}
        stroke="currentColor"
        strokeWidth={effectiveBase === 1 ? 4 : 1.5}
        className="text-slate-700 dark:text-slate-200"
      />

      {/* Base Fret Label when > 1 */}
      {effectiveBase > 1 && (
        <text
          x={padLeft - 8}
          y={padTop + fretSpacing * 0.65}
          textAnchor="end"
          className="fill-emerald-500 text-[10px] font-bold font-mono"
        >
          {effectiveBase}fr
        </text>
      )}

      {/* Horizontal Fret Lines */}
      {Array.from({ length: numFrets }).map((_, idx) => {
        const y = padTop + (idx + 1) * fretSpacing;
        return (
          <line
            key={`fret-${idx}`}
            x1={padLeft}
            y1={y}
            x2={padLeft + gridWidth}
            y2={y}
            stroke="currentColor"
            strokeWidth={1}
            className="text-slate-300 dark:text-slate-700"
          />
        );
      })}

      {/* Vertical String Lines */}
      {stringNames.map((name, sIdx) => {
        const x = padLeft + sIdx * stringSpacing;
        // Bass and lower strings are slightly thicker
        const strokeWidth = 1.8 - sIdx * 0.15;
        return (
          <g key={`str-${sIdx}`}>
            <line
              x1={x}
              y1={padTop}
              x2={x}
              y2={padTop + gridHeight}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-slate-400 dark:text-slate-500"
            />
            {/* String Note Name at Bottom */}
            <text
              x={x}
              y={height - 5}
              textAnchor="middle"
              className="fill-slate-400 dark:fill-slate-500 text-[9px] font-mono"
            >
              {name}
            </text>
          </g>
        );
      })}

      {/* Barre indicator if present */}
      {barres &&
        barres.map((barreFret) => {
          const relFret = barreFret - effectiveBase + 1;
          if (relFret < 1 || relFret > numFrets) return null;
          const matchingStrings = frets
            .map((f, i) => (f >= barreFret ? i : -1))
            .filter((i) => i !== -1);
          if (matchingStrings.length < 2) return null;
          const firstStr = Math.min(...matchingStrings);
          const lastStr = Math.max(...matchingStrings);
          const x1 = padLeft + firstStr * stringSpacing;
          const x2 = padLeft + lastStr * stringSpacing;
          const y = padTop + (relFret - 0.5) * fretSpacing;

          return (
            <line
              key={`barre-${barreFret}`}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="#10b981"
              strokeWidth={11}
              strokeLinecap="round"
              opacity={0.45}
            />
          );
        })}

      {/* Dots & Open/Muted Markers per string */}
      {frets.map((fret, sIdx) => {
        const x = padLeft + sIdx * stringSpacing;
        const finger = fingers[sIdx] || 0;

        if (fret === -1) {
          // Muted string (X)
          return (
            <text
              key={`marker-${sIdx}`}
              x={x}
              y={padTop - 8}
              textAnchor="middle"
              className="fill-rose-500 text-[11px] font-bold"
            >
              ×
            </text>
          );
        }

        if (fret === 0) {
          // Open string (O)
          return (
            <circle
              key={`marker-${sIdx}`}
              cx={x}
              cy={padTop - 11}
              r={4}
              fill="none"
              stroke="#10b981"
              strokeWidth={1.8}
            />
          );
        }

        const relFret = fret - effectiveBase + 1;
        const clampedFret = Math.max(1, Math.min(numFrets, relFret));
        const y = padTop + (clampedFret - 0.5) * fretSpacing;

        return (
          <g key={`dot-${sIdx}`}>
            <circle cx={x} cy={y} r={7.5} className="fill-emerald-500" />
            {finger > 0 && (
              <text
                x={x}
                y={y + 3.2}
                textAnchor="middle"
                className="fill-slate-950 text-[9px] font-bold font-mono"
              >
                {finger}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

interface PianoKeyboardSvgProps {
  notes: string[];
  fingers?: number[];
}

function PianoKeyboardSvg({ notes }: PianoKeyboardSvgProps) {
  // Render 14 white keys (2 octaves: C4 to B5)
  const whiteNotes = [
    { note: "C", oct: 4 },
    { note: "D", oct: 4 },
    { note: "E", oct: 4 },
    { note: "F", oct: 4 },
    { note: "G", oct: 4 },
    { note: "A", oct: 4 },
    { note: "B", oct: 4 },
    { note: "C", oct: 5 },
    { note: "D", oct: 5 },
    { note: "E", oct: 5 },
    { note: "F", oct: 5 },
    { note: "G", oct: 5 },
    { note: "A", oct: 5 },
    { note: "B", oct: 5 },
  ];

  const blackNotes = [
    { note: "C#", oct: 4, posAfterWhite: 0 },
    { note: "D#", oct: 4, posAfterWhite: 1 },
    { note: "F#", oct: 4, posAfterWhite: 3 },
    { note: "G#", oct: 4, posAfterWhite: 4 },
    { note: "A#", oct: 4, posAfterWhite: 5 },
    { note: "C#", oct: 5, posAfterWhite: 7 },
    { note: "D#", oct: 5, posAfterWhite: 8 },
    { note: "F#", oct: 5, posAfterWhite: 10 },
    { note: "G#", oct: 5, posAfterWhite: 11 },
    { note: "A#", oct: 5, posAfterWhite: 12 },
  ];

  // Normalize active notes to canonical sharp notation + octave
  const activeSet = new Set(
    notes.map((n) => {
      const m = n.match(/^([A-G][#b]?)(\d)$/);
      if (!m) return n;
      const idx = getNoteIndex(m[1]);
      return `${CHROMATIC_SHARP[idx]}${m[2]}`;
    })
  );

  const keyW = 13.5;
  const keyH = 92;
  const blackW = 8.5;
  const blackH = 56;
  const totalW = whiteNotes.length * keyW + 4;
  const totalH = 112;

  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} className="select-none">
      {/* White Keys */}
      {whiteNotes.map((wk, idx) => {
        const id = `${wk.note}${wk.oct}`;
        const isActive = activeSet.has(id);
        const x = 2 + idx * keyW;
        return (
          <g key={id}>
            <rect
              x={x}
              y={8}
              width={keyW - 1}
              height={keyH}
              rx={2}
              className={
                isActive
                  ? "fill-emerald-400 stroke-emerald-600"
                  : "fill-slate-100 dark:fill-slate-200 stroke-slate-400"
              }
              strokeWidth={1}
            />
            {isActive && (
              <circle cx={x + (keyW - 1) / 2} cy={8 + keyH - 12} r={3.5} className="fill-slate-950" />
            )}
          </g>
        );
      })}

      {/* Black Keys */}
      {blackNotes.map((bk) => {
        const id = `${bk.note}${bk.oct}`;
        const isActive = activeSet.has(id);
        const x = 2 + (bk.posAfterWhite + 1) * keyW - blackW / 2 - 0.5;
        return (
          <g key={id}>
            <rect
              x={x}
              y={8}
              width={blackW}
              height={blackH}
              rx={1.5}
              className={
                isActive
                  ? "fill-emerald-500 stroke-emerald-300"
                  : "fill-slate-900 dark:fill-slate-950 stroke-slate-700"
              }
              strokeWidth={1}
            />
            {isActive && (
              <circle cx={x + blackW / 2} cy={8 + blackH - 9} r={2.5} className="fill-white" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
