import { Plus } from "lucide-react";
import { Suspense } from "react";
import AddPost from "./_components/AddPost";
import PostFeed from "./_components/PostFeed";
import PostSkeleton from "./_components/PostSkeleton";

export default async function FeedPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="mt-4 md:mt-12 bg-main border border-border h-screen md:h-[calc(100vh-3rem)] w-full md:w-2xl rounded-t-3xl flex flex-col overflow-y-auto overflow-x-hidden hideScroll">
        {/* Add Post */}
        <AddPost />
        {/* Posts Feed - Scrollable area */}
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
      <button
        className={`fixed bottom-12 right-12 py-4 p-5 rounded-2xl bg-zinc-900 border border-border cursor-pointer group scale-100 active:scale-75 duration-500 `}
      >
        <Plus className={`size-8 `} />
      </button>
    </div>
  );
}
