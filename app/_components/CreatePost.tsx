"use client";

import { Image as LucideImage } from "lucide-react";
import Avatar from "./ui/Avatar";
import { Textarea } from "./ui/Textarea";
import UserName from "./ui/UserName";
import { useActionState, useState, useRef } from "react";
import { postState } from "@/types/post";
import { postSchema } from "@/lib/validations/post.schema";
import { createPost } from "@/actions/post.actions";

type CreatePostProps = {
  username: string;
};

const CreatePost = ({ username }: CreatePostProps) => {
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (prevState: postState, formData: FormData) => {
    const imageFiles = formData.getAll("images") as File[];

    const validFiles = imageFiles.filter((file) => file.size > 0);

    const raw = {
      caption: formData.get("caption"),
      images: validFiles,
    };

    const result = postSchema.safeParse(raw);

    if (!result.success) {
      setCaption("");
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    console.log("Valid Data:", result.data);
    await createPost(prevState, formData);
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex w-full gap-3 justify-start items-start">
      <Avatar className="self-start mt-1" />
      <form
        action={formAction}
        className="flex flex-col items-start w-full gap-2"
      >
        <UserName username={username} />

        <Textarea
          name="caption"
          placeholder="What's new?"
          className="max-h-40 w-full overflow-y-auto resize-none bg-transparent outline-none text-[15px]"
          rows={3}
          maxLength={50}
          onChange={(e) => setCaption(e.target.value)}
        />

        {state?.errors?.caption && (
          <p className="text-red-500 dark:text-red-400 text-xs">
            {state.errors.caption[0]}
          </p>
        )}

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            {/* Hidden Input - Accepts images only */}
            <input
              type="file"
              name="images"
              multiple
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
            />

            {/* Visual Trigger */}
            <button
              type="button"
              onClick={handleIconClick}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-all cursor-pointer group"
            >
              <LucideImage className="size-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
            </button>
          </div>

          {state?.errors?.images && (
            <p className="text-red-500 dark:text-red-400 text-xs">
              {state.errors.images[0]}
            </p>
          )}

          <p
            className={`text-[10px] font-medium transition-colors ${
              caption.length >= 40 ? "text-red-500" : "text-zinc-500"
            }`}
          >
            {caption.length}/50
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending || caption.length === 0}
          className="ml-auto px-5 py-1.5 rounded-md opacity-75 hover:opacity-100 cursor-pointer border border-border font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
