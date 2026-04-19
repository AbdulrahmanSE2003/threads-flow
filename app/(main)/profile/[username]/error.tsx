"use client";

import { UserX, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-white dark:bg-main border border-border w-full md:w-[672px] rounded-3xl flex flex-col items-center justify-center min-h-[400px] p-8 text-center shadow-sm">
      {/* Icon with a soft background circle */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900/50">
        <UserX className="h-10 w-10 text-zinc-400" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Profile Unavailable
        </h2>
        <p className="mx-auto max-w-[320px] text-[15px] text-muted-foreground leading-relaxed">
          We couldn&apos;t load this profile&apos;s information. This might be a
          temporary connection issue.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 w-full max-w-[200px]">
        <button
          onClick={() => reset()}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background",
            "transition-all duration-300 hover:opacity-90 active:scale-95 cursor-pointer",
          )}
        >
          <RefreshCcw className="h-4 w-4" />
          Reload Profile
        </button>

        <button
          onClick={() => window.history.back()}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer"
        >
          Go back
        </button>
      </div>

      {/* Subtle Error ID for support/debugging */}
      {error.digest && (
        <p className="mt-8 text-[10px] uppercase tracking-widest text-zinc-400">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
