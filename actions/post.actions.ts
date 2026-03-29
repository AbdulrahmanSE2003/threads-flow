"use server";

import { getSession } from "@/lib/auth/session";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/db/prisma";
import { postSchema } from "@/lib/validations/post.schema";
import { postState } from "@/types/post";
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

export const createPost = async (
  prevState: postState,
  formData: FormData,
): Promise<postState> => {
  const raw = {
    caption: formData.get("caption"),
    images: formData.getAll("images") as File[],
  };

  const result = postSchema.safeParse(raw);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // uploading to cloudinary
  const session = await getSession();
  if (!session) return { errors: { general: ["You must be logged in"] } };

  // const images  to be handled
  const imageFiles = formData.getAll("images") as File[] | null;

  const images: string[] = [];
  if (imageFiles && imageFiles.length > 0) {
    const validFiles = imageFiles.filter((file) => file.size > 0);

    const uploadPromises = validFiles.map(async (file) => {
      const url = await uploadToCloudinary(file);
      return url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    images.push(...uploadedUrls);
  }

  await prisma.post.create({
    data: {
      caption: result.data.caption,
      images,
      authorId: session.sub,
    },
  });

  revalidatePath("/feed");
  return { success: true };
};

export const deletePost = async (postId: string) => {
  const session = await getSession();
  if (!session) return;

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/feed");
};
