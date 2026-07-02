"use client";

import { PracticeIcon } from "../data";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onToggleMic: () => void;
  isListening: boolean;
  liveTranscript: string;
  disabled?: boolean;
};

export function ChatInput({
  value,
  onChange,
  onSend,
  onToggleMic,
  isListening,
  liveTranscript,
  disabled,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="space-y-3">
      {isListening && liveTranscript && (
        <div className="rounded-xl border border-red-100 bg-red-50/50 px-4 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400 mb-1">
            Live transcript
          </p>
          <p className="text-sm leading-6 text-slate-700">{liveTranscript}</p>
        </div>
      )}

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <button
          onClick={onToggleMic}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all ${
            isListening
              ? "bg-slate-900 text-white shadow-lg mic-pulse"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
          aria-label={isListening ? "Stop recording" : "Start recording"}
        >
          <PracticeIcon name="microphone" className="h-5 w-5" />
        </button>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or speak your reply..."
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />

        <button
          onClick={onSend}
          disabled={disabled || value.trim().length === 0}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition-all hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900"
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>

      <p className="text-center text-[11px] text-slate-400">
        Tip: Speak naturally — your tutor will gently correct you.
      </p>
    </div>
  );
}
