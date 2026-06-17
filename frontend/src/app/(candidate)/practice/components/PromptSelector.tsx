"use client";

import { guidedPrompts } from "../data";
import { PracticeIcon } from "../data";

type PromptSelectorProps = {
  selectedPromptId: number | null;
  onSelectPrompt: (id: number) => void;
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
          <p className="text-sm font-semibold text-slate-900">
            Choose a prompt
          </p>
          <p className="text-xs text-slate-500">
            Select a topic to practice with
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {guidedPrompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => onSelectPrompt(prompt.id)}
            className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
              selectedPromptId === prompt.id
                ? "border-blue-200 bg-blue-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                selectedPromptId === prompt.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {prompt.id}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-medium ${
                  selectedPromptId === prompt.id
                    ? "text-blue-900"
                    : "text-slate-900"
                }`}
              >
                {prompt.title}
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  {prompt.category}
                </span>
                <span className="text-[10px] text-slate-400">
                  {prompt.time}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
