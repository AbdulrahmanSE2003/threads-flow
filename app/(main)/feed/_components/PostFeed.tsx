import { prisma } from "@/lib/db/prisma";
import PostCard from "./PostCard";

const PostFeed = async () => {
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
        posts?.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostFeed;
