import { prisma } from "@/lib/db/prisma";
import PostCard from "./PostCard";
import { getSession } from "@/lib/auth/session";

const PostFeed = async () => {
  const session = await getSession();
  if (!session) return;
  const posts = await prisma.post.findMany({
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
    <div className="flex-1">
      {posts.length == 0 ? (
        <p className="flex justify-center items-center h-full text-neutral-400">
          No posts yet. Be the first!
        </p>
      ) : (
        posts?.map((post) => (
          <PostCard key={post.id} post={post} currentUser={session} />
        ))
      )}
    </div>
  );
};

export default PostFeed;
