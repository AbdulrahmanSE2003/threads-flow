"use client";

import { Image as LucideImage, Plus } from "lucide-react";
import Avatar from "./ui/Avatar";
import { Textarea } from "./ui/Textarea";
import UserName from "./ui/UserName";
import { useActionState, useState, useRef, useEffect } from "react";
import { postState, BasePostState } from "@/types/post";
import { postSchema } from "@/lib/validations/post.schema";
import { createPost } from "@/actions/post.actions";
import Image from "next/image";

type CreatePostProps = {
  username: string;
  onClose: () => void;
};

const CreatePost = ({ username, onClose }: CreatePostProps) => {
  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);

    URL.revokeObjectURL(previews[index]);
    setPreviews(previews.filter((_, i) => i !== index));

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleSubmit = async (prevState: postState, formData: FormData) => {
    const raw = {
      caption: formData.get("caption"),
      images: selectedFiles,
    };

    const result = postSchema.safeParse(raw);

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors as BasePostState["errors"],
      };
    }

    const res = await createPost(prevState, formData);
    if (!res || !res.errors) {
      onClose();
    }
    return res;
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
          ref={inputRef}
          name="caption"
          placeholder="What's new?"
          className="max-h-40 w-full overflow-y-auto resize-none bg-transparent outline-none text-[15px]"
          rows={3}
          maxLength={50}
          onChange={(e) => setCaption(e.target.value)}
        />

        {state?.errors?.caption && (
          <p className="text-red-500 dark:text-red-400 text-xs">
            {state?.errors?.caption?.[0]}
          </p>
        )}

        {previews.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-2">
            {previews.map((url, index) => (
              <div key={url} className="relative group w-20 h-20">
                <Image
                  src={url}
                  fill
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-1 -right-1 z-10 bg-zinc-900 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <Plus className="size-3 rotate-45 cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="images"
              multiple
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

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
              {state?.errors?.images?.[0]}
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
