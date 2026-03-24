import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          bg-white dark:bg-black 
          text-black dark:text-white 
          min-h-screen
        `}
      >
        <Toaster richColors position="top-center" theme="system" />

        <main className="relative flex min-h-screen flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
