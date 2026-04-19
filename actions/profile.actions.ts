"use server";

import { getSession, setSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { EditProfileSchema } from "@/lib/validations/auth.schema";
import { FormState } from "@/types/auth";
import { revalidatePath } from "next/cache";

export const editProfile = async (prevState: FormState, formData: FormData) => {
  const raw = {
    displayName: formData.get("displayName"),
    bio: formData.get("bio"),
  };

  try {
    const session = await getSession();

    if (!session) return { errors: { general: ["You must be logged in"] } };
    const result = EditProfileSchema.safeParse(raw);

    if (!result.success) return { errors: result.error.flatten().fieldErrors };

    const userId = session.sub;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        displayName: result.data.displayName,
        bio: result.data.bio,
      },
    });
    revalidatePath("/profile");
    revalidatePath(`/profile/${session.username}`);

    await setSession({ ...session, displayName: updatedUser.displayName });
    return { success: true };
  } catch (error) {
    console.error(error);
  }
};
