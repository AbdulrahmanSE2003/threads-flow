# Threads Flow

A modern, full-stack social media application inspired by Threads, built with Next.js 16, Prisma, and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure sign-up and login flow using custom JWT authentication and password hashing.
- **Profiles**: Customizable user profiles with avatars, bios, and follower/following metrics.
- **Posts (Threads)**: Create rich posts with text and image support.
- **Interactions**: Like, comment, and engage seamlessly with other users' content.
- **Social Graph**: Follow and unfollow users to curate your personalized feed.
- **Responsive Design**: Beautiful, mobile-first UI using modern design principles.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Shadcn UI, Radix UI
- **Database & ORM:** PostgreSQL with Prisma ORM
- **Media Storage:** Cloudinary
- **Authentication:** Custom JWT (`jose`) + `bcryptjs`
- **Validation:** Zod
- **Icons:** Lucide React

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- A running PostgreSQL database instance
- A Cloudinary account for media uploads

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd threads-flow
   ```

2. **Install dependencies:**
   This project uses `pnpm` for package management.
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory based on the `.env.example` structure (or add the following core variables):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/threads-flow"
   # Add your Cloudinary credentials and JWT secret key here
   ```

4. **Initialize the database:**
   Push the schema to your database to set up the tables:
   ```bash
   npx prisma db push
   ```
   *(Optional) You can also seed the database with initial data using `pnpm run seed` if a seed script is configured.*

5. **Start the development server:**
   ```bash
   pnpm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

- `/app` - Next.js App Router (pages, layouts, and routing logic)
- `/actions` - Server actions for handling form submissions and data mutations (e.g., auth, posts, profiles)
- `/components` - Reusable UI components built with Radix UI and Shadcn
- `/prisma` - Database schema (`schema.prisma`) and seeding scripts
- `/lib` - Utility functions, configurations, and shared logic
- `/types` - TypeScript type definitions and interfaces

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
