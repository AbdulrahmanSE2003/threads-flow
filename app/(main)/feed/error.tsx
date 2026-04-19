"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col h-1/2 items-center justify-center gap-6 rounded-3xl border border-border bg-white dark:bg-main p-12 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30">
        <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          Couldn&apos;t load your feed
        </h3>
        <p className="mx-auto max-w-[300px] text-sm text-muted-foreground">
          We’re having trouble reaching our servers. Check your connection and
          try again.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className={cn(
          "flex items-center gap-2 rounded-xl bg-foreground px-6 py-2.5 text-sm font-medium text-background",
          "transition-all duration-300 hover:opacity-90 active:scale-95 cursor-pointer",
        )}
      >
        <RotateCcw className="h-4 w-4" />
        Try again
      </button>

      {process.env.NODE_ENV === "development" && (
        <p className="mt-4 text-[10px] font-mono text-red-400/60 break-all max-w-xs">
          Debug: {error.message}
        </p>
      )}
    </div>
  );
}
