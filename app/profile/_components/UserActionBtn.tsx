"use client";

import { toggleFollow } from "@/actions/follow.actions";
import { cn } from "@/lib/utils";
import { useOptimistic, useTransition } from "react";

type UserActionBtnProps = {
  isOwner: boolean;
  isFollowing: boolean;
  followingId: string;
  followingUserName: string;
};

const UserActionBtn = ({
  isOwner,
  isFollowing,
  followingId,
  followingUserName,
}: UserActionBtnProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(
    { following: isFollowing },
    (current, action: "follow" | "unFollow") => ({
      following: action === "follow",
    }),
  );

  const handleFollow = () => {
    startTransition(async () => {
      setOptimistic(optimistic.following ? "unFollow" : "follow");
      await toggleFollow(followingId, followingUserName);
    });
  };

  return (
    <div className={`flex flex-col gap-y-2 my-2`}>
      {!isOwner && (
        <button
          disabled={isPending}
          onClick={handleFollow}
          className={cn(
            "w-full py-1.5 bg-foreground text-background hover:bg-foreground/80 border border-border rounded-md font-semibold text-sm transition-all cursor-pointer duration-300",
            optimistic.following
              ? "bg-main text-foreground hover:bg-zinc-800/30"
              : "",
          )}
        >
          {optimistic.following ? "Following" : "Follow"}
        </button>
      )}
      {isOwner && (
        <button className="w-full py-1.5 border border-border rounded-md font-semibold text-sm bg-amber-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer duration-300">
          Edit profile
        </button>
      )}
    </div>
  );
};

export default UserActionBtn;
