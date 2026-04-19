"use client";

import avatar from "@/public/avatar.png";
import Image from "next/image";
import { FollowerPreview } from "@/types/post";
import { useState } from "react";
import { Modal } from "@/app/_components/ui/Modal";
import Link from "next/link";
import { FollowButton } from "@/app/_components/FollowButton";

const FollowersSection = ({
  followers,
  followerCounts,
  postsCount,
  currentUserId,
}: {
  followerCounts: number;
  postsCount: number;
  followers: FollowerPreview[];
  currentUserId: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`flex items-center justify-between`}>
      <div className="mt-2 flex items-center gap-3">
        {followerCounts > 0 && (
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            {/* Container uses negative margin to pull children together */}
            <div className="flex -space-x-2">
              {followers.slice(0, 3).map((follower, i) => (
                <div
                  key={i}
                  className="relative size-[22px] rounded-full border-2 border-main bg-main"
                  style={{ zIndex: i }} // Higher index for earlier items to stack on top
                >
                  <Image
                    src={follower.follower.avatarUrl || avatar}
                    alt="follower avatar"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Text offset to provide breathing room from the stack */}
            <span className="ml-2 text-sm font-light text-muted-foreground/75 group-hover:underline">
              {followerCounts} followers
            </span>
          </div>
        )}
      </div>
      <span className="text-[14px] text-zinc-500">{postsCount} posts</span>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Followers"
        show="edit"
      >
        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {followers.map((f) => (
            <div
              key={f.follower.id}
              className="flex items-center justify-between"
            >
              <Link
                href={`/profile/${f.follower.username}`}
                className="flex items-center gap-3 group"
                onClick={() => setIsModalOpen(false)}
              >
                <div className="relative size-10 rounded-full overflow-hidden">
                  <Image
                    src={f.follower.avatarUrl || avatar}
                    alt={f.follower.username}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm group-hover:underline">
                    {f.follower.username}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {f.follower.displayName}
                  </span>
                </div>
              </Link>

              {f.follower.id !== currentUserId && (
                <FollowButton
                  isFollowing={f.isFollowing}
                  followingId={f.follower.id}
                  followingUserName={f.follower.username}
                  className="py-1 px-3 text-xs"
                />
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default FollowersSection;
