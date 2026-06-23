"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { type InterviewQuestion } from "../data";

type InterviewSessionProps = {
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  onSubmitAnswer: (answer: string) => void;
  onSkip: () => void;
  onEndInterview: () => void;
  isListening: boolean;
  onToggleMic: () => void;
  recordingTime: number;
  liveTranscript: string;
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function InterviewSession({
  questions,
  currentQuestionIndex,
  answers,
  onSubmitAnswer,
  onSkip,
  onEndInterview,
  isListening,
  onToggleMic,
  recordingTime,
  liveTranscript,
}: InterviewSessionProps) {
  const [answer, setAnswer] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    setAnswer("");
  }, [currentQuestionIndex]);

  const handleSubmit = () => {
    if (answer.trim().length < 5) return;
    onSubmitAnswer(answer);
    setAnswer("");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
      {/* Main Area */}
      <div className="space-y-5">
        {/* Progress Bar */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs font-medium text-slate-400">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-600/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M7 8.5h10M7 12h6m-8.5 7 2.1-3.15A8 8 0 1 1 20 10a8 8 0 0 1-8 8H4.5Z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                AI Interviewer
              </p>
              <p className="mt-2 text-base leading-7 text-slate-900">
                {currentQuestion.question}
              </p>
            </div>
          </div>

          {/* Voice Indicator */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-[3px] h-5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full bg-blue-400 sound-wave-bar"
                  style={{ height: "100%", animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-slate-500">
              AI is reading the question aloud...
            </span>
            <button className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Answer Input */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Your Answer
          </p>

          <div className="relative">
            <textarea
              ref={textareaRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here... Take your time and speak clearly."
              className={`w-full resize-none rounded-xl border bg-white p-4 text-sm leading-7 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-colors ${
                isListening
                  ? "border-red-200 focus:border-red-300 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-blue-300"
              } ${isListening ? "h-40" : "h-52"}`}
            />

            {!isListening && (
              <div className="absolute bottom-3 right-3">
                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                    answer.length >= 5
                      ? "bg-emerald-50 text-emerald-600"
                      : answer.length > 0
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {answer.length} characters
                </span>
              </div>
            )}
          </div>

          {/* Voice Input */}
          <div className={`mt-3 overflow-hidden rounded-xl border transition-all duration-300 ${
            isListening ? "border-red-200 bg-red-50/50" : "border-slate-200 bg-slate-50"
          }`}>
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                onClick={onToggleMic}
                className={`inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-all ${
                  isListening
                    ? "bg-red-600 text-white shadow-sm mic-pulse"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 ${isListening ? "text-white" : "text-slate-500"}`}>
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
                {isListening ? "Stop" : "Speak"}
              </button>

              {isListening && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-[3px] h-5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-[3px] rounded-full bg-red-400 sound-wave-bar" style={{ height: "100%" }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500 recording-dot" />
                    <span className="text-xs font-medium text-red-600">Recording</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-red-500 tabular-nums">
                    {formatTime(recordingTime)}
                  </span>
                </div>
              )}

              {!isListening && (
                <p className="text-xs text-slate-400">
                  Click speak to dictate your answer
                </p>
              )}
            </div>

            {isListening && liveTranscript && (
              <div className="border-t border-red-100 px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400 mb-1">
                  Live transcript
                </p>
                <p className="text-sm leading-6 text-slate-700">{liveTranscript}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center justify-between">
            <Button
              onClick={onSkip}
              variant="ghost"
              className="text-slate-500 hover:text-slate-700"
            >
              Skip Question
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={answer.trim().length < 5}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {currentQuestionIndex === totalQuestions - 1 ? (
                <>Finish Interview</>
              ) : (
                <>
                  Submit Answer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M5 12h14m-5-5 5 5-5 5" />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Timer */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-slate-400">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Session Time
            </span>
          </div>
          <p className="text-2xl font-bold tabular-nums text-slate-900">
            {formatTime(recordingTime)}
          </p>
        </div>

        {/* Questions Checklist */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Progress
          </p>
          <div className="space-y-2">
            {questions.map((q, index) => {
              const isAnswered = !!answers[index] && answers[index].length > 0;
              const isCurrent = index === currentQuestionIndex;

              return (
                <div
                  key={q.id}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    isCurrent ? "bg-blue-50 border border-blue-200" : ""
                  }`}
                >
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    isAnswered
                      ? "bg-emerald-100 text-emerald-700"
                      : isCurrent
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                  }`}>
                    {isAnswered ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <path d="m7 12 3 3 7-7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p className={`text-xs leading-5 ${
                    isCurrent ? "font-medium text-blue-700" : isAnswered ? "text-slate-600" : "text-slate-400"
                  }`}>
                    Q{index + 1}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* End Interview */}
        <button
          onClick={onEndInterview}
          className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
        >
          End Interview
        </button>
      </div>
    </div>
  );
}
