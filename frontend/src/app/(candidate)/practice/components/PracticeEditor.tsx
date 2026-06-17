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
                Your prompt
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

        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span
            className={`rounded-md px-2 py-1 text-[10px] font-medium ${
              value.length > 0
                ? "bg-blue-50 text-blue-600"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {value.length} characters
          </span>
        </div>
      </div>
    </div>
  );
}
