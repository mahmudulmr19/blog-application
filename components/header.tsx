import Link from "next/link";
import React from "react";
import SignInButton from "./signin-button";
import NavbarMenu from "./navbar-menu";
import { ToggleMode } from "./toggle-mode";
import { getCurrentUser } from "@/lib/auth";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="w-full max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between p-5 lg:px-0">
        <div className="font-bold text-lg">Logo</div>

        <nav className="flex items-center text-sm space-x-6 lg:space-x-8 xl:scroll-p-10 2xl:space-x-12 font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>

          {user ? <NavbarMenu user={user} /> : <SignInButton />}

          <ToggleMode />
        </nav>
      </div>
    </header>
  );
}
