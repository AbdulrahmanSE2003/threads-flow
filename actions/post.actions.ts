"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const handleLikeButton = async (userId: string, postId: string) => {
  const likeExist = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (!likeExist) {
    // Create like
    await prisma.like.create({ data: { userId, postId } });
  } else {
    // Delete like
    await prisma.like.delete({
      where: { userId_postId: { userId, postId } },
    });
  }

  revalidatePath("/feed");
};
