"use server";

import { FormState } from "@/types/auth";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { setSession } from "@/lib/auth/session";
import { RegisterSchema } from "@/lib/validations/auth.schema";
import { FormState } from "@/types/auth";

export const registerAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  // Step 1: Extract raw data
  const raw = {
    // you know what goes here
  };

  // Step 2: Server-side validation
  const result = RegisterSchema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // Step 3: Check duplicates in DB
  // check email exists
  // check username exists

  // Step 4: Hash password

  // Step 5: Create user in DB
  // prisma.user.create({ data: { ... } })

  // Step 6: Create session
  // setSession expects: { sub, username, displayName }

  // Step 7: Redirect
  redirect("/feed");
};
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { setSession } from "@/lib/auth/session";
import { RegisterSchema } from "@/lib/validations/auth.schema";
import { FormState } from "@/types/auth";

export const registerAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  // Step 1: Extract raw data
  const raw = {
    // you know what goes here
  };

  // Step 2: Server-side validation
  const result = RegisterSchema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // Step 3: Check duplicates in DB
  // check email exists
  // check username exists

  // Step 4: Hash password

  // Step 5: Create user in DB
  // prisma.user.create({ data: { ... } })

  // Step 6: Create session
  // setSession expects: { sub, username, displayName }

  // Step 7: Redirect
  redirect("/feed");
};
