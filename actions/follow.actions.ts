"use server";

import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const toggleFollow = async (
  followingId: string,
  followingUserName: string,
) => {
  const session = await getSession();
  if (!session) return;

  const followerId = session.sub;
  try {
    const followExist = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (!followExist) {
      await prisma.follow.create({
        data: {
          followerId,
          followingId,
        },
      });
    } else {
      await prisma.follow.delete({
        where: { followerId_followingId: { followerId, followingId } },
      });
    }
    revalidatePath("/profile");
    revalidatePath(`/profile/${followingUserName}`);
  } catch (error) {
    console.error(error);
  }
};
