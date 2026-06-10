"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, isError, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fc] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-32 h-112 w-md rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-4xl border border-slate-200/80 bg-white shadow-[0_32px_100px_-32px_rgba(15,23,42,0.22)]">
        <section className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.3),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,0.25),transparent_35%)]" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

          <Brand className="relative" />

          <div className="relative max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-200">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Your learning space is ready
            </span>
            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.035em]">
              Welcome back.
              <span className="block text-slate-400">Keep moving forward.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-slate-400">
              Continue your practice, review your progress, and take another
              confident step toward better English.
            </p>

            <div className="mt-9 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm leading-6 text-slate-300">
                &ldquo;Small daily improvements lead to remarkable
                results.&rdquo;
              </p>
              <p className="mt-3 text-xs font-medium text-slate-500">
                Your SpeakReady journey
              </p>
            </div>
          </div>

          <p className="relative text-xs text-slate-500">
            Practice consistently. Improve confidently.
          </p>
        </section>

        <section className="flex w-full items-center justify-center px-6 py-10 sm:px-12 lg:w-[54%] lg:px-16">
          <div className="w-full max-w-md">
            <Brand className="mb-10 lg:hidden" />

            <div>
              <p className="text-sm font-semibold text-blue-600">
                Welcome back
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Sign in to your account
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your details to continue your learning journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <Label
                  htmlFor="email"
                  className="mb-2 font-semibold"
                >
                  Email address
                </Label>
                <div className="group relative">
                  <FieldIcon type="email" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 rounded-xl pl-12 pr-4"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="font-semibold"
                  >
                    Password
                  </Label>
                  <span className="text-xs font-medium text-blue-600">
                    Forgot password?
                  </span>
                </div>
                <div className="group relative">
                  <FieldIcon type="password" />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 rounded-xl pl-12 pr-4"
                  />
                </div>
              </div>

              {isError && (
                <Alert className="rounded-xl">
                  <AlertDescription>
                    {error instanceof Error ? error.message : "Login failed"}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className="group w-full font-semibold hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/25 active:translate-y-0 disabled:hover:translate-y-0"
              >
                {isPending ? "Signing in..." : "Sign in"}
                {!isPending && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10h12m-5-5 5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              New to SpeakReady?{" "}
              <Link
                href="/"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Brand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            d="M7 8.5h10M7 12h6m-8.5 7 2.1-3.15A8 8 0 1 1 20 10a8 8 0 0 1-8 8H4.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">SpeakReady</span>
    </div>
  );
}

function FieldIcon({ type }: { type: "email" | "password" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition group-focus-within:text-blue-600"
      aria-hidden="true"
    >
      {type === "email" ? (
        <path
          d="m3 6 9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M7 10V8a5 5 0 0 1 10 0v2m-9 11h8a3 3 0 0 0 3-3v-5a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3Zm4-7v3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
