import { Suspense } from "react";
import AddPost from "./_components/AddPost";
import PostFeed from "./_components/PostFeed";
import PostSkeleton from "./_components/PostSkeleton";
import AddPostButton from "./_components/AddPostButton";

export default async function FeedPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="mt-4 md:mt-12 bg-white dark:bg-main border border-border h-screen md:h-[calc(100vh-3rem)] w-full md:w-2xl rounded-t-3xl flex flex-col overflow-y-auto overflow-x-hidden hideScroll">
        {/* Add Post */}
        <AddPost />
        {/* Posts Feed */}
        <Suspense
          fallback={
            <div>
              <PostSkeleton />
              <PostSkeleton />
            </div>
          }
        >
          <PostFeed />
        </Suspense>
      </div>

      {/* Create post button */}
      <AddPostButton />
    </div>
  );
}
