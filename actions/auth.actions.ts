"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { comparePassword, hashPassword } from "@/lib/auth/password";
import { clearSession, getSession, setSession } from "@/lib/auth/session";
import {
  EditProfileSchema,
  LoginSchema,
  RegisterSchema,
} from "@/lib/validations/auth.schema";
import { FormState, BaseFormState } from "@/types/auth";

export const registerAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const raw = {
    displayName: formData.get("displayName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Step 2: Server-side validation
  const result = RegisterSchema.safeParse(raw);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as BaseFormState["errors"],
    };
  }
  let success = false;

  try {
    // Step 3: Check duplicates in DB
    // check email exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    if (existingEmail) {
      return {
        errors: { general: ["Email already in use"] },
      };
    }

    // check username exists
    const existingUsername = await prisma.user.findUnique({
      where: { username: result.data.username },
    });

    if (existingUsername)
      return {
        errors: { general: ["This username is taken"] },
      };

    // Step 4: Hash password
    const hashedPassword = await hashPassword(result.data.password);

    // Step 5: Create user in DB
    const user = await prisma.user.create({
      data: {
        displayName: result.data.displayName,
        username: result.data.username,
        email: result.data.email,
        passwordHash: hashedPassword,
      },
    });

    // Step 6: Create session
    const sessionPayLoad = {
      sub: user.id,
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    };
    await setSession(sessionPayLoad);
    success = true;
  } catch (error) {
    console.error(error);
    return {
      errors: { general: ["Something went wrong. Please try again."] },
    };
  }

  // Step 7: Redirect
  if (success) {
    redirect("/feed");
  }

  // Fallback return to satisfy the Promise<FormState> requirement
  return null;
};

export const loginAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors as BaseFormState["errors"] };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    // Check if user exists in DB
    if (!user) {
      return {
        errors: { general: ["This email is not found in our records."] },
      };
    }

    // Checking if password typed correctly
    const isValidPassword = await comparePassword(
      result.data.password,
      user.passwordHash,
    );
    if (!isValidPassword) {
      return {
        errors: { general: ["Wrong password, Please try again!"] },
      };
    }

    // Setting session
    const sessionPayLoad = {
      sub: user.id,
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    };
    await setSession(sessionPayLoad);
  } catch (error) {
    console.error(error);
    return {
      errors: { general: ["Something went wrong. Please try again."] },
    };
  }

  redirect("/feed");
  return null;
};

export const logoutAction = async () => {
  await clearSession();
  redirect("/login");
};
