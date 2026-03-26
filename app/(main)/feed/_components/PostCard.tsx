import { MoreHorizontal } from "lucide-react";
import Avatar from "@/app/_components/Avatar";
import Image from "next/image";
import { formatTimestamp } from "@/lib/utils";
import { PostWithDetails } from "@/types/post";
import LikeButton from "./LikeButton";

interface PostCardProps {
  post: PostWithDetails;
  currentUserId: string | null;
}

const PostCard = ({ post, currentUserId }: PostCardProps) => {
  const { author, caption, images, createdAt, _count } = post;

  const isLiked = post.likes.some((like) => like.userId === currentUserId);

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
            <button className="text-neutral-500 hover:bg-zinc-200 dark:hover:bg-zinc-900/70 p-1 rounded-full transition-colors cursor-pointer active:scale-85 ">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Post Text */}
          <p className="text-[15px] leading-relaxed text-neutral-900 dark:text-neutral-100 whitespace-pre-wrap">
            {caption}
          </p>

          {/* Images Grid/Carousel Preview */}
          {images && images?.length > 0 && (
            <div className="relative w-full mt-3">
              <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 hideScroll">
                {images?.map((img, index) => (
                  <div
                    key={index}
                    className="relative flex-none w-3/5 md:w-2/4 aspect-4/5 rounded-2xl overflow-hidden snap-start"
                  >
                    <Image
                      src={img}
                      alt={`Post image ${index + 1}`}
                      fill
                      className={"object-cover"}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Like Button */}
          <LikeButton
            initialLikeCount={_count.likes}
            initialIsLiked={isLiked}
            currentUserId={currentUserId}
            postId={post.id}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
