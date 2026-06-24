"use client";

import Input from "@/app/_components/Input";
import Link from "next/link";
import { useActionState } from "react";
import { FormState, BaseFormState } from "@/types/auth";
import { LoginSchema } from "@/lib/validations/auth.schema";
import { loginAction } from "@/actions/auth.actions";

const LoginForm = () => {
  const handleSubmit = async (
    prevState: FormState,
    formData: FormData,
  ): Promise<FormState> => {
    const raw = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = LoginSchema.safeParse(raw);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors as BaseFormState["errors"],
      };
    }

    return loginAction(prevState, formData);
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, null);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 justify-center items-center"
    >
      <Input
        className="w-3/5 bg-white dark:bg-neutral-900 border border-border/50"
        placeholder="Enter your email"
        type="email"
        name="email"
        id="email"
        defaultValue="guest@demo.com"
      />
      {state?.errors?.email && (
        <p className="text-red-500 dark:text-red-400 text-xs">
          {state?.errors?.email?.[0]}
        </p>
      )}

      <Input
        className="w-3/5 bg-white dark:bg-neutral-900 border border-border/50"
        placeholder="Enter your password"
        type="password"
        name="password"
        id="password"
        defaultValue="guest1234"
      />
      {state?.errors?.password && (
        <p className="text-red-500 dark:text-red-400 text-xs">
          {state?.errors?.password?.[0]}
        </p>
      )}

      {state?.errors?.general && (
        <div className="w-3/5 bg-red-500/10 border border-red-500/50 px-4 py-3 rounded-xl">
          <p className="text-red-600 dark:text-red-400 text-sm font-medium">
            {state?.errors?.general?.[0]}
          </p>
        </div>
      )}

      <div className="w-3/5 bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 rounded-xl">
        <p className="text-emerald-700 dark:text-emerald-300 text-xs text-center font-medium">
          Demo app — using{" "}
          <span className="font-mono font-bold">guest@demo.com</span> /{" "}
          <span className="font-mono font-bold">guest1234</span>
        </p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-black dark:bg-white text-white dark:text-black hover:opacity-90 w-3/5 p-5 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Logging in..." : "Log in"}
      </button>

      <p className="text-neutral-500 dark:text-neutral-400 text-sm">
        You don&apos;t have an account yet!{" "}
        <Link
          className="text-black dark:text-white font-medium hover:underline"
          href="/register"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
