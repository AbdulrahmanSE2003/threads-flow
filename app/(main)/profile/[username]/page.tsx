import UserInfo from "@/app/profile/_components/UserInfo";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const session = await getSession();
  if (!session) return;
  const userNameFromParams = (await params).username;

  const user = await prisma.user.findUnique({
    where: { username: userNameFromParams },
    include: {
      _count: {
        select: { followers: true, posts: true },
      },
    },
  });

  if (!user) return;

  const isOwner = session.username === user.username;
  console.log(isOwner);

  return (
    <div className="min-h-[calc(100vh - 3rem)] bg-background text-foreground flex items-center justify-center">
      <UserInfo currentUser={user} isOwner={isOwner} />
    </div>
  );
};

export default UserPage;
