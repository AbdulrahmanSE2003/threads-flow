import { getSession } from "@/lib/auth/session";
import { Suspense } from "react";
import PostSkeleton from "../../feed/_components/PostSkeleton";
import PostCard from "../../feed/_components/PostCard";
import CommentInput from "./_components/CommentInput";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowLeftCircle, MessageCircle } from "lucide-react";
import PageHeader from "@/app/_components/PageHeader";
import { headers } from "next/headers";
import CommentCard from "./_components/CommentCard";
import Link from "next/link";

const PostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const postId = (await params).postId;
  const session = await getSession();

  if (!session) return null;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: { username: true, displayName: true, avatarUrl: true },
      },
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: { likes: true, comments: true },
      },
      comments: {
        include: {
          user: {
            select: { username: true, displayName: true, avatarUrl: true },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!post) notFound();

  const headerList = await headers();
  const pathname = headerList.get("x-pathname");

  return (
    <div className={`flex items-center flex-col`}>
      <div className={`flex items-center justify-start w-full gap-x-5 px-4`}>
        <Link
          href={"/feed"}
          className={`border border-border bg-muted/75 hover:scale-105 active:scale-95 cursor-pointer transition-transform duration-100 rounded-full p-1`}
        >
          <ArrowLeft className={`stroke-foreground  size-4 `} size={24} />
        </Link>
        <PageHeader page={pathname} className={`grow`} />
      </div>
      <div className="bg-white dark:bg-main border border-border h-screen md:h-[calc(100vh-3rem)] w-full md:w-2xl rounded-3xl flex flex-col overflow-y-auto overflow-x-hidden hideScroll p-2 ">
        <Suspense fallback={<PostSkeleton />}>
          <PostCard post={post} currentUser={session} />
        </Suspense>

        {/* Comments Section */}
        <div className="mt-2 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-2">
            <MessageCircle size={15} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              {post._count.comments === 0
                ? "No replies"
                : `${post._count.comments} ${post._count.comments === 1 ? "reply" : "replies"}`}
            </span>
          </div>

          {/* Comment list */}
          {post.comments.length > 0 ? (
            <div className="mb-4">
              {post.comments.map((comment, i) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  isLast={i === post.comments.length - 1}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground mb-4">
              <MessageCircle size={28} strokeWidth={1.5} />
              <p className="text-sm">Be the first to reply</p>
            </div>
          )}

          {/* Comment Input */}
          <div className="pt-3 pb-6 mt-auto border-t border-border z-10 w-full px-1">
            <CommentInput
              currentUser={session}
              postAuthor={post.author.username}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
