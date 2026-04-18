import { MoreHorizontal } from "lucide-react";
import Avatar from "@/app/_components/ui/Avatar";
import { cn, formatTimestamp } from "@/lib/utils";
import { PostWithDetails } from "@/types/post";
import LikeButton from "./LikeButton";
import { JWTPayload } from "@/lib/auth/jwt";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import PostMenu from "./PostMenu";
import PostCarousel from "./PostCarousel";
import Link from "next/link";

interface PostCardProps {
  post: PostWithDetails;
  currentUser: JWTPayload;
  className?: string;
}

const PostCard = ({ post, currentUser, className }: PostCardProps) => {
  const { author, caption, images, createdAt, _count } = post;

  const isLiked = post.likes.some((like) => like.userId === currentUser?.sub);
  const isOwner = author.username === currentUser.username;

  return (
    <div className={cn("w-full py-4 px-4 border-b border-border", className)}>
      <div className="flex gap-3">
        {/* Left Side: Avatar */}
        <Link href={`/profile/${author.username}`} className={`h-fit`}>
          <Avatar avatarSrc={author.avatarUrl} />
        </Link>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-1 text-foreground/70 w-full">
          {/* Username & date */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-foreground text-sm tracking-tighter">
              <Link
                href={`/profile/${author.username}`}
                className="font-bold text-sm hover:underline cursor-pointer"
              >
                {author.username}
              </Link>
              <span className="text-muted-foreground text-xs font-light mt-0.5">
                {formatTimestamp(createdAt)}
              </span>
            </div>

            {/* Post Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-neutral-500 hover:bg-zinc-200 dark:hover:bg-zinc-900/70 p-1 rounded-full transition-colors cursor-pointer active:scale-85 ">
                  <MoreHorizontal size={18} />
                </button>
              </DropdownMenuTrigger>
              <PostMenu
                postId={post?.id ?? ""}
                isOwner={isOwner}
                author={author.username}
              />
            </DropdownMenu>
          </div>

          {/* Post Text */}
          <p className="text-[15px] leading-relaxed text-neutral-900 dark:text-neutral-100 whitespace-pre-wrap">
            {caption}
          </p>

          {/* Images Grid/Carousel Preview */}
          {images && images?.length > 0 && <PostCarousel images={images} />}

          {/* Like Button */}
          <LikeButton
            initialLikeCount={_count.likes}
            initialIsLiked={isLiked}
            currentUserId={currentUser?.sub}
            postId={post.id}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
