import React from "react";
import AddPost from "./AddPost";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

async function getAllPosts() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      body: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
    },
  });

  return posts;
}

export default async function Home() {
  const user = await getCurrentUser();
  const posts = await getAllPosts();

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between p-5 lg:px-0">
        {user && <AddPost user={user} />}
      </div>

      <div className="flex flex-col gap-4 w-full max-w-screen-sm mx-auto mt-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-md bg-slate-100 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="cursor-pointer uppercase font-bold">
                  <AvatarImage
                    src={post.author.image ?? ""}
                    alt={`profile ${post.author.name}`}
                  />
                  <AvatarFallback>
                    {post.author.name?.[0] || "N/A"}
                  </AvatarFallback>
                </Avatar>
                <div>{post.author.name}</div>
              </div>
              <div>{dayjs(post.createdAt).fromNow()}</div>
            </div>

            <div className="py-4">{post.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
