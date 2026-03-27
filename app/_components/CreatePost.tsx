"use client";

import { Image } from "lucide-react";
import Avatar from "./ui/Avatar";
import { Textarea } from "./ui/Textarea";
import UserName from "./ui/UserName";

const CreatePost = () => {
  return (
    <div className={`flex w-full gap-2 justify-start items-start `}>
      <Avatar className={`self-start mt-2 `} />
      <div className={`flex flex-col items-start w-full gap-2`}>
        {/* username */}
        <UserName username="_abdulr_hman" />
        <Textarea
          className={`max-h-40 w-full overflow-y-auto  resize-none`}
          cols={6}
        />
        <button className={`cursor-pointer`}>
          <Image
            className={`stroke-border hover:stroke-zinc-600 transition-colors duration-300`}
          />
        </button>

        <button
          disabled
          className={`ml-auto border border-border cursor-pointer px-4 py-1.5 rounded-lg opacity-75 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300`}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
