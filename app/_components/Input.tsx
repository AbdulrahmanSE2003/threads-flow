import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  className?: string;
  placeholder: string;
  id: string;
  name: string;
  type: string;
}

const Input = ({
  className,
  placeholder,
  id,
  name,
  type = "text",
  ...props
}: InputProps) => {
  const style =
    "p-4 bg-zinc-200/75 rounded-xl text-sm focus:outline-1 outline-zinc-400 transition-all duration-300 placeholder:text-zinc-400 placeholder:text-sm placeholder:font-light";
  return (
    <input
      className={cn(style, className)}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
