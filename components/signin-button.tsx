"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button className="rounded-full" onClick={() => signIn("github", {})}>
      Sign in
    </Button>
  );
}
