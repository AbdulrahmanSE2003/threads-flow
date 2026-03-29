import { getSession } from "@/lib/auth/session";
import UserInfo from "./_components/UserInfo";

const ProfilePage = async () => {
  const currentUser = await getSession();
  if (!currentUser) return;
  return (
    <div className="min-h-[calc(100vh - 3rem)] bg-background text-foreground flex items-center justify-center">
      <UserInfo currentUser={currentUser} />
    </div>
  );
};

export default ProfilePage;
