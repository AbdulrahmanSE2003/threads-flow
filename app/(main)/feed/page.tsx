import { Plus } from "lucide-react";
import AddPost from "./_components/AddPost";

export default async function FeedPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div
        className={`mt-12 bg-main border border-zinc-600/50 min-h-screen w-2xl rounded-3xl flex flex-col`}
      >
        {/* Add Post */}
        <AddPost />
      </div>

      {/* Create post button */}
      <button
        className={`fixed bottom-12 right-12 p-4  rounded-xl bg-zinc-800 hover:bg-zinc-900 cursor-pointer group scale-100 active:scale-75 duration-500 `}
      >
        <Plus className={`size-8 `} />
      </button>
    </div>
  );
}
