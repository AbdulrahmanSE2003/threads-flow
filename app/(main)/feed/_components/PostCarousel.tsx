"use client";

import { Modal } from "@/app/_components/ui/Modal";
import Image from "next/image";
import { useState } from "react";

const PostCarousel = ({ images }: { images: string[] }) => {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [imageToShow, setImageToShow] = useState("");

  const handleClick = (image: string) => {
    setImageToShow(image);
    setIsModalOpen(true);
  };
  return (
    <div className="relative w-full mt-3">
      <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 hideScroll">
        {images?.map((img, index) => (
          <div
            key={index}
            className="relative flex-none w-3/5 md:w-2/4 aspect-4/5 rounded-2xl overflow-hidden snap-start"
          >
            <Image
              onClick={() => handleClick(img)}
              src={img}
              alt={`Post image ${index + 1}`}
              fill
              className={"object-cover cursor-pointer"}
            />
          </div>
        ))}
      </div>

      {IsModalOpen && (
        <Modal
          show="image"
          isOpen={IsModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Image
            src={imageToShow}
            alt={`Post image ${imageToShow}`}
            fill
            className={"object-cover"}
          />
        </Modal>
      )}
    </div>
  );
};

export default PostCarousel;
