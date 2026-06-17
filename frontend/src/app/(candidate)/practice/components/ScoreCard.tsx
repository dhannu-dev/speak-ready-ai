import { Badge } from "@/components/ui/badge";

type ScoreCardProps = {
  overallScore: number;
  level: string;
  scores: {
    grammar: number;
    vocabulary: number;
    clarity: number;
    overall: number;
  };
};

function getScoreColor(score: number) {
  if (score >= 8) return "text-emerald-600";
  if (score >= 6) return "text-amber-600";
  return "text-red-600";
}

function getScoreBarColor(score: number) {
  if (score >= 8) return "bg-emerald-500";
  if (score >= 6) return "bg-amber-500";
  return "bg-red-500";
}

function getLevelVariant(level: string) {
  if (level === "Advanced") return "default";
  if (level === "Intermediate") return "secondary";
  return "outline";
}

export function ScoreCard({ overallScore, level, scores }: ScoreCardProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Your Scores</h3>
        <Badge variant={getScoreVariant(level)}>{level}</Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-blue-50">
          <span className="text-2xl font-bold tracking-tight text-blue-600">
            {overallScore}
          </span>
          <span className="text-[10px] font-medium text-blue-500">/ 10</span>
        </div>
        <div className="flex-1 space-y-2.5">
          {Object.entries(scores).map(([key, score]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium capitalize text-slate-600">
                  {key}
                </span>
                <span
                  className={`text-xs font-semibold ${getScoreColor(score)}`}
                >
                  {score}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${getScoreBarColor(score)}`}
                  style={{ width: `${(score / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getScoreVariant(level: string): "default" | "secondary" | "outline" {
  if (level === "Advanced") return "default";
  if (level === "Intermediate") return "secondary";
  return "outline";
}
