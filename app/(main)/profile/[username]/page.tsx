import PageHeader from "@/app/_components/PageHeader";
import UserInfo from "@/app/profile/_components/UserInfo";
import { getSession } from "@/lib/auth/session";
import { headers } from "next/headers";
import ProfileNotFound from "./not-found";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const session = await getSession();
  if (!session) return null;

  const headerList = await headers();
  const pathname = headerList.get("x-pathname");
  const userNameFromParams = (await params).username;

  const user = await getCachedUser(userNameFromParams);

  if (!user) return <ProfileNotFound />;

  const isOwner = session.username === user.username;

  return (
    <div className="min-h-[calc(100vh - 3rem)] bg-background text-foreground flex flex-col items-center justify-center">
      <PageHeader page={pathname} />
      <UserInfo currentUser={user} isOwner={isOwner} />
    </div>
  );
};

export default UserPage;
