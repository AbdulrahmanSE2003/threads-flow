import { Prisma } from "@prisma/client";

export type PostWithDetails = Prisma.PostGetPayload<{
  include: {
    author: {
      select: { username: true; displayName: true; avatarUrl: true };
    };
    likes: { select: { userId: true } };
    _count: { select: { likes: true } };
  };
}>;
