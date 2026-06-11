import Link from "next/link";

import { learningSteps } from "../data";
import { DashboardIcon } from "./DashboardIcon";

export function LearningPlan() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold">Today&apos;s learning plan</h2>
          <p className="mt-1 text-xs text-slate-500">
            A simple 20 minute practice routine
          </p>
        </div>
        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
          1 of 3 done
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {learningSteps.map((step, index) => (
          <div
            key={step.title}
            className="flex items-start gap-3 px-5 py-4 sm:items-center sm:px-6"
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                step.completed
                  ? "bg-emerald-500 text-white"
                  : step.current
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              {step.completed ? (
                <DashboardIcon name="check" className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">
                {step.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {step.detail}
              </p>
            </div>

            <span className="hidden text-xs font-medium text-slate-400 sm:block">
              {step.time}
            </span>

            {step.current && (
              <Link
                href="/practice"
                className="hidden rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 sm:inline-flex"
              >
                Start
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
