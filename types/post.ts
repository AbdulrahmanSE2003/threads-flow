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

export type UserWithCount = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: { followers: true; posts: true };
    };
  };
}>;

export type postState = {
  errors?: {
    caption?: string[];
    images?: string[];
    general?: string[];
  };
} | null | void;
