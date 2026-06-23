"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DashboardIcon } from "../dashboard/components/DashboardIcon";
import { navigationItems } from "../dashboard/data";

import {
  jobRoles,
  questionsByRole,
  mockFeedback,
  type InterviewPhase,
} from "./data";
import { JobRoleSelector } from "./components/JobRoleSelector";
import { InterviewSession } from "./components/InterviewSession";
import { InterviewFeedback } from "./components/InterviewFeedback";

export default function InterviewPage() {
  const [phase, setPhase] = useState<InterviewPhase>("select");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const recoginationRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState("");
  const timerRef = useRef<any>(null);

  const selectedRoleData = jobRoles.find((r) => r.id === selectedRole);
  const questions = selectedRole ? questionsByRole[selectedRole] || [] : [];

  const handleStartInterview = () => {
    if (!selectedRole) {
      toast.warning("Select a role first!", {
        description: "Pick a job role before starting the interview.",
      });
      return;
    }
    setPhase("session");
    setCurrentQuestionIndex(0);
    setAnswers({});
    toast("Interview started!", {
      description: `Answering questions for ${selectedRoleData?.title}`,
    });
  };

  const handleSubmitAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      toast("Answer saved!", {
        description: `Moving to question ${currentQuestionIndex + 2} of ${questions.length}`,
      });
    } else {
      setPhase("feedback");
      toast.success("Interview complete!", {
        description: "Check out your feedback below.",
      });
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setPhase("feedback");
    }
  };

  const handleEndInterview = () => {
    setPhase("feedback");
    toast("Interview ended.", {
      description: "Here's your feedback for this session.",
    });
  };

  const handleTryAgain = () => {
    setPhase("session");
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleNewRole = () => {
    setPhase("select");
    setSelectedRole(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleToggleMic = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!recoginationRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        let interimText = "";
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += transcript;
          } else {
            interimText += transcript;
          }
        }
        if (finalText) {
          setLiveTranscript("");
        } else {
          setLiveTranscript(interimText);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        clearInterval(timerRef.current);
        setRecordingTime(0);
        setLiveTranscript("");
      };

      recognition.onend = () => {
        setIsListening(false);
        clearInterval(timerRef.current);
        setRecordingTime(0);
        setLiveTranscript("");
      };

      recoginationRef.current = recognition;
    }

    if (isListening) {
      recoginationRef.current.stop();
      setIsListening(false);
      clearInterval(timerRef.current);
      setRecordingTime(0);
      setLiveTranscript("");
    } else {
      recoginationRef.current.start();
      setIsListening(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  }, [isListening]);

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-950">
      {/* Sidebar */}
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

        <nav className="flex-1 space-y-1 px-4 py-5" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.label === "Interview" ? "page" : undefined}
              className={`flex h-11 items-center gap-3 rounded-xl px-4 text-sm transition-colors ${
                item.label === "Interview"
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

      {/* Main Content */}
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
                <span className="text-xl">🎤</span>
                <p className="text-sm font-semibold sm:text-base">
                  Interview Practice
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
          {/* Page Header */}
          <section className="dashboard-enter flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                Ace Your Next{" "}
                <span className="text-blue-600">Interview</span>{" "}
                <span className="text-2xl">🎯</span>
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Practice with AI-powered questions tailored to your target role
              </p>
            </div>

            {phase === "select" && (
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 items-center rounded-full bg-blue-50 px-3 text-xs font-semibold text-blue-600 border border-blue-200">
                  6 roles available
                </span>
              </div>
            )}

            {phase === "session" && selectedRoleData && (
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-blue-50 px-3 text-xs font-semibold text-blue-600 border border-blue-200">
                  {selectedRoleData.icon} {selectedRoleData.title}
                </span>
              </div>
            )}
          </section>

          {/* Content based on phase */}
          <section className="dashboard-enter dashboard-delay-1 mt-8">
            {phase === "select" && (
              <div className="space-y-6">
                <JobRoleSelector
                  selectedRole={selectedRole}
                  onSelectRole={setSelectedRole}
                />

                {selectedRole && (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleStartInterview}
                      className="h-12 rounded-xl px-8 text-sm font-semibold bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Start Interview
                    </Button>
                  </div>
                )}
              </div>
            )}

            {phase === "session" && (
              <InterviewSession
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                answers={answers}
                onSubmitAnswer={handleSubmitAnswer}
                onSkip={handleSkip}
                onEndInterview={handleEndInterview}
                isListening={isListening}
                onToggleMic={handleToggleMic}
                recordingTime={recordingTime}
                liveTranscript={liveTranscript}
              />
            )}

            {phase === "feedback" && (
              <InterviewFeedback
                feedback={mockFeedback}
                onTryAgain={handleTryAgain}
                onNewRole={handleNewRole}
              />
            )}
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
