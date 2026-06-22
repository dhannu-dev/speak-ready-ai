"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DashboardIcon } from "../dashboard/components/DashboardIcon";
import { navigationItems } from "../dashboard/data";

import { guidedPrompts, mockFeedback, type PracticeMode } from "./data";
import { PromptSelector } from "./components/PromptSelector";
import { PracticeEditor } from "./components/PracticeEditor";
import { FeedbackPanel } from "./components/FeedbackPanel";
import { usePractice } from "@/hooks/usePractice";

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode>("free");
  const [selectedPromptId, setSelectedPromptId] = useState<number | null>(null);
  const [editorValue, setEditorValue] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const recoginationRef = useRef<any>(null);
  const [isListining, setIsListining] = useState(false);

  const { mutate, data, isPending } = usePractice();

  const selectedPrompt = guidedPrompts.find((p) => p.id === selectedPromptId);

  const handleReset = () => {
    setEditorValue("");
    setSelectedPromptId(null);
    setShowFeedback(false);
  };

  const handleSubmit = () => {
    if (mode === "guided" && !selectedPromptId) {
      toast.warning("Select a quest first!", {
        description: "Pick a prompt before submitting your answer.",
      });
      return;
    }
    if (editorValue.length < 10) {
      toast.warning("Write more!", {
        description: "At least 10 characters needed to analyze your practice.",
      });
      return;
    }
    mutate({ mode, prompt: "", text: editorValue });
    setShowFeedback(true);
    toast("Submitting your answer...", {
      description: "Analyzing your English skills!",
    });
  };

  const handleMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!recoginationRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setEditorValue(text);
      };

      recoginationRef.current = recognition;
    }

    if (isListining) {
      recoginationRef.current.stop();
      setIsListining(false);
      console.log("mic stope");
    } else {
      recoginationRef.current.start();
      setIsListining(true);
      console.log("Mic Started");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-55 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-18.5 items-center gap-3 border-b border-slate-200 px-5">
          <BrandMark />
          <div>
            <p className="text-base font-semibold leading-5">SpeakReady</p>
            <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">
              English learner
            </p>
          </div>
        </div>

        <nav
          className="flex-1 space-y-1 px-4 py-5"
          aria-label="Main navigation"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`flex h-11 items-center gap-3 rounded-xl px-4 text-sm transition-colors ${
                item.label === "Practice"
                  ? "bg-blue-50 font-semibold text-blue-600"
                  : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <DashboardIcon name={item.icon} className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-2 rounded-xl">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-blue-50 text-xs text-blue-600">
                RS
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-900">
                Rahul Sharma
              </p>
              <p className="mt-0.5 truncate text-[10px] text-slate-500">
                rahul@example.com
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600"
              aria-label="Log out"
            >
              <DashboardIcon name="logout" className="h-4.25 w-4.25" />
            </Button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-55">
        <header className="sticky top-0 z-20 h-18.5 border-b border-slate-200 bg-white">
          <div className="flex h-full items-center justify-between px-4 sm:px-7 lg:px-10">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:hidden"
                aria-label="Back to dashboard"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚔️</span>
                <p className="text-sm font-semibold sm:text-base">
                  Practice Arena
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 sm:flex border border-amber-200">
                <span className="text-xs">🔥</span>
                <span className="text-xs font-bold text-amber-600">
                  7 day streak
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full text-slate-600"
                aria-label="Notifications"
              >
                <DashboardIcon name="bell" className="h-4.75 w-4.75" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-blue-600" />
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-375 px-4 py-7 sm:px-7 lg:px-10 lg:py-10">
          <section className="dashboard-enter flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                Welcome back, <span className="text-blue-600">Rahul</span>{" "}
                <span className="text-2xl">🎮</span>
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Choose your mission and level up your English!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode("free")}
                className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors ${
                  mode === "free"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                🎯 Free Mode
              </button>
              <button
                onClick={() => setMode("guided")}
                className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors ${
                  mode === "guided"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                📜 Quest Mode
              </button>
            </div>
          </section>

          <section className="dashboard-enter dashboard-delay-1 mt-8 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              {mode === "guided" && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <PromptSelector
                    selectedPromptId={selectedPromptId}
                    onSelectPrompt={setSelectedPromptId}
                  />
                </div>
              )}

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <PracticeEditor
                  handleMic = {handleMic}
                  value={editorValue}
                  onChange={setEditorValue}
                  selectedPromptTitle={selectedPrompt?.title ?? null}
                  isGuided={mode === "guided"}
                />

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    {mode === "guided"
                      ? "Complete the quest to earn XP"
                      : "Write freely to practice your skills"}
                  </p>
                  <Button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Analyzing...
                      </>
                    ) : (
                      <>⚡ Get Feedback</>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              {showFeedback ? (
                <FeedbackPanel
                  feedback={data?.data?.feedback || mockFeedback}
                  onReset={handleReset}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl">
                    🏆
                  </span>
                  <p className="mt-5 text-sm font-semibold text-slate-900">
                    No feedback yet
                  </p>
                  <p className="mt-1.5 max-w-52 text-xs leading-5 text-slate-500">
                    Complete a practice session to unlock your AI-powered
                    feedback report!
                  </p>
                  <div className="mt-4 flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1">
                    <span className="text-xs">💡</span>
                    <span className="text-[10px] font-medium text-blue-600">
                      Tip: Write at least 10 characters
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
      <DashboardIcon name="message" className="h-5 w-5" />
    </span>
  );
}
