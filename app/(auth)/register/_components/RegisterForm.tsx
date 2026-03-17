"use client";

import Input from "@/app/_components/Input";
import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/actions/auth.actions";
import { RegisterSchema } from "@/lib/validations/auth.schema";
import { FormState } from "@/types/auth";

const RegisterForm = () => {
  const handleSubmit = async (prevState: FormState, formData: FormData) => {
    const raw = {
      displayName: formData.get("displayName"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = RegisterSchema.safeParse(raw);

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    return registerAction(prevState, formData);
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, null);

  return (
    <form
      action={formAction}
      className={`flex flex-col gap-3 justify-center items-center`}
    >
      <Input
        className="w-3/5"
        placeholder="Enter your display name"
        type="text"
        name="displayName"
        id="displayName"
      />
      {state?.errors?.displayName && (
        <p className="text-red-500 text-xs">{state.errors.displayName[0]}</p>
      )}
      <Input
        className="w-3/5"
        placeholder="Enter your user name"
        type="text"
        name="username"
        id="username"
      />
      {state?.errors?.username && (
        <p className="text-red-500 text-xs">{state.errors.username[0]}</p>
      )}
      <Input
        className="w-3/5"
        placeholder="Enter your email"
        type="email"
        name="email"
        id="email"
      />
      {state?.errors?.email && (
        <p className="text-red-500 text-xs">{state.errors.email[0]}</p>
      )}
      <Input
        className="w-3/5"
        placeholder="Enter your password"
        type="password"
        name="password"
        id="password"
      />
      {state?.errors?.password && (
        <p className="text-red-500 text-xs">{state.errors.password[0]}</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className={`bg-foreground/95 hover:bg-foreground w-3/5 p-5 rounded-xl text-white transition-colors duration-300 cursor-pointer disabled:bg-foreground/50 disabled:pointer-events-none disabled:cursor-not-allowed`}
      >
        {isPending ? "Signing Up..." : "Sign Up"}{" "}
      </button>

      <p className={`text-neutral-400 `}>
        You have an account already!{" "}
        <Link className={`text-foreground`} href={"/login"}>
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
