"use client";

import { cn } from "@/lib/utils";
import { useOptimistic, useTransition } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { handleLikeButton } from "@/actions/post.actions";
import Link from "next/link";

interface PostActionsProps {
  currentUserId: string | null;
  postId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
  commentCount: number;
}

const PostActions = ({
  initialLikeCount,
  initialIsLiked,
  currentUserId,
  postId,
  commentCount,
}: PostActionsProps) => {
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
      if (!currentUserId) return;
      setOptimistic(optimistic.isLiked ? "dislike" : "like");
      await handleLikeButton(currentUserId, postId);
    });
  };

  return (
    <div className="flex items-center gap-1 mt-2 text-background/70 [&_button]:cursor-pointer [&_button]:active:scale-95 [&_button]:duration-500 [&_a]:active:scale-90 [&_a]:duration-500">
      <button
        disabled={isPending}
        onClick={handleLike}
        className={cn(
          "flex justify-center items-center gap-1.5 text-foreground/70 hover:bg-zinc-200 dark:hover:bg-zinc-900/70 p-2 rounded-full transition-colors",
          optimistic.isLiked && "text-red-500/70 hover:text-red-500/90",
        )}
        aria-label="Like post"
      >
        <Heart
          size={20}
          className={`${optimistic.isLiked ? "fill-red-500" : ""}`}
        />
        <span className={`text-xs font-normal `}>{optimistic.count}</span>
      </button>

      <Link
        href={`/thread/${postId}`}
        className="flex justify-center items-center gap-1.5 text-foreground/70 hover:bg-zinc-200 dark:hover:bg-zinc-900/70 p-2 rounded-full transition-colors"
        aria-label="Comment on post"
      >
        <MessageCircle size={20} />
        <span className={`text-xs font-normal `}>{commentCount}</span>
      </Link>
    </div>
  );
};

export default PostActions;
