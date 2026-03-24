import { Plus } from "lucide-react";
import AddPost from "./_components/AddPost";
import PostCard from "./_components/PostCard";

export default async function FeedPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="mt-12 bg-main border border-border h-[calc(100vh-3rem)] w-2xl rounded-t-3xl flex flex-col overflow-y-auto overflow-x-hidden snap-y">
        {/* Add Post */}
        <AddPost />
        {/* Posts Feed - Scrollable area */}
        <div className="flex-1  ">
          {[1, 2, 3, 4, 5].map((i) => (
            <PostCard
              key={i}
              author={{
                name: "Abdulrahman Saad",
                username: "abdo7.dev",
                avatar: "/avatar.png",
              }}
              content="بهاي الثريد رح احكيلكم قصتي مع نظام غير طريقة تفكيري تجاه اي backend system... البرمجة هندسة بتمنع الكارثة قبل ما تصير. 🛠️✨"
              images={["/post-1.png", "/post-2.png", "/post-3.png"]}
              timestamp="1h"
            />
          ))}
        </div>
      </div>

      {/* Posts Feed */}

      {/* Create post button */}
      <button
        className={`fixed bottom-12 right-12 p-4  rounded-xl bg-zinc-800 hover:bg-zinc-900 cursor-pointer group scale-100 active:scale-75 duration-500 `}
      >
        <Plus className={`size-8 `} />
      </button>
    </div>
  );
}
