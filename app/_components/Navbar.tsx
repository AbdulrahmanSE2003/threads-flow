"use client";

import { AtSign, Home, Menu, Plus, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Modal } from "./ui/Modal";
import CreatePost from "./CreatePost";

const navItems = [
  { icon: Home, path: "/feed" },
  { icon: User2, path: "/profile" },
];

const Navbar = () => {
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav
      className={`h-full fixed max-md:hidden top-0 bottom-0 left-0 w-19 flex flex-col justify-between items-center z-10 py-5`}
    >
      {/* Logo */}
      <Link href={"/feed"}>
        <AtSign
          className={`opacity-80 size-10 stroke-white hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
        />
      </Link>

      {/* Nav Links */}
      <div className={`flex flex-col items-center justify-evenly gap-5 w-full`}>
        {navItems.map((item, i) => (
          <div key={i} className="w-full flex flex-col items-center gap-5">
            <Link
              href={item.path}
              className={`w-4/5 flex justify-center rounded-xl p-4 py-2 transition-colors duration-300 ${
                pathname === item.path
                  ? "text-white"
                  : "text-zinc-700 hover:bg-zinc-900/80"
              }`}
            >
              <item.icon
                className={`size-9 ${pathname === item.path ? "fill-white stroke-white" : ""}`}
              />
            </Link>

            {i === 0 && (
              <button
                onClick={() => setIsModalOpen((prev) => !prev)}
                className="bg-zinc-900/80 text-zinc-700 hover:text-white w-4/5 flex justify-center rounded-xl p-4 py-2 cursor-pointer transition-colors duration-300"
              >
                <Plus className="size-9" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Menu Button */}
      <button
        className={`text-zinc-700 hover:text-white has-hover:text-white transition-colors duration-300 cursor-pointer`}
      >
        <Menu />
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreatePost />
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
