import Avatar from "@/app/_components/ui/Avatar";
import { cn, formatTimestamp } from "@/lib/utils";
import { CommentWithAuthor } from "@/types/post";
import Link from "next/link";

interface CommentCardProps {
  comment: CommentWithAuthor;
  className?: string;
}

const CommentCard = ({ comment, className }: CommentCardProps) => {
  const { user, content, createdAt } = comment;

  return (
    <div
      className={cn(
        "flex gap-3 py-3 px-4 group border-b border-border",
        className,
      )}
    >
      {/* Left: Avatar + thread line */}
      <div className="flex flex-col items-center">
        <Link
          href={`/profile/${user.username}`}
          className="shrink-0 pointer-events-auto"
        >
          <Avatar avatarSrc={user.avatarUrl} size={40} />
        </Link>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col gap-0.5 pb-1 min-w-0 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-sm">
            <Link
              href={`/profile/${user.username}`}
              className="font-semibold text-foreground hover:underline underline-offset-2 truncate"
            >
              {user.username}
            </Link>
            <span className="text-muted-foreground text-xs font-light shrink-0">
              {formatTimestamp(createdAt)}
            </span>
          </div>
        </div>

        {/* Comment body */}
        <p className="text-[14.5px] leading-relaxed text-neutral-900 dark:text-neutral-100 whitespace-pre-wrap mt-0.5 wrap-break-words">
          {content}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
