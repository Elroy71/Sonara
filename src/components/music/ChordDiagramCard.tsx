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
      className={`group relative rounded-md border transition-colors ${
        onSelect ? "cursor-pointer" : ""
      } ${
        isSelected
          ? "border-amber-500 bg-amber-500/5 dark:bg-amber-500/10"
          : "border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#141417] hover:border-zinc-400 dark:hover:border-zinc-700"
      } ${compact ? "p-3" : "p-4"}`}
    >
      {/* Header: Chord Name + Play Preview */}
      <div className="flex items-center justify-between mb-2 border-b border-zinc-200 dark:border-zinc-800/80 pb-2">
        <div>
          <span className="text-lg font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
            {diagram.chordName}
          </span>
          {!compact && (
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
              {diagram.intervals}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handlePlay}
          title={`Dengarkan bunyi chord ${diagram.chordName}`}
          className="p-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-amber-500 hover:text-zinc-950 hover:border-amber-500 transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" />
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
        {(instrument === "piano" || instrument === "cajon") && (
          <PianoKeyboardSvg
            notes={diagram.piano.notes}
            fingers={diagram.piano.fingers}
          />
        )}
      </div>

      {/* Footer Note / Finger Hint */}
      <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
        <span>
          {instrument === "guitar"
            ? "Gitar 6-Senar"
            : instrument === "bass"
            ? "Bass 4-Senar"
            : instrument === "cajon"
            ? "Perkusi / Harmoni"
            : "Piano / Keyboard"}
        </span>
        {instrument === "piano" ? (
          <span className="font-mono text-amber-600 dark:text-amber-400">
            {diagram.piano.notes.map((n) => n.replace(/\d/, "")).join(" - ")}
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

  const positiveFrets = frets.filter((f) => f > 0);
  const minFret = positiveFrets.length > 0 ? Math.min(...positiveFrets) : 1;
  const maxFret = positiveFrets.length > 0 ? Math.max(...positiveFrets) : 1;
  const effectiveBase = maxFret <= 4 ? 1 : baseFret || minFret;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="select-none">
      {/* Nut */}
      <line
        x1={padLeft}
        y1={padTop}
        x2={padLeft + gridWidth}
        y2={padTop}
        stroke="currentColor"
        strokeWidth={effectiveBase === 1 ? 4 : 1.5}
        className="text-zinc-800 dark:text-zinc-200"
      />

      {effectiveBase > 1 && (
        <text
          x={padLeft - 8}
          y={padTop + fretSpacing * 0.65}
          textAnchor="end"
          className="fill-amber-500 text-[10px] font-bold font-mono"
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
            className="text-zinc-300 dark:text-zinc-700"
          />
        );
      })}

      {/* Vertical String Lines */}
      {stringNames.map((name, sIdx) => {
        const x = padLeft + sIdx * stringSpacing;
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
              className="text-zinc-400 dark:text-zinc-500"
            />
            <text
              x={x}
              y={height - 5}
              textAnchor="middle"
              className="fill-zinc-500 text-[9px] font-mono"
            >
              {name}
            </text>
          </g>
        );
      })}

      {/* Barre indicator */}
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
              stroke="#d97706"
              strokeWidth={10}
              strokeLinecap="round"
              opacity={0.5}
            />
          );
        })}

      {/* Dots & Open/Muted Markers */}
      {frets.map((fret, sIdx) => {
        const x = padLeft + sIdx * stringSpacing;
        const finger = fingers[sIdx] || 0;

        if (fret === -1) {
          return (
            <text
              key={`marker-${sIdx}`}
              x={x}
              y={padTop - 8}
              textAnchor="middle"
              className="fill-zinc-500 text-[11px] font-bold"
            >
              ×
            </text>
          );
        }

        if (fret === 0) {
          return (
            <circle
              key={`marker-${sIdx}`}
              cx={x}
              cy={padTop - 11}
              r={3.8}
              fill="none"
              stroke="#d97706"
              strokeWidth={1.6}
            />
          );
        }

        const relFret = fret - effectiveBase + 1;
        const clampedFret = Math.max(1, Math.min(numFrets, relFret));
        const y = padTop + (clampedFret - 0.5) * fretSpacing;

        return (
          <g key={`dot-${sIdx}`}>
            <circle cx={x} cy={y} r={7} className="fill-amber-500" />
            {finger > 0 && (
              <text
                x={x}
                y={y + 3.2}
                textAnchor="middle"
                className="fill-zinc-950 text-[9px] font-bold font-mono"
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
              rx={1.5}
              className={
                isActive
                  ? "fill-amber-400 stroke-amber-600"
                  : "fill-zinc-100 dark:fill-zinc-200 stroke-zinc-400"
              }
              strokeWidth={1}
            />
            {isActive && (
              <circle cx={x + (keyW - 1) / 2} cy={8 + keyH - 12} r={3} className="fill-zinc-950" />
            )}
          </g>
        );
      })}

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
              rx={1}
              className={
                isActive
                  ? "fill-amber-500 stroke-amber-300"
                  : "fill-zinc-900 dark:fill-zinc-950 stroke-zinc-700"
              }
              strokeWidth={1}
            />
            {isActive && (
              <circle cx={x + blackW / 2} cy={8 + blackH - 9} r={2.5} className="fill-zinc-950" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
