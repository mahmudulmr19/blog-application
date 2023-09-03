import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getServerSession(authOptions);

  return NextResponse.json(user?.user);
}
