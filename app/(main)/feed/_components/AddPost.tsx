"use client";

import CreatePost from "@/app/_components/CreatePost";
import Avatar from "@/app/_components/ui/Avatar";
import { Modal } from "@/app/_components/ui/Modal";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AddPost = ({
  className = "",
  username,
}: {
  className?: string;
  username: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={cn(
        `flex justify-start items-center gap-4 border-b border-border p-4`,
        className,
      )}
    >
      {}
      <Avatar />
      <input
        onClick={() => setIsModalOpen((prev) => !prev)}
        className={`grow focus:outline-none text-sm`}
        type="text"
        placeholder="What's New!"
      />
      <button
        onClick={() => setIsModalOpen((prev) => !prev)}
        className={`border text-sm text-foreground/90 hover:text-foreground cursor-pointer p-3.5 py-1.5 border-border rounded-lg active:scale-85 duration-500 tracking-wide font-semibold`}
      >
        Post
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreatePost username={username} />
        </Modal>
      )}
    </div>
  );
};

export default AddPost;
