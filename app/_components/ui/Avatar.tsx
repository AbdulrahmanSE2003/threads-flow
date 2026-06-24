"use client";

import Image from "next/image";
import { useState } from "react";

import avatar from "@/public/avatar.png";
import { cn } from "@/lib/utils";

const Avatar = ({
  avatarSrc,
  size = 40,
  className = "",
}: {
  avatarSrc?: string | null;
  size?: number;
  className?: string;
}) => {
  const [imgError, setImgError] = useState(false);

  const src = imgError || !avatarSrc ? avatar : avatarSrc;

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative rounded-full overflow-hidden",
          className,
        )}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image
          src={src}
          alt={"Threads user"}
          width={size}
          height={size}
          className="object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    </div>
  );
};

export default Avatar;
