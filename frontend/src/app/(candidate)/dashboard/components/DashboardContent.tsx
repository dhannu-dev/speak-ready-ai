import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import { recentAttempts, summaryCards } from "../data";
import { DashboardIcon } from "./DashboardIcon";
import { LearningPlan } from "./LearningPlan";

export function DashboardContent() {
  return (
    <main className="mx-auto max-w-375 px-4 py-7 sm:px-7 lg:px-10 lg:py-10">
      <section className="dashboard-enter flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
            Welcome back, <span className="text-blue-600">Rahul</span>
          </h1>
          <p className=" text-sm text-slate-600">
            Keep building your English confidence with today&apos;s practice.
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          Start new practice
          <DashboardIcon name="arrow" className="h-4 w-4" />
        </Link>
      </section>

      <section className="dashboard-enter dashboard-delay-1 mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="dashboard-card flex min-h-36 items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">
                {card.label}
              </p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-semibold tracking-tight">
                  {card.value}
                </span>
                <span className="pb-1 text-xs text-slate-500">
                  {card.suffix}
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-500">{card.helper}</p>
            </div>
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${card.iconClassName}`}
            >
              <DashboardIcon name={card.icon} className="h-6 w-6" />
            </span>
          </article>
        ))}
      </section>

      <section className="dashboard-enter dashboard-delay-2 mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <LearningPlan />

        <aside className="rounded-xl border border-blue-200 bg-blue-50/70 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <Badge className="rounded-lg bg-blue-600 px-3 py-1.5">
              Recommended
            </Badge>
            <span className="text-xs font-medium text-blue-700">10 min</span>
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.08em] text-blue-600">
            Guided practice
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">
            Tell me about your career goal
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Write a clear answer and get feedback on grammar, clarity, and
            vocabulary with explanations in Hindi.
          </p>
          <Link
            href="/practice"
            className="mt-7 inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Continue practice
            <DashboardIcon name="arrow" className="h-4 w-4" />
          </Link>
        </aside>
      </section>

      <section className="dashboard-enter dashboard-delay-3 mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-semibold">Recent attempts</h2>
            <p className="mt-1 text-xs text-slate-500">
              Review your latest English practice
            </p>
          </div>
          <Link
            href="/history"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recentAttempts.map((attempt) => (
            <Link
              href="/history"
              key={attempt.title}
              className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50 sm:px-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <DashboardIcon name="document" className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {attempt.title}
                </p>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {attempt.mode} · {attempt.date}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="hidden rounded-md text-[10px] font-medium sm:inline-flex"
              >
                {attempt.level}
              </Badge>
              <div className="w-12 text-right">
                <p className="text-base font-semibold">{attempt.score}</p>
                <p className="text-[10px] text-slate-400">score</p>
              </div>
              <DashboardIcon
                name="chevron"
                className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
