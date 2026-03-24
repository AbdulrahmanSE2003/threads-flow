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
      className="flex flex-col gap-3 justify-center items-center"
    >
      <Input
        className="w-3/5 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
        placeholder="Enter your display name"
        type="text"
        name="displayName"
        id="displayName"
      />
      {state?.errors?.displayName && (
        <p className="text-red-500 dark:text-red-400 text-xs">
          {state.errors.displayName[0]}
        </p>
      )}

      <Input
        className="w-3/5 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
        placeholder="Enter your user name"
        type="text"
        name="username"
        id="username"
      />
      {state?.errors?.username && (
        <p className="text-red-500 dark:text-red-400 text-xs">
          {state.errors.username[0]}
        </p>
      )}

      <Input
        className="w-3/5 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
        placeholder="Enter your email"
        type="email"
        name="email"
        id="email"
      />
      {state?.errors?.email && (
        <p className="text-red-500 dark:text-red-400 text-xs">
          {state.errors.email[0]}
        </p>
      )}

      <Input
        className="w-3/5 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
        placeholder="Enter your password"
        type="password"
        name="password"
        id="password"
      />
      {state?.errors?.password && (
        <p className="text-red-500 dark:text-red-400 text-xs">
          {state.errors.password[0]}
        </p>
      )}

      {state?.errors?.general && (
        <div className="w-3/5 bg-red-500/10 border border-red-500/50 px-4 py-3 rounded-xl">
          <p className="text-red-600 dark:text-red-400 text-sm font-medium">
            {state.errors.general[0]}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-black dark:bg-white text-white dark:text-black hover:opacity-90 w-3/5 p-5 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Signing Up..." : "Sign Up"}
      </button>

      <p className="text-neutral-500 dark:text-neutral-400 text-sm">
        You have an account already!{" "}
        <Link
          className="text-black dark:text-white font-semibold hover:underline"
          href="/login"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
