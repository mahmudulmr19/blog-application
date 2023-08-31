import Link from "next/link";
import React from "react";
import { ToggleMode } from "./toggle-mode";

export function Header() {
  return (
    <header className="w-full max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between p-5 lg:px-0">
        <div className="font-bold text-lg">Logo</div>

        <nav className="flex items-center text-sm space-x-6 font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <ToggleMode />
        </nav>
      </div>
    </header>
  );
}
