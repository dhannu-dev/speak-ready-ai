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

function getLevelConfig(level: string) {
  if (level === "Advanced")
    return { gradient: "bg-purple-100 text-purple-700 border-purple-200", icon: "👑", label: "LEGENDARY" };
  if (level === "Intermediate")
    return { gradient: "bg-blue-100 text-blue-700 border-blue-200", icon: "⚔️", label: "WARRIOR" };
  return { gradient: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: "🌱", label: "RECRUIT" };
}

const scoreLabels: Record<string, string> = {
  grammar: "📜 Grammar",
  vocabulary: "📚 Vocabulary",
  clarity: "💎 Clarity",
  overall: "⭐ Overall",
};

export function ScoreCard({ overallScore, level, scores }: ScoreCardProps) {
  const levelConfig = getLevelConfig(level);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <span>📊</span> Battle Report
        </h3>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold ${levelConfig.gradient}`}
        >
          {levelConfig.icon} {levelConfig.label}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-blue-50 border border-blue-100">
          <span className="text-3xl font-black tracking-tight text-blue-600">
            {overallScore}
          </span>
          <span className="text-[10px] font-medium text-blue-400">/ 10</span>
          {overallScore >= 8 && (
            <span className="absolute -right-1 -top-1 text-sm">✨</span>
          )}
        </div>
        <div className="flex-1 space-y-2.5">
          {Object.entries(scores).map(([key, score]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  {scoreLabels[key] || key}
                </span>
                <span className={`text-xs font-semibold ${getScoreColor(score)}`}>
                  {score}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${getScoreBarColor(score)} transition-all duration-700 ease-out`}
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
