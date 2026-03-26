import Image from "next/image";

import avatar from "@/public/avatar.png";

// TODO: Make src required
const Avatar = ({ avatarSrc }: { avatarSrc?: string | null }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative size-12 rounded-full overflow-hidden">
        <Image
          src={avatarSrc || avatar}
          alt={"adamJohn"}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Avatar;
