"use client";

import { useEffect, useRef } from "react";
import { PracticeIcon } from "../data";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

type PracticeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  selectedPromptTitle: string | null;
  isGuided: boolean;
};

export function PracticeEditor({
  value,
  onChange,
  selectedPromptTitle,
  isGuided,
}: PracticeEditorProps) {
  const charCount = value.length;
  const progress = Math.min((charCount / 200) * 100, 100);

  const valueRef = useRef(value);
  valueRef.current = value;

  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      const current = valueRef.current;
      const newValue = current ? current + " " + transcript : transcript;
      onChange(newValue);
      resetTranscript();
    }
  }, [transcript, onChange, resetTranscript]);

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  return (
    <div className="space-y-3">
      {isGuided && selectedPromptTitle && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <PracticeIcon name="lightbulb" className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-amber-600">
                Active Quest
              </p>
              <p className="mt-1 text-sm font-medium text-amber-900">
                {selectedPromptTitle}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isGuided
              ? "Write your answer here... Take your time and focus on grammar and sentence structure."
              : "Start writing freely... Practice expressing your thoughts in English."
          }
          className="h-64 w-full resize-none rounded-xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:h-80"
        />

        <div className="absolute bottom-3 right-3 flex items-center gap-3">
          {isSupported && (
            <button
              onClick={toggleMic}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                isListening
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
              title={isListening ? "Stop recording" : "Start voice input"}
            >
              {isListening ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M6 6h12v12H6z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              )}
            </button>
          )}

          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span
            className={`rounded-md px-2 py-1 text-[10px] font-medium ${
              charCount >= 10
                ? "bg-emerald-50 text-emerald-600"
                : charCount > 0
                  ? "bg-amber-50 text-amber-600"
                  : "bg-slate-100 text-slate-400"
            }`}
          >
            {charCount} characters
          </span>
        </div>
      </div>

      {isListening && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 border border-red-100">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          Listening... Speak now!
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-600 border border-amber-100">
          {error}
        </div>
      )}

      {!isSupported && (
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 border border-slate-100">
          Voice input is only available in Chrome and Edge browsers.
        </div>
      )}
    </div>
  );
}
