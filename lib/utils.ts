import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { unstable_cache } from "next/cache";
import { prisma } from "./db/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(date: string | Date) {
  return formatDistanceToNowStrict(new Date(date), {
    addSuffix: false,
  })
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d");
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getCachedUser = unstable_cache(
  async (username: string) => {
    return prisma.user.findUnique({
      where: { username },
      include: {
        _count: {
          select: { followers: true, posts: true },
        },
      },
    });
  },
  ["user-profile"],
  {
    revalidate: 3600,
  },
);
