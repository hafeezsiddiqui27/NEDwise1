"use client";

const DEFAULT_QUESTIONS = [
  "Summarize the main points",
  "Explain this in simple words",
  "What should I remember?",
];

export function SuggestedQuestions({ onSelect, questions = DEFAULT_QUESTIONS }: { onSelect: (question: string) => void; questions?: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <button key={question} onClick={() => onSelect(question)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 hover:border-slate-400 hover:text-slate-900">
          {question}
        </button>
      ))}
    </div>
  );
}
