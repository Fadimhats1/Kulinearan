import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "string",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;

        const dbUser = await prisma.users.findFirst({
          where: { username: credentials.username },
        });

        const isPasswordMatch = await validatePassword(
          dbUser.password,
          credentials.password
        );

        if (dbUser && isPasswordMatch) {
          const user = {
            username: dbUser.username,
            userId: dbUser.userId,
            email: dbUser.email,
          };
          return user;
        }

        return null;
      },
    }),
    // GoogleProviders({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    // It was needed for replacing the default jwt with our own custo, key
    async jwt({ user, token }) {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
    // After that, change the session with the new jwt
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export const validatePassword = async (password, inputPassword) => {
  const result = await bcrypt.compare(password, inputPassword);
  return result;
};

export default NextAuth(authConfig);
