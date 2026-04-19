"use client";

import Avatar from "@/app/_components/ui/Avatar";
import { Textarea } from "@/app/_components/ui/Textarea";
import { JWTPayload } from "@/lib/auth/jwt";
import { useActionState, useRef, useState, useEffect } from "react";
import { createComment } from "@/actions/post.actions";
import { FormState } from "@/types/auth";

interface CommentInputProps {
  currentUser: JWTPayload;
  postAuthor: string;
  postId: string;
}

const CommentInput = ({
  currentUser,
  postAuthor,
  postId,
}: CommentInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");

  const handleSubmit = async (prevState: FormState, formData: FormData) => {
    const res = await createComment(prevState, formData);

    if (!res || !res.errors) {
      setContent("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
    return res;
  };
  const [state, formAction, isPending] = useActionState(handleSubmit, null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex gap-3 items-start w-full">
      <div className="flex flex-col items-center shrink-0">
        <Avatar size={36} />
      </div>
      <form
        action={formAction}
        className="flex flex-col w-full flex-1 min-w-0 gap-1"
      >
        <div className="text-sm font-semibold mb-0.5">
          {currentUser.username}
        </div>
        <input type="hidden" name="postId" value={postId} />
        <Textarea
          ref={textareaRef}
          name="content"
          value={content}
          onChange={handleInput}
          placeholder={`Reply to ${postAuthor}...`}
          className="border-none shadow-none focus-visible:ring-0 p-3 py-2.5 text-[14.5px] bg-transparent resize-none min-h-[24px] placeholder:text-muted-foreground overflow-hidden"
          rows={1}
        />
        {state?.errors?.general && (
          <p className="text-red-500 text-xs px-3">{state.errors.general}</p>
        )}
        <div className="flex justify-end items-center mt-3">
          <button
            type="submit"
            disabled={isPending || content.trim().length === 0}
            className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black font-semibold text-[13.5px] px-4 py-1.5 rounded-full cursor-pointer transition-all active:scale-95 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Replying..." : "Reply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
