import AddPost from "@/app/(main)/feed/_components/AddPost";
import Avatar from "@/app/_components/ui/Avatar";
import Image from "next/image";

import avatar from "@/public/avatar.png";
import UserName from "@/app/_components/ui/UserName";
import { UserWithCount } from "@/types/post";

const UserInfo = ({ currentUser }: { currentUser: UserWithCount }) => {
  const followerCounts = currentUser._count.followers || 0;

  return (
    <div className="mt-4 md:mt-12 bg-white dark:bg-main border border-border w-full md:w-2xl rounded-3xl flex flex-col gap-1 h-full p-5 relative">
      {/* Header Section: Name & Photo */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">
            {currentUser.displayName ?? ""}
          </h1>
          <div className="flex items-center gap-2">
            <UserName username={currentUser?.username ?? ""} />
          </div>
        </div>
        <Avatar
          avatarSrc={currentUser.avatarUrl}
          size={96}
          className="rounded-full object-cover"
        />
      </div>

      {/* Bio Section */}
      <div className="mt-1">
        <p className="text-[15px] leading-relaxed whitespace-pre-line text-zinc-800 dark:text-zinc-200">
          {currentUser.bio}
        </p>
      </div>

      {/* Followers Section (Threads Style) */}
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

      <button className="mt-4 w-full py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-xl font-semibold text-[15px] hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer">
        Edit profile
      </button>

      <AddPost
        username={currentUser?.username ?? ""}
        className={"border-none mt-2 px-0"}
      />
    </div>
  );
};

export default UserInfo;
