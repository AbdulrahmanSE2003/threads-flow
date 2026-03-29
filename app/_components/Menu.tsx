import { LogOut, Settings2 } from "lucide-react";
import { ThemeToggle } from "./ui/ThemeToggle";
import { clearSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const MenuList = () => {
  const handleLogout = async () => {
    await clearSession();
    redirect("/login");
  };
  return (
    <ul
      className={`flex flex-col gap-3 items-start [&_li]:hover:bg-zinc-200/80 [&_li]:dark:hover:bg-zinc-800/80 [&_li]:p-3 [&_li]:transition-colors [&_li]:duration-300 [&_li]:rounded-xl [&_li]:w-full [&_li]:cursor-pointer`}
    >
      <ThemeToggle />
      <hr className={`border-border w-full`} />
      <li>
        <button
          className={`flex items-center gap-2 transition-colors duration-300 cursor-pointer`}
        >
          Edit Profile
        </button>
      </li>
      <hr className={`border-border w-full`} />
      <li>
        <button
          onClick={handleLogout}
          className={`text-red-600 flex items-center gap-2 transition-colors duration-300 cursor-pointer`}
        >
          Log out
        </button>
      </li>
    </ul>
  );
};

export default MenuList;
