import Image from "next/image";

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
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative size-12 rounded-full overflow-hidden",
          `size-${size / 4}`,
          className,
        )}
      >
        <Image
          src={avatarSrc || avatar}
          alt={"adamJohn"}
          width={size}
          height={size}
          style={{ height: `${size}px` }} // Overrides height: auto
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Avatar;
