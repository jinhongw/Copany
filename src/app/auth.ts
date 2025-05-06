import NextAuth from "next-auth";
import { NextAuthResult } from "next-auth";
import { D1Adapter } from "@auth/d1-adapter";
import GithubProvider from "next-auth/providers/github";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const authResult = async (): Promise<NextAuthResult> => {
  return NextAuth({
    providers: [
      GithubProvider({
        clientId: (await getCloudflareContext({ async: true })).env
          .GITHUB_CLIENT_ID,
        clientSecret: (await getCloudflareContext({ async: true })).env
          .GITHUB_CLIENT_SECRET,
      }),
    ],
    adapter: D1Adapter((await getCloudflareContext({ async: true })).env.DB),
  });
};

export const { handlers, signIn, signOut, auth } = await authResult();
