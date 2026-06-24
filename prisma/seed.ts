// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ── Users ──────────────────────────────────────────────
  const guest = await prisma.user.upsert({
    where: { email: "guest@demo.com" },
    update: {},
    create: {
      email: "guest@demo.com",
      username: "guest",
      displayName: "Guest",
      bio: "👋 Just exploring! This is a demo account.",
      passwordHash: await bcrypt.hash("guest1234", 12),
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: "ahmed@test.com" },
    update: {},
    create: {
      email: "ahmed@test.com",
      username: "ahmed_dev",
      displayName: "Ahmed Dev",
      bio: "Building cool stuff with Next.js ⚡",
      passwordHash: await bcrypt.hash("password123", 12),
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "sara@test.com" },
    update: {},
    create: {
      email: "sara@test.com",
      username: "sara_ui",
      displayName: "Sara UI",
      bio: "UI/UX designer who codes 🎨",
      passwordHash: await bcrypt.hash("password123", 12),
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "omar@test.com" },
    update: {},
    create: {
      email: "omar@test.com",
      username: "omar_codes",
      displayName: "Omar Codes",
      bio: "Full stack dev. Coffee addict ☕",
      passwordHash: await bcrypt.hash("password123", 12),
    },
  });

  // ── Posts ──────────────────────────────────────────────
  const post1 = await prisma.post.create({
    data: {
      caption: "Just shipped a new feature 🚀 Next.js streaming is incredible",
      images: [],
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      caption:
        "Working on a Threads clone to learn advanced Next.js patterns. Day 3!",
      images: [],
      authorId: user1.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      caption:
        "UI tip: whitespace is not wasted space. Give your elements room to breathe.",
      images: [],
      authorId: user2.id,
    },
  });

  const post4 = await prisma.post.create({
    data: {
      caption:
        "PostgreSQL + Prisma is such a good combo for TypeScript projects 🔥",
      images: [],
      authorId: user2.id,
    },
  });

  const post5 = await prisma.post.create({
    data: {
      caption:
        "The more I learn about the Node.js event loop, the more I appreciate it",
      images: [],
      authorId: user3.id,
    },
  });

  // ── Likes ──────────────────────────────────────────────
  await prisma.like.createMany({
    data: [
      { userId: user2.id, postId: post1.id },
      { userId: user3.id, postId: post1.id },
      { userId: user1.id, postId: post3.id },
      { userId: user3.id, postId: post3.id },
      { userId: user1.id, postId: post4.id },
      { userId: user2.id, postId: post5.id },
    ],
    skipDuplicates: true,
  });

  // ── Follows ────────────────────────────────────────────
  await prisma.follow.createMany({
    data: [
      { followerId: user2.id, followingId: user1.id },
      { followerId: user3.id, followingId: user1.id },
      { followerId: user1.id, followingId: user2.id },
      { followerId: user3.id, followingId: user2.id },
    ],
    skipDuplicates: true,
  });

  // ── Comments ───────────────────────────────────────────
  const commentTexts = [
    "This is really insightful! 🔥",
    "Totally agree with this.",
    "Never thought about it this way before.",
    "This made my day 😄",
    "Great point, keep it up!",
    "I was just thinking about this yesterday.",
    "This hits different at 2am 😅",
    "Saved this for later, thanks!",
    "The PostgreSQL + Prisma combo is unbeatable fr",
    "Next.js streaming changed how I build apps",
  ];

  const posts = [post1, post2, post3, post4, post5];
  const users = [user1, user2, user3];

  for (const post of posts) {
    const otherUsers = users.filter((u) => u.id !== post.authorId);
    const commentCount = Math.floor(Math.random() * 2) + 2;

    for (let i = 0; i < commentCount; i++) {
      const randomUser =
        otherUsers[Math.floor(Math.random() * otherUsers.length)];
      const randomComment =
        commentTexts[Math.floor(Math.random() * commentTexts.length)];

      await prisma.comment.create({
        data: {
          content: randomComment,
          authorId: randomUser.id,
          postId: post.id,
        },
      });
    }
  }

  console.log("✅ Database seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
