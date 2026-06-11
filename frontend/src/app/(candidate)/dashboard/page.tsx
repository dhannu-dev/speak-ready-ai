"use client";

import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

import { DashboardContent } from "./components/DashboardContent";
import { DashboardIcon } from "./components/DashboardIcon";
import { navigationItems } from "./data";

export default function DashboardPage() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-[74px] items-center gap-3 border-b border-slate-200 px-5">
          <BrandMark />
          <div>
            <p className="text-base font-semibold leading-5">SpeakReady</p>
            <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">
              English learner
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-5" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`flex h-11 items-center gap-3 rounded-xl px-4 text-sm transition-colors ${
                item.active
                  ? "bg-blue-50 font-semibold text-blue-600"
                  : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <DashboardIcon name={item.icon} className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <Button
            variant="ghost"
            onClick={() => logout()}
            disabled={isPending}
            className="h-11 w-full justify-start rounded-xl px-4 font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"
          >
            <DashboardIcon name="logout" className="h-[18px] w-[18px]" />
            {isPending ? "Logging out..." : "Log out"}
          </Button>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 h-[74px] border-b border-slate-200 bg-white">
          <div className="flex h-full items-center justify-between px-4 sm:px-7 lg:px-10">
            <div className="flex items-center gap-3">
              <span className="lg:hidden">
                <BrandMark />
              </span>
              <DashboardIcon
                name="panel"
                className="hidden h-5 w-5 text-slate-700 lg:block"
              />
              <p className="text-sm font-semibold sm:text-base">Dashboard</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full text-slate-600"
                aria-label="Notifications"
              >
                <DashboardIcon name="bell" className="h-[19px] w-[19px]" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-blue-600" />
              </Button>

              <div className="hidden h-8 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-2.5">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-50 text-xs text-blue-600">
                    RS
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold leading-4">Rahul Sharma</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">
                    Intermediate
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => logout()}
                disabled={isPending}
                className="h-10 w-10 rounded-full text-slate-600 lg:hidden"
                aria-label="Log out"
              >
                <DashboardIcon name="logout" className="h-[18px] w-[18px]" />
              </Button>
            </div>
          </div>
        </header>

        <DashboardContent />
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
      <DashboardIcon name="message" className="h-5 w-5" />
    </span>
  );
}
