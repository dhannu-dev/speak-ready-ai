import { PracticeIcon } from "../data";

type Mistake = {
  original: string;
  corrected: string;
  type: string;
  explanation: string;
};

type MistakeListProps = {
  mistakes: Mistake[];
};

function getMistakeIcon(type: string) {
  switch (type) {
    case "Punctuation":
      return "alertTriangle";
    case "Incomplete Thought":
      return "alertTriangle";
    case "Vocabulary":
      return "bookOpen";
    default:
      return "alertTriangle";
  }
}

function getMistakeColor(type: string) {
  switch (type) {
    case "Punctuation":
      return "bg-amber-50 text-amber-600";
    case "Incomplete Thought":
      return "bg-violet-50 text-violet-600";
    case "Vocabulary":
      return "bg-blue-50 text-blue-600";
    default:
      return "bg-slate-50 text-slate-600";
  }
}

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
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${getMistakeColor(mistake.type)}`}
              >
                <PracticeIcon
                  name={getMistakeIcon(mistake.type) as any}
                  className="h-3.5 w-3.5"
                />
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {mistake.type}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-500 line-through">
                    {mistake.original}
                  </p>
                  <p className="text-xs font-medium text-emerald-700">
                    {mistake.corrected}
                  </p>
                </div>

                <p className="text-xs leading-5 text-slate-600">
                  {mistake.explanation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
