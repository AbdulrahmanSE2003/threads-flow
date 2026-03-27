"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
    const handleOutsideClick = (e: MouseEvent) => {
      console.log(e);

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
    };
  }, [onClose]);

  return (
    isOpen && (
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 bg-zinc-900/50 backdrop-blur-[2px] z-10 flex justify-center items-center`}
      >
        <div
          ref={modalRef}
          className={`bg-zinc-900 rounded-2xl border border-border relative w-xl min-h-48 max-h-144`}
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
              <span className={`font-bold text-[14px] tracking-wider`}>
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
