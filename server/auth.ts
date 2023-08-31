import { GetServerSidePropsContext } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import { prisma } from "./db";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.createdAt = token.createdAt;
        session.user.username = token.username;
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.emailVerified = token.emailVerified;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: { email: token.email! },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return dbUser;
    },
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
