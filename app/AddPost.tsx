"use client";
import React, { FormEvent } from "react";
import { User } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function AddPost({ user }: { user: User }) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const body = e.target.body.value as string;
    if (!body) return;

    const { data } = await axios.post("/api/posts", { body });
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-full mt-10">
      <div className="w-full flex items-center gap-3">
        <Avatar className="cursor-pointer uppercase font-bold">
          <AvatarImage src={user.image!} alt={user.name!} />
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
        </Avatar>
        <Textarea
          className="w-full"
          placeholder="write something..."
          minLength={10}
          name="body"
        />
      </div>
      <div className="flex items-center justify-end mt-2">
        <Button>Post</Button>
      </div>
    </form>
  );
}
