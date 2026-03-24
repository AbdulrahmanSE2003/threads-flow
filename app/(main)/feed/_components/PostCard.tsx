import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

import avatar from "@/public/avatar.png";
import post1 from "@/public/post-1.png";
import post2 from "@/public/post-2.png";
import post3 from "@/public/post-3.png";

interface PostCardProps {
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  timestamp: string;
}

const PostCard = ({ author, content, images, timestamp }: PostCardProps) => {
  return (
    <div className="w-full py-4 px-4 border-b">
      <div className="flex gap-3">
        {/* Left Side: Avatar & Line */}
        <div className="flex flex-col items-center">
          <div className="relative size-10 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <Image
              src={avatar}
              alt={author.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm hover:underline cursor-pointer">
                {author.username}
              </span>
              <span className="text-neutral-500 text-xs">{timestamp}</span>
            </div>
            <button className="text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 p-1 rounded-full transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Post Text */}
          <p className="text-[15px] leading-relaxed text-neutral-900 dark:text-neutral-100 whitespace-pre-wrap">
            {content}
          </p>

          {/* Images Grid/Carousel Preview */}
          {images && images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto hideScroll py-2 snap-x">
              {[post1, post2, post3].map((img, index) => (
                <div
                  key={index}
                  className="relative min-w-70 aspect-4/5 md:min-w-100 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 snap-center"
                >
                  <Image
                    src={img}
                    alt={`Post image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Interaction Buttons */}
          <div className="flex items-center gap-4 mt-2 text-neutral-900 dark:text-neutral-100 [&_button]:cursor-pointer">
            <button className="hover:scale-110 transition-transform">
              <Heart size={20} />
            </button>
            <button className="hover:scale-110 transition-transform">
              <MessageCircle size={20} />
            </button>
            <button className="hover:scale-110 transition-transform">
              <Repeat2 size={20} />
            </button>
            <button className="hover:scale-110 transition-transform">
              <Send size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="size-4 rounded-full border-2 border-white dark:border-black bg-neutral-300 dark:bg-neutral-700"
                />
              ))}
            </div>
            <span className="text-neutral-500 text-xs">
              12 replies · 45 likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
