import { Badge } from "@/components/ui/badge";
import { PracticeIcon } from "../data";
import { ScoreCard } from "./ScoreCard";
import { MistakeList } from "./MistakeList";

type FeedbackData = {
  correctedText: string;
  summaryHindi: string;
  level: string;
  scores: {
    grammar: number;
    vocabulary: number;
    clarity: number;
    overall: number;
  };
  mistakes: {
    wrong: string;
    correct: string;
    explanationHindi: string;
  }[];
  weakAreas: string[];
  personalizedExercises: string[];
  motivationHindi: string;
};

type FeedbackPanelProps = {
  feedback: FeedbackData;
  onReset: () => void;
};

export function FeedbackPanel({ feedback, onReset }: FeedbackPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <PracticeIcon name="sparkle" className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Feedback Report
            </p>
            <p className="text-xs text-slate-500">AI-powered analysis</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <PracticeIcon name="refresh" className="h-3.5 w-3.5" />
          Practice again
        </button>
      </div>

      <ScoreCard
        overallScore={feedback.scores.overall}
        level={feedback.level}
        scores={feedback.scores}
      />

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Corrected English
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {feedback.correctedText}
        </p>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <PracticeIcon name="penLine" className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-blue-600">
              Hindi Summary
            </p>
            <p className="mt-1.5 text-sm leading-6 text-blue-900">
              {feedback.summaryHindi}
            </p>
          </div>
        </div>
      </div>

      <MistakeList mistakes={feedback.mistakes} />

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">Weak Areas</h3>
        <ul className="mt-3 space-y-2">
          {feedback.weakAreas.map((area, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <span className="text-xs leading-5 text-slate-600">{area}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Personalized Exercises
        </h3>
        <ul className="mt-3 space-y-2">
          {feedback.personalizedExercises.map((exercise, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[10px] font-bold text-blue-600">
                {index + 1}
              </span>
              <span className="text-xs leading-5 text-slate-600">
                {exercise}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <PracticeIcon name="trophy" className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-emerald-600">
              Motivation
            </p>
            <p className="mt-1.5 text-sm leading-6 text-emerald-900">
              {feedback.motivationHindi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
