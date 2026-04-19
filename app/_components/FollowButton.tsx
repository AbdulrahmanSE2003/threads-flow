"use client";

import { toggleFollow } from "@/actions/follow.actions";
import { cn } from "@/lib/utils";
import { useOptimistic, useTransition } from "react";

type FollowButtonProps = {
  isFollowing: boolean;
  followingId: string;
  followingUserName: string;
  className?: string;
};

export const FollowButton = ({
  isFollowing,
  followingId,
  followingUserName,
  className,
}: FollowButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(
    { following: isFollowing },
    (current, action: "follow" | "unFollow") => ({
      following: action === "follow",
    }),
  );

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      setOptimistic(optimistic.following ? "unFollow" : "follow");
      await toggleFollow(followingId, followingUserName);
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleFollow}
      className={cn(
        "py-1.5 px-4 bg-foreground text-background hover:bg-foreground/80 border border-border rounded-lg font-semibold text-sm transition-all cursor-pointer duration-300 disabled:opacity-50",
        optimistic.following ? "bg-main text-foreground hover:bg-zinc-800/30" : "",
        className
      )}
    >
      {optimistic.following ? "Following" : "Follow"}
    </button>
  );
};
