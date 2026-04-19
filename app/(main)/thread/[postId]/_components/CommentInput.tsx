"use client";

import Avatar from "@/app/_components/ui/Avatar";
import { Textarea } from "@/app/_components/ui/Textarea";
import { JWTPayload } from "@/lib/auth/jwt";
import { useRef } from "react";

interface CommentInputProps {
  currentUser: JWTPayload;
  postAuthor: string;
}

const CommentInput = ({ currentUser, postAuthor }: CommentInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
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
      <div className="flex flex-col w-full flex-1 min-w-0 gap-1">
        <div className="text-sm font-semibold mb-0.5">
          {currentUser.username}
        </div>
        <Textarea
          ref={textareaRef}
          onInput={handleInput}
          placeholder={`Reply to ${postAuthor}...`}
          className="border-none shadow-none focus-visible:ring-0 p-3 py-2.5 text-[14.5px] bg-transparent resize-none min-h-[24px] placeholder:text-muted-foreground overflow-hidden"
          rows={1}
        />
        <div className="flex justify-end items-center mt-3">
          <button
            type="button"
            className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black font-semibold text-[13.5px] px-4 py-1.5 rounded-full cursor-pointer transition-all active:scale-95 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
