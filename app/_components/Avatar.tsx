import Image from "next/image";

import avatar from "@/public/avatar.png";

// TODO: Make src required
const Avatar = ({ avatarSrc }: { avatarSrc?: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative size-10 rounded-full overflow-hidden">
        <Image
          src={avatarSrc || avatar}
          alt={"adamJohn"}
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Avatar;
