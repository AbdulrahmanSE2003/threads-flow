import { getSession } from "@/lib/auth/session";
import { Suspense } from "react";
import PostSkeleton from "../../feed/_components/PostSkeleton";
import PostCard from "../../feed/_components/PostCard";
import CommentInput from "./_components/CommentInput";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import PageHeader from "@/app/_components/PageHeader";
import { headers } from "next/headers";
import CommentCard from "./_components/CommentCard";
import Link from "next/link";
import CommentsSection from "./_components/CommentsSection";

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
      {/* Page Header & Back Arrow  */}
      <div className="grid grid-cols-3 items-center w-full px-4">
        <div className="flex justify-start">
          <Link
            href="/feed"
            className="border border-border bg-muted/75 hover:scale-105 active:scale-95 cursor-pointer transition-transform duration-100 rounded-full p-1"
          >
            <ArrowLeft className="stroke-foreground size-4" />
          </Link>
        </div>

        <div className="flex justify-center">
          <PageHeader
            page={pathname}
            className="text-center whitespace-nowrap"
          />
        </div>

        {/* Right: Empty spacer to balance the grid */}
        <div className="w-6" />
      </div>

      {/* Post Structure */}
      <div className="bg-white dark:bg-main border border-border h-screen md:h-[calc(100vh-3rem)] w-full md:w-2xl rounded-3xl flex flex-col overflow-y-auto overflow-x-hidden hideScroll p-2 ">
        <Suspense fallback={<PostSkeleton />}>
          <PostCard post={post} currentUser={session} />
        </Suspense>

        {/* Comments Section */}
        <CommentsSection post={post} session={session} />
      </div>
    </div>
  );
};

export default PostPage;
