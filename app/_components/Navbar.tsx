"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AtSign, Home, Menu, Plus, User2 } from "lucide-react";
import { Modal } from "./ui/Modal";
import CreatePost from "./CreatePost";
import MenuList from "./Menu";

const navItems = [
  { icon: Home, path: "/feed" },
  { icon: User2, path: "/profile" },
];

type options = "create" | "menu";

const Navbar = ({ username }: { username: string }) => {
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState<options>("create");

  const handleModalClick = (element: options) => {
    setIsModalOpen(true);
    setModalOption(element);
  };

  return (
    <nav
      className={`h-full fixed max-md:hidden top-0 bottom-0 left-0 w-19 flex flex-col justify-between items-center z-10 py-5`}
    >
      {/* Logo */}
      <Link href={"/feed"}>
        <AtSign
          className={`opacity-80 size-10 stroke-foreground hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
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
                  ? "text-foreground"
                  : "text-foreground hover:bg-zinc-200/80 dark:hover:bg-zinc-900/80"
              }`}
            >
              <item.icon
                className={`size-9 ${pathname === item.path ? "fill-foreground stroke-foreground" : ""}`}
              />
            </Link>

            {i === 0 && (
              <button
                onClick={() => handleModalClick("create")}
                className="bg-foreground/15 hover:bg-foreground/10 text-foreground w-4/5 flex justify-center rounded-xl p-4 py-2 cursor-pointer transition-colors duration-300"
              >
                <Plus className="size-9" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Menu Button */}
      <button
        onClick={() => handleModalClick("menu")}
        className={`text-foreground has-hover:text-foreground/70 transition-colors duration-300 cursor-pointer`}
      >
        <Menu />
      </button>

      <Modal
        show={modalOption}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {modalOption === "create" ? (
          <CreatePost username={username} />
        ) : (
          <MenuList />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
