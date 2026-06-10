import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const recentAttempts = [
  {
    title: "Introduce yourself in 5 lines",
    mode: "Guided practice",
    date: "Today, 10:30 AM",
    score: "8.2",
    status: "Intermediate",
  },
  {
    title: "Why do you want to improve your English?",
    mode: "Free writing",
    date: "Yesterday, 6:15 PM",
    score: "7.6",
    status: "Intermediate",
  },
  {
    title: "Describe your daily routine",
    mode: "Guided practice",
    date: "8 Jun, 4:40 PM",
    score: "7.3",
    status: "Beginner",
  },
];

const scoreBreakdown = [
  { label: "Grammar", score: "8.4", width: "84%" },
  { label: "Clarity", score: "8.1", width: "81%" },
  { label: "Vocabulary", score: "7.8", width: "78%" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] border-r border-slate-200/80 bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2.5 px-5">
          <Logo />
          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            SpeakReady
          </span>
        </div>

        <nav className="flex-1 px-3 py-5">
          <p className="mb-2 px-3 text-[11px] font-medium text-slate-400">
            Workspace
          </p>
          <div className="space-y-1">
            <NavItem icon="home" label="Overview" active />
            <NavItem icon="practice" label="Practice" />
            <NavItem icon="history" label="History" />
          </div>
        </nav>

        <div className="border-t border-slate-100 p-3">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-blue-50 text-xs font-semibold text-blue-700">
                RS
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-800">
                Rahul Sharma
              </p>
              <p className="truncate text-[11px] text-slate-400">
                Intermediate learner
              </p>
            </div>
            <Icon name="more" className="h-4 w-4 text-slate-400" />
          </div>
          <Button
            variant="ghost"
            className="mt-1 h-10 w-full justify-start rounded-lg px-3 text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <Icon name="logout" className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <Logo />
              </div>
              <div>
                <p className="text-sm font-semibold">Overview</p>
                <p className="hidden text-[11px] text-slate-400 sm:block">
                  Wednesday, June 10
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-lg text-slate-500"
                aria-label="Notifications"
              >
                <Icon name="bell" className="h-[18px] w-[18px]" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-white" />
              </Button>
              <Button className="h-9 rounded-lg px-3.5 text-xs shadow-none">
                <Icon name="plus" className="h-4 w-4" />
                <span className="hidden sm:inline">New practice</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-lg text-slate-500 shadow-none lg:hidden"
                aria-label="Log out"
              >
                <Icon name="logout" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1180px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
          <section className="dashboard-enter">
            <h1 className="text-2xl font-semibold tracking-[-0.035em] sm:text-[28px]">
              Good evening, Rahul
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Continue building confidence with a short English practice.
            </p>
          </section>

          <section className="dashboard-enter dashboard-delay-1 mt-7 grid gap-4 sm:grid-cols-3">
            <Stat
              label="Latest score"
              value="8.2"
              suffix="/10"
              helper="+0.6 from last attempt"
              tone="success"
            />
            <Stat
              label="Practice streak"
              value="6"
              suffix="days"
              helper="Personal best: 11 days"
            />
            <Stat
              label="Weekly goal"
              value="4"
              suffix="of 5"
              helper="One practice remaining"
            />
          </section>

          <section className="dashboard-enter dashboard-delay-2 mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <Card className="dashboard-card overflow-hidden rounded-2xl border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
              <CardContent className="relative p-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(37,99,235,0.08),transparent_38%)]" />
                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <Badge className="rounded-md border-blue-100 bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
                      Recommended next
                    </Badge>
                    <span className="text-xs text-slate-400">8-10 min</span>
                  </div>

                  <div className="mt-10 max-w-xl">
                    <p className="text-xs font-medium text-blue-600">
                      Guided practice
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-slate-950">
                      Tell me about your career goal
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Practice a clear interview response and receive feedback
                      on grammar, clarity, and vocabulary.
                    </p>
                  </div>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button
                      size="lg"
                      className="dashboard-button h-11 rounded-xl px-5 shadow-lg shadow-blue-600/15"
                    >
                      Start practice
                      <Icon name="arrow" className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="h-11 rounded-xl px-4 text-slate-500"
                    >
                      Choose another topic
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card rounded-2xl border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
              <CardHeader className="px-5 pt-5">
                <CardTitle className="text-sm font-semibold">
                  Weekly progress
                </CardTitle>
                <CardDescription className="text-xs">
                  You&apos;re almost at your goal
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-semibold tracking-[-0.04em]">
                      80%
                    </span>
                    <p className="mt-1 text-xs text-slate-400">4 of 5 sessions</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon name="trend" className="h-[18px] w-[18px]" />
                  </span>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="dashboard-progress h-full w-4/5 rounded-full bg-blue-600" />
                </div>

                <div className="mt-6 grid grid-cols-7 gap-1.5">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                    <div key={`${day}-${index}`} className="text-center">
                      <span
                        className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold ${
                          index < 4
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {index < 4 ? (
                          <Icon name="check" className="h-3.5 w-3.5" />
                        ) : (
                          day
                        )}
                      </span>
                      <span className="mt-1.5 block text-[9px] text-slate-400">
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="dashboard-enter dashboard-delay-3 mt-5 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
            <Card className="dashboard-card rounded-2xl border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
              <CardHeader className="flex-row items-start justify-between px-5 pt-5">
                <div>
                  <CardTitle className="text-sm font-semibold">
                    Latest performance
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs">
                    Guided practice
                  </CardDescription>
                </div>
                <Badge variant="success" className="font-medium">
                  Improving
                </Badge>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-5">
                <div className="flex items-end gap-1.5">
                  <span className="text-4xl font-semibold tracking-[-0.05em]">
                    8.2
                  </span>
                  <span className="pb-1 text-xs text-slate-400">out of 10</span>
                </div>

                <div className="mt-7 space-y-4">
                  {scoreBreakdown.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="font-semibold text-slate-700">
                          {item.score}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="dashboard-progress h-full rounded-full bg-slate-800"
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card overflow-hidden rounded-2xl border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
              <CardHeader className="flex-row items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <CardTitle className="text-sm font-semibold">
                    Recent attempts
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs">
                    Your latest practice activity
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-blue-600"
                >
                  View all
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {recentAttempts.map((attempt) => (
                    <div
                      key={attempt.title}
                      className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50/70"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Icon name="document" className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-slate-800 sm:text-sm">
                          {attempt.title}
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                          {attempt.mode}
                          <span className="h-1 w-1 rounded-full bg-slate-300" />
                          {attempt.date}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="hidden rounded-md px-2 py-1 text-[10px] font-medium sm:inline-flex"
                      >
                        {attempt.status}
                      </Badge>
                      <div className="w-10 text-right">
                        <p className="text-sm font-semibold">{attempt.score}</p>
                        <p className="text-[9px] text-slate-400">score</p>
                      </div>
                      <Icon
                        name="chevron"
                        className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  helper,
  tone,
}: {
  label: string;
  value: string;
  suffix: string;
  helper: string;
  tone?: "success";
}) {
  return (
    <Card className="dashboard-card rounded-2xl border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <div className="mt-3 flex items-end gap-1.5">
          <span className="text-2xl font-semibold tracking-[-0.04em]">
            {value}
          </span>
          <span className="pb-0.5 text-xs text-slate-400">{suffix}</span>
        </div>
        <p
          className={`mt-3 text-[11px] ${
            tone === "success" ? "text-emerald-600" : "text-slate-400"
          }`}
        >
          {helper}
        </p>
      </CardContent>
    </Card>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href="#"
      className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition ${
        active
          ? "bg-blue-50 font-medium text-blue-700"
          : "font-normal text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon name={icon} className="h-[17px] w-[17px]" />
      {label}
    </Link>
  );
}

function Logo() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/20">
      <Icon name="message" className="h-4 w-4" />
    </span>
  );
}

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9M9 20v-7h6v7" />
      </>
    ),
    practice: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5M12 7v5l3 2" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    trend: (
      <>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
    check: <path d="m7 12 3 3 7-7" />,
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    message: (
      <path d="M7 8.5h10M7 12h6m-8.5 7 2.1-3.15A8 8 0 1 1 20 10a8 8 0 0 1-8 8H4.5Z" />
    ),
  };

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
      {paths[name]}
    </svg>
  );
}
