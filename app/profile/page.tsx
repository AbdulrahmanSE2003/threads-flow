import { getSession } from "@/lib/auth/session";
import UserInfo from "./_components/UserInfo";
import { prisma } from "@/lib/db/prisma";

const ProfilePage = async () => {
  const session = await getSession();
  if (!session) return;
  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    include: {
      _count: {
        select: { followers: true, posts: true },
      },
    },
  });

  if (!user) return;

  return (
    <div className="min-h-[calc(100vh - 3rem)] bg-background text-foreground flex items-center justify-center">
      <UserInfo currentUser={user} />
    </div>
  );
};

export default ProfilePage;
