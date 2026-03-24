import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import RegisterForm from "./_components/RegisterForm";
import Image from "next/image";
import { AtSign } from "lucide-react";

const RegisterPage = async () => {
  const session = await getSession();
  if (session) redirect("/feed");

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
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create Threads account</h1>
          <p className="text-neutral-400 mt-2">Join the conversation</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
