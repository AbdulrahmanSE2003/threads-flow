import Avatar from "@/app/_components/ui/Avatar";
import UserName from "@/app/_components/ui/UserName";
import { UserWithCount } from "@/types/post";
import { Camera } from "lucide-react";
import UserProfileAvatar from "./UserProfileAvatar";

const UserHeader = ({ currentUser }: { currentUser: UserWithCount }) => {
  return (
    <div className="flex justify-between items-center w-full ">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{currentUser.displayName ?? ""}</h1>
        <div className="flex items-center gap-2">
          <UserName username={currentUser?.username ?? ""} />
        </div>
      </div>
      <UserProfileAvatar src={currentUser.avatarUrl ?? ""} />
    </div>
  );
};

export default UserHeader;
