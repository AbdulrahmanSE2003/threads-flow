"use client";

export default function FeedError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <p className="text-red-500">Something went wrong loading the feed.</p>
      <button
        onClick={reset}
        className="border border-border px-4 py-2 rounded-xl text-sm"
      >
        Try again
      </button>
    </div>
  );
}
