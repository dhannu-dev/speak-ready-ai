"use client";

import { guidedPrompts } from "../data";
import { PracticeIcon } from "../data";

type PromptSelectorProps = {
  selectedPromptId: number | null;
  onSelectPrompt: (id: number) => void;
};

const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
  Personal: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  "Daily Life": { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  Motivation: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  Career: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
};

export function PromptSelector({
  selectedPromptId,
  onSelectPrompt,
}: PromptSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
          <PracticeIcon name="lightbulb" className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">Choose Your Quest</p>
          <p className="text-xs text-slate-500">Select a mission to earn XP</p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {guidedPrompts.map((prompt) => {
          const colors = categoryStyles[prompt.category] || categoryStyles.Personal;
          const isSelected = selectedPromptId === prompt.id;

          return (
            <button
              key={prompt.id}
              onClick={() => onSelectPrompt(prompt.id)}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                isSelected
                  ? "border-blue-200 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : `${colors.bg} ${colors.text}`
                }`}
              >
                {prompt.id}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-medium ${
                    isSelected ? "text-blue-900" : "text-slate-900"
                  }`}
                >
                  {prompt.title}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${colors.bg} ${colors.text}`}
                  >
                    {prompt.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    ⏱ {prompt.time}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
