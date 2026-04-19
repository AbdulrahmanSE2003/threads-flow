import { Prisma } from "@prisma/client";

export type PostWithDetails = Prisma.PostGetPayload<{
  include: {
    author: {
      select: { username: true; displayName: true; avatarUrl: true };
    };
    likes: { select: { userId: true } };
    _count: { select: { likes: true; comments: true } };
  };
}>;

export type UserWithCount = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: { followers: true; posts: true };
    };
  };
}>;

export type FollowerPreview = {
  follower: {
    avatarUrl: string | null;
    username: string;
  };
};

export type postState = {
  errors?: {
    caption?: string[];
    images?: string[];
    general?: string[];
  };
} | null | void;

export type CommentWithAuthor = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: { username: true; displayName: true; avatarUrl: true };
    };
  };
}>;

// types/post.ts
export type PostWithComments = Prisma.PostGetPayload<{
  include: {
    author: {
      select: { username: true; displayName: true; avatarUrl: true };
    };
    likes: { select: { userId: true } };
    _count: { select: { likes: true; comments: true } };
    comments: {
      include: {
        user: {
          select: { username: true; displayName: true; avatarUrl: true };
        };
      };
    };
  };
}>;
