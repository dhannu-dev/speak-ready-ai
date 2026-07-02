"use client";

import { conversationTopics } from "../data";

type TopicListProps = {
  selectedTopicId: number | null;
  onSelectTopic: (id: number) => void;
};

export function TopicList({ selectedTopicId, onSelectTopic }: TopicListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Conversation Topics</h3>
      <div className="space-y-1">
        {conversationTopics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-base">{topic.icon}</span>
              {topic.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
