"use client";

import { logoutAction } from "@/actions/auth.actions";
import { ThemeToggle } from "./ui/ThemeToggle";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/app/_components/ui/dropdown-menu";
import { LogOut, UserPen } from "lucide-react";

const MenuList = () => {
  return (
    <DropdownMenuContent className="w-fit max-w-56 border-border shadow-xl rounded-xl overflow-hidden">
      {/* Theme Toggle Section */}
      <ThemeToggle />
      <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />

      {/* Edit Profile */}
      <DropdownMenuItem className="flex items-center justify-between px-3 py-2.5 cursor-pointer rounded-lg focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors">
        <span className="text-sm font-medium">Edit Profile</span>
        <UserPen className="size-4 text-zinc-500" />
      </DropdownMenuItem>

      <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />

      {/* Log out */}
      <DropdownMenuItem
        variant="destructive"
        onSelect={(e) => {
          e.preventDefault();
          logoutAction();
        }}
        className="flex items-center justify-between px-3 py-2.5 cursor-pointer rounded-lg focus:bg-red-50 dark:focus:bg-red-950/30 group transition-colors duration-300"
      >
        <span className="text-sm font-bold">Log out</span>
        <LogOut className="size-4" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default MenuList;
