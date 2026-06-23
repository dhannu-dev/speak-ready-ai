"use client";

import { jobRoles, type JobRole } from "../data";

type JobRoleSelectorProps = {
  selectedRole: string | null;
  onSelectRole: (roleId: string) => void;
};

const colorMap: Record<string, { bg: string; border: string; hover: string; badge: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", hover: "hover:border-blue-400 hover:shadow-md", badge: "bg-blue-100 text-blue-700" },
  violet: { bg: "bg-violet-50", border: "border-violet-200", hover: "hover:border-violet-400 hover:shadow-md", badge: "bg-violet-100 text-violet-700" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", hover: "hover:border-emerald-400 hover:shadow-md", badge: "bg-emerald-100 text-emerald-700" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", hover: "hover:border-amber-400 hover:shadow-md", badge: "bg-amber-100 text-amber-700" },
  rose: { bg: "bg-rose-50", border: "border-rose-200", hover: "hover:border-rose-400 hover:shadow-md", badge: "bg-rose-100 text-rose-700" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", hover: "hover:border-cyan-400 hover:shadow-md", badge: "bg-cyan-100 text-cyan-700" },
};

export function JobRoleSelector({ selectedRole, onSelectRole }: JobRoleSelectorProps) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-slate-900">Choose Your Target Role</h2>
        <p className="mt-1 text-sm text-slate-500">
          Select a job role to practice interview questions tailored for that position
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobRoles.map((role, index) => {
          const colors = colorMap[role.color] || colorMap.blue;
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`dashboard-card group relative flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all ${
                isSelected
                  ? `${colors.border} ${colors.bg} ring-2 ring-blue-500/20 shadow-lg`
                  : `border-slate-200 bg-white hover:bg-slate-50/50 ${colors.hover}`
              }`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${colors.bg} ${isSelected ? "shadow-sm" : ""}`}>
                {role.icon}
              </div>

              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                {role.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {role.description}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${colors.badge}`}>
                  5 questions
                </span>
                <span className="inline-flex h-6 items-center rounded-full bg-slate-100 px-2.5 text-[10px] font-medium text-slate-600">
                  ~10 min
                </span>
              </div>

              {isSelected && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="m7 12 3 3 7-7" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
