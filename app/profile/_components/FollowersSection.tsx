import Image from "next/image";

import avatar from "@/public/avatar.png";

const FollowersSection = ({
  followerCounts,
  postsCount,
}: {
  followerCounts: number;
  postsCount: number;
}) => {
  return (
    <div className={`flex items-center justify-between`}>
      <div className="mt-2 flex items-center gap-3">
        {followerCounts > 3 && (
          <div className="flex items-center">
            <div className="relative w-5 h-5 rounded-full">
              <Image
                src={avatar}
                alt="follower"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-5 h-5 -ml-2.5 rounded-full z-1">
              <Image
                src={avatar}
                alt="follower"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-5 h-5 -ml-2.5 rounded-full z-2">
              <Image
                src={avatar}
                alt="follower"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <span className="text-[14px] text-zinc-500 hover:underline cursor-pointer">
          {followerCounts || 0} follower
        </span>
      </div>
      <span className="text-[14px] text-zinc-500">{postsCount} posts</span>
    </div>
  );
};

export default FollowersSection;
