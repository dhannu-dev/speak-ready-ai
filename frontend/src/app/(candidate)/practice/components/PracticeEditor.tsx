"use client";

import { PracticeIcon } from "../data";

type PracticeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  selectedPromptTitle: string | null;
  isGuided: boolean;
  handleMic: () => void;
  isListening: boolean;
  recordingTime: number;
  liveTranscript: string;
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PracticeEditor({
  value,
  onChange,
  selectedPromptTitle,
  isGuided,
  handleMic,
  isListening,
  recordingTime,
  liveTranscript,
}: PracticeEditorProps) {
  const charCount = value.length;
  const progress = Math.min((charCount / 200) * 100, 100);

  return (
    <div className="space-y-3">
      {isGuided && selectedPromptTitle && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <PracticeIcon name="lightbulb" className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-amber-600">
                Active Quest
              </p>
              <p className="mt-1 text-sm font-medium text-amber-900">
                {selectedPromptTitle}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isGuided
              ? "Write your answer here... Take your time and focus on grammar and sentence structure."
              : "Start writing freely... Practice expressing your thoughts in English."
          }
          className={`w-full resize-none rounded-xl border bg-white p-5 text-sm leading-7 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-colors ${
            isListening
              ? "border-red-200 focus:border-red-300 focus:ring-red-500/10"
              : "border-slate-200 focus:border-blue-300"
          } ${isListening ? "h-48 sm:h-56" : "h-64 sm:h-80"}`}
        />

        {!isListening && (
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-400 to-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span
              className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                charCount >= 10
                  ? "bg-emerald-50 text-emerald-600"
                  : charCount > 0
                    ? "bg-amber-50 text-amber-600"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {charCount} characters
            </span>
          </div>
        )}
      </div>

      {/* Recording Section */}
      <div
        className={`overflow-hidden rounded-xl border transition-all duration-300 ${
          isListening
            ? "border-red-200 bg-red-50/50"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Mic Button */}
          <button
            onClick={handleMic}
            className={`inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-all ${
              isListening
                ? "bg-red-600 text-white shadow-sm mic-pulse"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <PracticeIcon
              name="microphone"
              className={`h-4 w-4 ${isListening ? "text-white" : "text-slate-500"}`}
            />
            {isListening ? "Stop" : "Speak"}
          </button>

          {isListening && (
            <div className="flex items-center gap-3">
              {/* Sound Wave Bars */}
              <div className="flex items-center gap-[3px] h-5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-red-400 sound-wave-bar"
                    style={{ height: "100%" }}
                  />
                ))}
              </div>

              {/* Recording Indicator */}
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 recording-dot" />
                <span className="text-xs font-medium text-red-600">
                  Recording
                </span>
              </div>

              {/* Timer */}
              <span className="text-xs font-mono font-semibold text-red-500 tabular-nums">
                {formatTime(recordingTime)}
              </span>
            </div>
          )}

          {!isListening && (
            <p className="text-xs text-slate-400">
              Click speak to dictate your answer
            </p>
          )}
        </div>

        {/* Live Transcript Preview */}
        {isListening && liveTranscript && (
          <div className="border-t border-red-100 px-4 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400 mb-1">
              Live transcript
            </p>
            <p className="text-sm leading-6 text-slate-700">{liveTranscript}</p>
          </div>
        )}
      </div>
    </div>
  );
}
