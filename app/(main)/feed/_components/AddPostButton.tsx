"use client";

import CreatePost from "@/app/_components/CreatePost";
import { Modal } from "@/app/_components/ui/Modal";
import { Plus } from "lucide-react";
import { useState } from "react";

const AddPostButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreatePost />
      </Modal>
      <button
        onClick={() => setIsModalOpen((prev) => !prev)}
        className={`fixed bottom-12 right-12 py-4 p-5 rounded-2xl bg-main border border-border cursor-pointer group scale-100 hover:scale-110 active:scale-90 duration-300 `}
      >
        <Plus className={`size-8 stroke-foreground`} />
      </button>
    </>
  );
};

export default AddPostButton;
