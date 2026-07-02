"use client";

import { userLevels, type UserLevel } from "../data";

type LevelSelectorProps = {
  selectedLevel: UserLevel;
  onSelectLevel: (level: UserLevel) => void;
};

export function LevelSelector({ selectedLevel, onSelectLevel }: LevelSelectorProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Your Level</h3>
      <div className="space-y-2">
        {userLevels.map((level) => {
          const isSelected = selectedLevel === level;
          return (
            <button
              key={level}
              onClick={() => onSelectLevel(level)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                isSelected
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {level}
              {isSelected && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m7 12 3 3 7-7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
