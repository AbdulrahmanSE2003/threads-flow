"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return <div className="h-12 w-48 animate-pulse bg-zinc-800 rounded-xl" />;

  const options = [
    { name: "light", icon: Sun },
    { name: "dark", icon: Moon },
    { name: "system", label: "Auto" },
  ];

  return (
    <div className="flex items-center bg-popover border border-border p-1 rounded-xl w-fit relative m-1.5">
      {options.map((option) => {
        const isActive = theme === option.name;

        return (
          <button
            key={option.name}
            onClick={() => setTheme(option.name)}
            className={`
              relative z-10 flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg transition-all duration-300 cursor-pointer
              text-foreground`}
          >
            {option.icon ? (
              <option.icon
                className={`size-5 ${isActive ? "fill-white/10" : ""}`}
              />
            ) : (
              <span className="text-sm font-bold tracking-tight">
                {option.label}
              </span>
            )}

            {isActive && (
              <div className="absolute inset-0 bg-zinc-200/80 dark:bg-zinc-800/80 border border-border rounded-lg -z-10 shadow-sm transition-all duration-300" />
            )}
          </button>
        );
      })}
    </div>
  );
}
