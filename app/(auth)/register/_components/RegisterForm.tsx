"use client";

import Input from "@/app/_components/Input";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      // action={() => {}}
      className={`flex flex-col gap-3 justify-center items-center`}
    >
      <Input
        className="w-3/5"
        placeholder="Enter your display name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        type="text"
        name="displayName"
        id="displayName"
      />
      <Input
        className="w-3/5"
        placeholder="Enter your user name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        name="userName"
        id="userName"
      />
      <Input
        className="w-3/5"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        id="email"
      />
      <Input
        className="w-3/5"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        id="password"
      />

      <button
        disabled={!displayName || !userName || !email || !password}
        className={`bg-foreground/95 hover:bg-foreground w-3/5 p-5 rounded-xl text-white transition-colors duration-300 cursor-pointer disabled:bg-foreground/50 disabled:pointer-events-none disabled:cursor-not-allowed`}
      >
        Sign Up
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
