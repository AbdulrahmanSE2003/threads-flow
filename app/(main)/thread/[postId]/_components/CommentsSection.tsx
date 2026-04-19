import { PostWithComments } from "@/types/post";
import { MessageCircle } from "lucide-react";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import { JWTPayload } from "@/lib/auth/jwt";
import { prisma } from "@/lib/db/prisma";

const CommentsSection = async ({
  post,
  session,
}: {
  post: PostWithComments;
  session: JWTPayload;
}) => {
  const avatar = await prisma.user.findUnique({
    where: {
      id: session.sub as string,
    },
    select: {
      avatarUrl: true,
    },
  });
  return (
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
          {post.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground mb-4">
          <MessageCircle size={28} strokeWidth={1.5} />
          <p className="text-sm">Be the first to reply</p>
        </div>
      )}

      {/* Comment Input */}
      <div className="py-3 mt-auto z-10 w-full px-1">
        <CommentInput
          currentUser={session}
          postAuthor={post.author.username}
          postId={post.id}
          avatarUrl={avatar?.avatarUrl ?? ""}
        />
      </div>
    </div>
  );
};

export default CommentsSection;
