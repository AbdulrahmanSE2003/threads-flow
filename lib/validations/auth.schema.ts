import { z } from "zod";

export const RegisterSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters."),

  username: z
    .string()
    .trim()
    .min(3, "User name must be at least 3 characters.")
    .max(20, "Username cannot exceed 20 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores.",
    ),

  email: z.string().email(),

  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const LoginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(8, "Password must be at least 8 characters."),
});

// These are your TypeScript types — auto-generated from the schemas.
// You never write these manually.
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
