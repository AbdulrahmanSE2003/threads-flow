import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "./_components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Threads Flow",
  description: "Share what's on your mind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.className} 
          antialiased 
          bg-white dark:bg-black 
          text-black dark:text-white 
          min-h-screen
        `}
      >
        <Toaster richColors position="top-center" theme="system" />
        <Navbar />
        <main className="relative flex flex-col min-h-screen items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
