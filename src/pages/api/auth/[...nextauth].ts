import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { fauna } from "@/services/fauna";
import { Query as q }from "fauna"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    GithubProvider({
      clientId: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`      
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account }) {
      console.log(account);
      return true;
    },
    async session({ session, user }) {
      return {
        ...session,
        user,
      };
    },
  },
};

export default NextAuth(authOptions);
