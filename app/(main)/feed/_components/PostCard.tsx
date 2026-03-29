import { MoreHorizontal } from "lucide-react";
import Avatar from "@/app/_components/ui/Avatar";
import Image from "next/image";
import { formatTimestamp } from "@/lib/utils";
import { PostWithDetails } from "@/types/post";
import LikeButton from "./LikeButton";
import { JWTPayload } from "@/lib/auth/jwt";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import PostMenu from "./PostMenu";
import PostCarousel from "./PostCarousel";

interface PostCardProps {
  post: PostWithDetails;
  currentUser: JWTPayload;
}

const PostCard = ({ post, currentUser }: PostCardProps) => {
  const { author, caption, images, createdAt, _count } = post;

  const isLiked = post.likes.some((like) => like.userId === currentUser?.sub);
  const isOwner = author.username === currentUser.username;

  return (
    <div className="w-full py-4 px-4 border-b border-border">
      <div className="flex gap-3">
        {/* Left Side: Avatar */}
        <Avatar avatarSrc={author.avatarUrl} />

        {/* Right Side: Content */}
        <div className="flex flex-col gap-1 text-foreground/70 w-full">
          {/* Username & date */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-foreground text-sm tracking-tighter">
              <span className="font-bold text-sm hover:underline cursor-pointer">
                {author.displayName}
              </span>
              <span className="text-neutral-500 text-sm font-extralight ">
                {formatTimestamp(createdAt)}
              </span>
            </div>
            {/* TODO: post menu */}
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-neutral-500 bg-amber-500 hover:bg-zinc-200 dark:hover:bg-zinc-900/70 p-1 rounded-full transition-colors cursor-pointer active:scale-85 ">
                    <MoreHorizontal size={18} />
                  </button>
                </DropdownMenuTrigger>
                <PostMenu postId={post?.id ?? ""} />
              </DropdownMenu>
            )}
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
