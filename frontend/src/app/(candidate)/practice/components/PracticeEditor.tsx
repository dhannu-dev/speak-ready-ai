"use client";

import { PracticeIcon } from "../data";

type PracticeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  selectedPromptTitle: string | null;
  isGuided: boolean;
};

export function PracticeEditor({
  value,
  onChange,
  selectedPromptTitle,
  isGuided,
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
          className="h-64 w-full resize-none rounded-xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:h-80"
        />

        <div className="absolute bottom-3 right-3 flex items-center gap-3">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
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
      </div>
    </div>
  );
}
