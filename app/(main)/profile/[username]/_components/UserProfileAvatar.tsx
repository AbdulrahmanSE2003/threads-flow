"use client";

import {
  changeProfilePhoto,
  removeProfilePhoto,
} from "@/actions/profile.actions";
import Avatar from "@/app/_components/ui/Avatar";
import { Modal } from "@/app/_components/ui/Modal";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

const UserProfileAvatar = ({
  src,
  isOwner = false,
}: {
  src: string;
  isOwner?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      await changeProfilePhoto(file);
    }

    setIsModalOpen(false);
  };

  const removePhoto = async () => {
    await removeProfilePhoto();
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="relative w-fit rounded-full overflow-hidden shadow-sm"
        onClick={() => isOwner && setIsModalOpen(true)}
      >
        <Avatar
          avatarSrc={src}
          size={84}
          className="rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {isOwner && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-full">
            <Camera className="size-6 text-white" />
          </div>
        )}
      </div>

      {isOwner && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Profile Photo"
          show="edit"
        >
          <div className="flex flex-col w-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              onClick={handleUploadClick}
              className="w-full py-3 font-bold text-blue-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors cursor-pointer text-[15px]"
            >
              Upload New Photo
            </button>
            {src && src.length > 0 && (
              <>
                <hr className="my-2" />
                <button
                  onClick={removePhoto}
                  className="w-full py-3 font-bold text-red-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors cursor-pointer text-[15px]"
                >
                  Remove Current Photo
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserProfileAvatar;
