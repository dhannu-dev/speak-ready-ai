import { PracticeIcon } from "../data";

type Mistake = {
  wrong: string;
  correct: string;
  explanationHindi: string;
};

type MistakeListProps = {
  mistakes: Mistake[];
};

export function MistakeList({ mistakes }: MistakeListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <span>⚠️</span> Mistakes & Fixes
        </h3>
        <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600 border border-red-100">
          {mistakes.length} {mistakes.length === 1 ? "issue" : "issues"} found
        </span>
      </div>

      <div className="space-y-2">
        {mistakes.map((mistake, index) => (
          <div
            key={index}
            className="rounded-xl border border-red-200 bg-red-50/50 p-4"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <PracticeIcon name="alertTriangle" className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 line-through">
                    {mistake.wrong}
                  </p>
                  <p className="text-xs font-semibold text-emerald-700">
                    ✅ {mistake.correct}
                  </p>
                </div>
                <p className="text-xs leading-5 text-slate-600">
                  {mistake.explanationHindi}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
