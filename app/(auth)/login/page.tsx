import Image from "next/image";
import LoginForm from "./_components/LoginForm";
import { AtSign } from "lucide-react";

const LoginPage = async () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center text-foreground bg-background">
      <div className="absolute max-md:hidden -left-20 right-0 -top-24 h-100">
        <Image
          src={"https://static.cdninstagram.com/rsrc.php/yC/r/JlaY6JCPfe-.avif"}
          alt="Threads Picture"
          fill
        />
      </div>

      <div className="w-full max-w-2xl px-6 z-10 md:mt-20">
        <div className="flex flex-col items-center">
          <div className="bg-black dark:bg-white p-3 rounded-2xl mb-4">
            <AtSign
              size={40}
              className="text-white dark:text-black"
              strokeWidth={2.5}
            />
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            Welcome back
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">
            See what&apos;s happening in your circles.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
