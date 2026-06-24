import UserName from "@/app/_components/ui/UserName";
import { UserWithCount } from "@/types/post";
import UserProfileAvatar from "./UserProfileAvatar";

const UserHeader = ({
  currentUser,
  isOwner = false,
}: {
  currentUser: UserWithCount;
  isOwner?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{currentUser.displayName ?? ""}</h1>
        <div className="flex items-center gap-2">
          <UserName username={currentUser?.username ?? ""} />
        </div>
      </div>
      <UserProfileAvatar src={currentUser.avatarUrl ?? ""} isOwner={isOwner} />
    </div>
  );
};

export default UserHeader;
