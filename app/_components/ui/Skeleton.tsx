import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
