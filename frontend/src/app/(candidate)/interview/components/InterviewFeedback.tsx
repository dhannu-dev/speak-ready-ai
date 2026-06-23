"use client";

import { Button } from "@/components/ui/button";
import { type InterviewFeedback as FeedbackType } from "../data";

type InterviewFeedbackProps = {
  feedback: FeedbackType;
  onTryAgain: () => void;
  onNewRole: () => void;
};

export function InterviewFeedback({ feedback, onTryAgain, onNewRole }: InterviewFeedbackProps) {
  const scoreColor =
    feedback.overallScore >= 8
      ? "text-emerald-600"
      : feedback.overallScore >= 6
        ? "text-amber-600"
        : "text-red-600";

  const scoreRingColor =
    feedback.overallScore >= 8
      ? "stroke-emerald-500"
      : feedback.overallScore >= 6
        ? "stroke-amber-500"
        : "stroke-red-500";

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-32 w-32">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(feedback.overallScore / 10) * 326.7} 326.7`}
                className={`${scoreRingColor} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${scoreColor}`}>
                {feedback.overallScore}
              </span>
              <span className="text-[10px] font-medium text-slate-400">out of 10</span>
            </div>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Interview Complete!
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s how you performed in this session
          </p>
        </div>
      </div>

      {/* Category Scores */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
          Category Breakdown
        </h4>
        <div className="space-y-4">
          {feedback.categoryScores.map((cat) => {
            const barColor =
              cat.score >= 8
                ? "from-emerald-400 to-emerald-500"
                : cat.score >= 6
                  ? "from-amber-400 to-amber-500"
                  : "from-red-400 to-red-500";

            return (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-700">{cat.label}</span>
                  <span className="text-sm font-bold text-slate-900">
                    {cat.score}<span className="text-xs text-slate-400">/{cat.maxScore}</span>
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${barColor} transition-all duration-700 ease-out`}
                    style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Strengths */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-600">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
                <path d="m7 12 3 3 7-7" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-emerald-800">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {feedback.strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span className="text-xs leading-5 text-emerald-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-amber-600">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-amber-800">Areas to Improve</h4>
          </div>
          <ul className="space-y-2">
            {feedback.improvements.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span className="text-xs leading-5 text-amber-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3">
        <Button
          onClick={onNewRole}
          variant="outline"
          className="h-11 rounded-xl px-6 text-sm font-semibold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          New Role
        </Button>
        <Button
          onClick={onTryAgain}
          className="h-11 rounded-xl px-6 text-sm font-semibold bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
          Try Again
        </Button>
      </div>
    </div>
  );
}
