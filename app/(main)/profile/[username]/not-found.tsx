import Link from "next/link";
import { Ghost } from "lucide-react"; // Or any icon library you use
import { cn } from "@/lib/utils";

export default function ProfileNotFound() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-border bg-white/50 p-8 text-center dark:bg-main/50">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Ghost className="h-10 w-10 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Profile Not Found</h2>
        <p className="mx-auto max-w-[280px] text-muted-foreground">
          The account you’re looking for doesn’t exist or may have been deleted.
        </p>
      </div>

      <Link
        href="/feed"
        className={cn(
          "rounded-xl p-5 py-2 border border-border bg-transparent hover:bg-foreground/5 transition-colors duration-300",
        )}
      >
        Back to Feed
      </Link>
    </div>
  );
}
