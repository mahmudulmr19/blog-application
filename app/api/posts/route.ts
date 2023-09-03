import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { body }: { body: string } = await req.json();

    if (!body) {
      return NextResponse.json(
        { status: 400, data: { message: "missing body data" } },
        { status: 400 }
      );
    }

    const title = `how to connect to database`;
    const slug = crypto.randomUUID();

    const post = await prisma.post.create({
      data: {
        title,
        body,
        slug,
        authorId: user.id,
      },
    });

    return NextResponse.json({
      data: {
        post,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        data: {
          message: error.message,
        },
      }),
      { status: 400 }
    );
  }
}
