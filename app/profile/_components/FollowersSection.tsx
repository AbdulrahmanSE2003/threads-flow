import Image from "next/image";

import avatar from "@/public/avatar.png";
import { FollowerPreview } from "@/types/post";
import { cn } from "@/lib/utils";

const FollowersSection = ({
  followers,
  followerCounts,
  postsCount,
}: {
  followerCounts: number;
  postsCount: number;
  followers: FollowerPreview[];
}) => {
  return (
    <div className={`flex items-center justify-between`}>
      <div className="mt-2 flex items-center gap-3">
        {followerCounts > 3 && (
          <div className="flex items-center">
            {/* Container uses negative margin to pull children together */}
            <div className="flex -space-x-2">
              {followers.slice(0, 3).map((follower, i) => (
                <div
                  key={i}
                  className="relative size-[22px] rounded-full border-2 border-background bg-background"
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
            <span className="ml-2 text-sm font-light text-muted-foreground/75">
              {followerCounts} followers
            </span>
          </div>
        )}
      </div>
      <span className="text-[14px] text-zinc-500">{postsCount} posts</span>
    </div>
  );
};

export default FollowersSection;
