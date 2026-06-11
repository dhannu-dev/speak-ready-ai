import type { DashboardIconName } from "./components/DashboardIcon";

export const navigationItems: {
  label: string;
  href: string;
  icon: DashboardIconName;
  active?: boolean;
}[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard", active: true },
  { label: "Practice", href: "/practice", icon: "practice" },
  { label: "History", href: "/history", icon: "history" },
];

export const summaryCards: {
  label: string;
  value: string;
  suffix: string;
  helper: string;
  icon: DashboardIconName;
  iconClassName: string;
}[] = [
  {
    label: "Latest score",
    value: "8.2",
    suffix: "out of 10",
    helper: "0.6 higher than last time",
    icon: "score",
    iconClassName: "bg-blue-600",
  },
  {
    label: "Practice streak",
    value: "6",
    suffix: "days",
    helper: "Keep your momentum going",
    icon: "streak",
    iconClassName: "bg-emerald-500",
  },
  {
    label: "Weekly goal",
    value: "4/5",
    suffix: "sessions",
    helper: "Only one session remaining",
    icon: "target",
    iconClassName: "bg-amber-500",
  },
  {
    label: "Total practices",
    value: "24",
    suffix: "attempts",
    helper: "3 completed this week",
    icon: "practice",
    iconClassName: "bg-violet-600",
  },
];

export const recentAttempts = [
  {
    title: "Introduce yourself in 5 lines",
    mode: "Guided practice",
    date: "Today, 10:30 AM",
    score: "8.2",
    level: "Intermediate",
  },
  {
    title: "Why do you want to improve your English?",
    mode: "Free writing",
    date: "Yesterday, 6:15 PM",
    score: "7.6",
    level: "Intermediate",
  },
  {
    title: "Describe your daily routine",
    mode: "Guided practice",
    date: "June 8, 4:40 PM",
    score: "7.3",
    level: "Beginner",
  },
];

export const learningSteps = [
  {
    title: "Warm-up practice",
    detail: "Write five simple sentences about your day.",
    time: "5 min",
    completed: true,
  },
  {
    title: "Career goal response",
    detail: "Build a clear interview-ready answer.",
    time: "10 min",
    current: true,
  },
  {
    title: "Review your feedback",
    detail: "Focus on grammar and sentence structure.",
    time: "5 min",
  },
];
