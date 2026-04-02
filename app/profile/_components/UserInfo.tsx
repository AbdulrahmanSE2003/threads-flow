import AddPost from "@/app/(main)/feed/_components/AddPost";

import { UserWithCount } from "@/types/post";
import { prisma } from "@/lib/db/prisma";
import { Suspense } from "react";
import PostSkeleton from "@/app/(main)/feed/_components/PostSkeleton";
import PostCard from "@/app/(main)/feed/_components/PostCard";
import UserHeader from "./UserHeader";
import FollowersSection from "./FollowersSection";
import { getSession } from "@/lib/auth/session";
import { JWTPayload } from "jose";

const UserInfo = async ({
  currentUser,
  isOwner,
}: {
  currentUser: UserWithCount;
  isOwner: boolean;
}) => {
  const followerCounts = currentUser._count.followers || 0;
  const postsCount = currentUser._count.posts || 0;

  const user = (await getSession()) as JWTPayload;

  const posts = await prisma.post.findMany({
    where: { authorId: currentUser.id },
    include: {
      author: {
        select: { username: true, displayName: true, avatarUrl: true },
      },
      likes: { select: { userId: true } },
      _count: { select: { likes: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className=" bg-white dark:bg-main border border-border w-full md:w-2xl rounded-3xl flex flex-col gap-1 h-full p-5 relative">
      {/* Header Section: Name & Photo */}
      <UserHeader currentUser={currentUser} />

      {/* Bio Section */}
      <div className="mt-1">
        <p className="text-[15px] leading-relaxed whitespace-pre-line text-zinc-800 dark:text-zinc-200">
          {currentUser.bio}
        </p>
      </div>

      {/* Followers Section (Threads Style) */}
      <FollowersSection
        followerCounts={followerCounts}
        postsCount={postsCount}
      />

      <div className={`flex flex-col gap-y-2 my-2`}>
        {!isOwner && (
          <button className="w-full py-1.5 bg-foreground text-background hover:bg-foreground/80 border border-border rounded-md font-semibold text-sm transition-all cursor-pointer duration-300">
            Follow
          </button>
        )}
        {isOwner && (
          <button className="w-full py-1.5 border border-border rounded-md font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer duration-300">
            Edit profile
          </button>
        )}
      </div>

      {isOwner && (
        <AddPost
          username={currentUser?.username ?? ""}
          className={"border-none mt-2 px-0"}
        />
      )}

      <Suspense
        fallback={
          <>
            <PostSkeleton />
          </>
        }
      >
        <hr />
        {posts.length > 0 &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user}
              className={`px-0`}
            />
          ))}
      </Suspense>
    </div>
  );
};

export default UserInfo;
