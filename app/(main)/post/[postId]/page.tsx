import { getSession } from "@/lib/auth/session";

const PostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const postId = (await params).postId;
  const session = await getSession();

  if (!session) return null;

  console.log(postId);

  return <div>PostPage</div>;
};

export default PostPage;
