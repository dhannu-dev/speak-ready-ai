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
        <h3 className="text-sm font-semibold text-slate-900">
          Mistakes & Suggestions
        </h3>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
          {mistakes.length} found
        </span>
      </div>

      <div className="space-y-2">
        {mistakes.map((mistake, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <PracticeIcon name="alertTriangle" className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 line-through">
                    {mistake.wrong}
                  </p>
                  <p className="text-xs font-medium text-emerald-700">
                    {mistake.correct}
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
