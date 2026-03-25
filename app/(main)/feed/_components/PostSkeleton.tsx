import { Skeleton } from "@/app/_components/ui/Skeleton";

const PostSkeleton = () => {
  return (
    <div className="w-full p-4 border-b border-border">
      <div className="flex gap-3 w-[98%]">
        {/* Left Side: Avatar */}
        <Skeleton className="h-10 w-10 rounded-full" />

        {/* Right Side: Content */}
        <div className="flex flex-col gap-1 text-foreground/70 w-full">
          {/* Username & date */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-foreground/70">
              <Skeleton className={`w-24 h-3`} />
              <Skeleton className={`w-6 h-3`} />
            </div>
            <Skeleton className={`w-6 h-3`} />
          </div>
          {/* Post Text */}
          <div className={`my-2 space-y-2`}>
            <Skeleton className={`h-3 w-full`} />
            <Skeleton className={`h-3 w-4/5`} />
          </div>
          {/* Images Grid/Carousel Preview */}
          <div className={`flex gap-0.5 overflow-hidden pb-2 hideScroll my-2`}>
            <Skeleton className="h-80 w-88 rounded-2xl" />
            <Skeleton className="h-80 w-80 rounded-2xl left-3 relative" />
          </div>

          {/* Interaction Buttons */}
          {/* Footer Icons */}
          <div className="flex gap-4">
            <Skeleton className="h-6 w-10 rounded-full" />
            <Skeleton className="h-6 w-10 rounded-full" />
            <Skeleton className="h-6 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
