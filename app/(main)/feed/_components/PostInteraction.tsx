import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";

const PostInteraction = () => {
  return (
    <div className="flex items-center gap-4 mt-2 text-background/70 [&_button]:cursor-pointer [&_button]:active:scale-75 [&_button]:duration-500">
      <button className=" flex justify-center items-center gap-1 text-foreground/70 hover:bg-zinc-900/70 p-2 rounded-full">
        <Heart size={20} />
        <span className={`text-xs font-normal `}>127</span>
      </button>
      <button className=" flex justify-center items-center gap-1 text-foreground/70 hover:bg-zinc-900/70 p-2 rounded-full">
        <MessageCircle size={20} />
        <span className={`text-xs font-normal `}>127</span>
      </button>
      <button className=" flex justify-center items-center gap-1 text-foreground/70 hover:bg-zinc-900/70 p-2 rounded-full">
        <Repeat2 size={20} />
        <span className={`text-xs font-normal `}>127</span>
      </button>
      <button className=" flex justify-center items-center gap-1 text-foreground/70 hover:bg-zinc-900/70 p-2 rounded-full">
        <Send size={20} />
        <span className={`text-xs font-normal `}>127</span>
      </button>
    </div>
  );
};

export default PostInteraction;
