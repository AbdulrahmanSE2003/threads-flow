import Avatar from "@/app/_components/Avatar";
import { cn } from "@/lib/utils";

const AddPost = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={cn(
        `flex justify-start items-center gap-4 border-b border-border p-4`,
        className,
      )}
    >
      {/* NOTE: Image goes here */}
      <Avatar />
      <input
        className={`grow bg-amber-400 focus:outline-none text-sm`}
        type="text"
        placeholder="What's New!"
      />
      <button
        className={`border bg-amber-400 text-sm text-foreground/90 hover:text-foreground cursor-pointer p-3.5 py-1.5 border-border rounded-lg active:scale-75 duration-500 tracking-wide font-semibold`}
      >
        Post
      </button>
    </div>
  );
};

export default AddPost;
