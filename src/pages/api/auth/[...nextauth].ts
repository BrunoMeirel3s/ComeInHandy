import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { fauna } from "@/services/fauna";
import { query as q } from "faunadb";

export const authOptions = {
  providers: [
    Google({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    GithubProvider({
      clientId: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ account, user }) {
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              )
            ),
            //Caso não tenha conta será inserido no banco de dados
            q.Create(q.Collection("users"), { data: { email: user.email } }),
            //Caso tenha conta será apenas obtido as informações do usuário
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          )
        );
        return user;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, user, token }) {
      return {
        ...session,
        ...user,
      };
    },
  },
};

export default NextAuth(authOptions);
