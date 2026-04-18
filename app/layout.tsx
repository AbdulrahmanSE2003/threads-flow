import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "./_components/Navbar";
import { getSession } from "@/lib/auth/session";
import { Providers } from "./_components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    template: "%s | Threads Flow",
    default: "Threads Flow",
  },
  description: "Share what's on your mind and connect with the community.",
  metadataBase: new URL("https://yourdomain.com"), // Replace with your actual domain
  keywords: ["Social Media", "Threads", "Next.js", "Community"],
  authors: [{ name: "Abdulrahman Saad" }],
  icons: {
    icon: "/logo.png", // Standard favicon
    apple: "/logo.png", // For iOS devices
  },
  openGraph: {
    title: "Threads Flow",
    description: "Share what's on your mind",
    // url: "https://yourdomain.com", // final url is here
    siteName: "Threads Flow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Threads Flow",
    description: "Share what's on your mind",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.className} 
          antialiased 
          bg-background
          text-foreground 
          min-h-screen
        `}
      >
        <Providers>
          <Toaster richColors position="top-center" theme="system" />
          {session && <Navbar username={session?.username ?? ""} />}
          <main className="relative flex flex-col min-h-screen items-center bg-background">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
