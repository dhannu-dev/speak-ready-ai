import type { DashboardIconName } from "../dashboard/components/DashboardIcon";

export const guidedPrompts = [
  {
    id: 1,
    title: "Introduce yourself in 5 lines.",
    category: "Personal",
    time: "5 min",
  },
  {
    id: 2,
    title: "Describe your daily routine.",
    category: "Daily Life",
    time: "5 min",
  },
  {
    id: 3,
    title: "Why do you want to improve your English?",
    category: "Motivation",
    time: "5 min",
  },
  {
    id: 4,
    title: "Tell me about your career goal.",
    category: "Career",
    time: "10 min",
  },
  {
    id: 5,
    title: "Describe your strengths.",
    category: "Personal",
    time: "5 min",
  },
];

export type PracticeMode = "free" | "guided";

export const mockFeedback = {
  correctedEnglish:
    "My name is Rahul Sharma. I am from Jaipur, Rajasthan. I am currently pursuing my Bachelor's degree in Computer Science. I am passionate about learning new technologies and improving my communication skills. In my free time, I enjoy reading books and watching English movies to enhance my vocabulary.",
  hindiSummary:
    "Rahul ne apna parichay diya hai. Usne bataya ki wo Jaipur se hai aur Computer Science mein padhai kar raha hai. Usne apni hobbies aur English seekhne ke interest ke baare mein bhi bataya.",
  overallScore: 8.2,
  level: "Intermediate",
  scores: {
    grammar: 8.5,
    vocabulary: 7.8,
    clarity: 8.6,
    structure: 8.0,
  },
  mistakes: [
    {
      original: "I am from Jaipur, Rajasthan.",
      corrected: "I am from Jaipur, Rajasthan.",
      type: "Punctuation",
      explanation: "Correct hai! Comma properly use hua hai.",
    },
    {
      original: "I am passionate about learning new technologies",
      corrected:
        "I am passionate about learning new technologies and improving my communication skills.",
      type: "Incomplete Thought",
      explanation:
        "Sentence complete hai, but conjunction add karne se flow better hota hai.",
    },
    {
      original: "In my free time, I enjoy reading books",
      corrected:
        "In my free time, I enjoy reading books and watching English movies.",
      type: "Vocabulary",
      explanation:
        "Aur examples add karne se answer aur strong hota hai.",
    },
  ],
  weakAreas: [
    "Use more connecting words (however, furthermore, moreover)",
    "Try to vary sentence length for better rhythm",
    "Add specific examples to support your points",
  ],
  exercises: [
    "Write 5 sentences using 'furthermore' or 'moreover'",
    "Rewrite your introduction using 3 different sentence structures",
    "Practice using conditional sentences (If I..., I would...)",
  ],
  motivation:
    "Bahut achha Rahul! Tumhara English improvement ho raha hai. Regular practice se tum aur better ho jaoge. Keep it up! 💪",
};

export const practiceIcons = {
  lightbulb: (
    <>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </>
  ),
  sparkle: (
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  ),
  alertTriangle: (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  trophy: (
    <>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </>
  ),
  penLine: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  send: (
    <path d="m22 2-7 20-4-9-9-4Z" />
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </>
  ),
  bookOpen: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
} as const;

export type PracticeIconName = keyof typeof practiceIcons;

export function PracticeIcon({
  name,
  className = "",
}: {
  name: PracticeIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {practiceIcons[name]}
    </svg>
  );
}
