import { getBackendStatus } from "@/lib/api";

export default async function Home() {
  let status;
  let errorMessage = "";

  try {
    status = await getBackendStatus();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unable to reach backend";
  }

  const isConnected = Boolean(status);

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10 text-neutral-950">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="border-b border-neutral-200 pb-6">
          <p className="text-sm font-medium uppercase text-emerald-700">
            Full-stack connection
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            English Internship App
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
            The frontend is reading live data from the Express API through an
            environment-configured service layer.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">API status</p>
            <div className="mt-3 flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${
                  isConnected ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              <p className="text-xl font-semibold">
                {isConnected ? "Connected" : "Offline"}
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">Environment</p>
            <p className="mt-3 text-xl font-semibold">
              {status?.environment || "Unavailable"}
            </p>
          </article>

          <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">Server time</p>
            <p className="mt-3 text-xl font-semibold">
              {status
                ? new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                    timeStyle: "medium",
                  }).format(new Date(status.serverTime))
                : "Unavailable"}
            </p>
          </article>
        </div>

        <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Backend response</h2>
          <pre className="mt-4 overflow-x-auto rounded-md bg-neutral-950 p-4 text-sm text-neutral-50">
            {JSON.stringify(status || { error: errorMessage }, null, 2)}
          </pre>
        </section>
      </section>
    </main>
  );
}
