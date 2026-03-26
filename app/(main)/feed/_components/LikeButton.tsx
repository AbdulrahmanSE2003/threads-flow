"use client";

import { cn } from "@/lib/utils";
import { useOptimistic, useTransition } from "react";
import { Heart } from "lucide-react";
import { handleLikeButton } from "@/actions/post.actions";

interface LikeButtonProps {
  currentUserId: string | null;
  postId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
}

const LikeButton = ({
  initialLikeCount,
  initialIsLiked,
  currentUserId,
  postId,
}: LikeButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(
    { count: initialLikeCount, isLiked: initialIsLiked },
    (current, action: "like" | "dislike") => ({
      count: action === "like" ? current.count + 1 : current.count - 1,
      isLiked: action === "like",
    }),
  );

  const handleLike = () => {
    startTransition(async () => {
      setOptimistic(optimistic.isLiked ? "dislike" : "like");

      // TODO Server action
      if (!currentUserId) return;
      await handleLikeButton(currentUserId, postId);
    });
  };

  return (
    <div className="flex items-center gap-4 mt-2 text-background/70 [&_button]:cursor-pointer [&_button]:active:scale-75 [&_button]:duration-500">
      <button
        disabled={isPending}
        onClick={handleLike}
        className={cn(
          "flex justify-center items-center gap-1 text-foreground/70 hover:bg-zinc-200 dark:hover:bg-zinc-900/70 p-2 rounded-full",
          optimistic.isLiked && "text-red-500/70",
        )}
      >
        <Heart
          size={20}
          className={`${optimistic.isLiked ? "fill-red-500" : ""}`}
        />
        <span className={`text-xs font-normal `}>{optimistic.count}</span>
      </button>
    </div>
  );
};

export default LikeButton;
