"use client";

import type { ChatMessageType } from "../data";

type ChatMessageProps = {
  message: ChatMessageType;
};

function TutorAvatar() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-slate-700 to-slate-900 text-white shadow-md">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M7 8.5h10M7 12h6m-8.5 7 2.1-3.15A8 8 0 1 1 20 10a8 8 0 0 1-8 8H4.5Z" />
      </svg>
    </div>
  );
}

function SpeakerIcon() {
  return (
    <button className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    </button>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === "suggestion") {
    return (
      <div className="flex items-start gap-3 pl-13">
        <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50/80 px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">💡</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600">
              Suggestion
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-800">
            {message.content}
          </p>
          {message.explanation && (
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {message.explanation}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (message.role === "tutor") {
    return (
      <div className="flex items-start gap-3">
        <TutorAvatar />
        <div className="max-w-lg">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-slate-700">Tutor</span>
            <SpeakerIcon />
          </div>
          <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-sm leading-7 text-slate-800">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="max-w-md rounded-2xl rounded-tr-md bg-slate-900 px-5 py-4 shadow-md">
        <p className="text-sm leading-7 text-white">
          {message.content}
        </p>
      </div>
    </div>
  );
}
