import React from "react";
import AddPost from "./AddPost";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between p-5 lg:px-0">
        {user && <AddPost user={user} />}
      </div>
    </div>
  );
}
