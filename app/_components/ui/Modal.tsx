"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type options = "create" | "image" | "edit";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  show?: options;
  children: React.ReactNode;
  title?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  show = "create",
  title = "New Thread",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const showImage = show === "image";

  useEffect(() => {
    if (!isOpen) return;

    const scrollContainer = document.querySelector(".hideScroll") as HTMLElement;
    const prevOverflow = scrollContainer?.style.overflow ?? "";

    if (scrollContainer) scrollContainer.style.overflow = "hidden";

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
      if (scrollContainer) scrollContainer.style.overflow = prevOverflow;
    };
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-zinc-900/50 backdrop-blur-[2px] flex justify-center items-center z-[9999]"
    >
      <div
        ref={modalRef}
        className={cn(
          "bg-background dark:bg-zinc-900 rounded-2xl border border-border relative overflow-hidden flex flex-col",
          showImage
            ? "h-full w-xl"
            : show === "edit"
              ? "w-[520px]"
              : "min-h-48 w-xl max-h-144",
        )}
      >
        {!showImage && (
          <div className="flex justify-between items-center border-b border-border p-4">
            <button
              onClick={onClose}
              className="text-md font-medium tracking-wider cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              Cancel
            </button>
            {title && (
              <span className="font-semibold text-[14px] tracking-wider">
                {title}
              </span>
            )}
          </div>
        )}

        <div className={cn("flex-1", showImage ? "p-0 relative" : "p-4")}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
