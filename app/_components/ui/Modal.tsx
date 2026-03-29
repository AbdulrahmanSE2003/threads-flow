"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title = "New Thread",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    const handleEscapeButton = (e: KeyboardEvent) => {
      if (modalRef.current && e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeButton);

    return () => {
      document.removeEventListener("keydown", handleEscapeButton);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "unset";
    };
  }, [onClose, isOpen]);

  return (
    isOpen && (
      <div
        className={`fixed inset-0 animate-in fade-in duration-300 bg-zinc-900/50 backdrop-blur-[2px] z-100 flex justify-center items-center`}
      >
        <div
          ref={modalRef}
          className={cn(
            `bg-background dark:bg-zinc-900 rounded-2xl border border-border relative min-h-48  w-xl max-h-144 animate-in zoom-in-95 duration-300 z-50`,
          )}
        >
          <div
            className={`flex justify-between items-center border-b border-border p-4`}
          >
            <button
              onClick={onClose}
              className={`text-md font-medium tracking-wider cursor-pointer opacity-85 hover:opacity-100 transition-opacity duration-300`}
            >
              Cancel
            </button>
            {title && (
              <span className={`font-semibold text-[14px] tracking-wider`}>
                {title}
              </span>
            )}
          </div>

          <div className={`p-4`}>{children}</div>
        </div>
      </div>
    )
  );
}
