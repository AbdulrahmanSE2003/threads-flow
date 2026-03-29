import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const postSchema = z.object({
  caption: z
    .string()
    .trim()
    .min(1, "Caption is required")
    .max(50, "Caption can't be more than 50 letters"),

  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported.",
        ),
    )
    .optional()
    .default([]),
});

export type PostInput = z.infer<typeof postSchema>;
