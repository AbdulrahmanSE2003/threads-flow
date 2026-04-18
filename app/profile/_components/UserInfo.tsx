import AddPost from "@/app/(main)/feed/_components/AddPost";

import { UserWithCount } from "@/types/post";
import { prisma } from "@/lib/db/prisma";
import { Suspense } from "react";
import PostSkeleton from "@/app/(main)/feed/_components/PostSkeleton";
import PostCard from "@/app/(main)/feed/_components/PostCard";
import UserHeader from "./UserHeader";
import FollowersSection from "./FollowersSection";
import { getSession } from "@/lib/auth/session";
import UserActionBtn from "./UserActionBtn";
import { CustomJWTPayload } from "@/lib/auth/jwt";

const UserInfo = async ({
  currentUser,
  isOwner,
}: {
  currentUser: UserWithCount;
  isOwner: boolean;
}) => {
  const followerCounts = currentUser._count.followers;
  const postsCount = currentUser._count.posts;

  const user = (await getSession()) as CustomJWTPayload;

  // Fetching Posts for user's profile
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

  const threeFollswers = await prisma.follow.findMany({
    where:{
      followingId:currentUser.id
    },
    include: {
    follower: {
      select: { avatarUrl: true, username: true }
    }
  },
  take: 3
  })

  const isFollowing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: user?.sub as string,
        followingId: currentUser.id,
      },
    },
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
      followers ={threeFollswers}
        followerCounts={followerCounts}
        postsCount={postsCount}
      />

      <UserActionBtn
        isFollowing={!!isFollowing}
        isOwner={isOwner}
        followingId={currentUser.id}
        followingUserName={currentUser.username}
      />

      {isOwner && (
        <AddPost
          imageSrc={currentUser.avatarUrl ?? ""}
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
        {posts.length > 0 &&
          posts.map((post) => (
            <div
              key={post.id}
            >
              <hr />
              <PostCard
                post={post}
                currentUser={user}
                className={`px-0`}
              />
            </div>
          ))}
      </Suspense>
    </div>
  );
};

export default UserInfo;
