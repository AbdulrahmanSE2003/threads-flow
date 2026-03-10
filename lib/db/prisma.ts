import { PrismaClient } from "@prisma/client";

// This is the Singleton pattern.
// In development, Next.js reloads your code on every save.
// Without this pattern, every reload creates a NEW database connection.
// After 10 reloads you have 10 connections open. After 100 reloads = crash.

// The fix: store the client on the global object.
// Global survives code reloads. Your code doesn't re-run on global.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
