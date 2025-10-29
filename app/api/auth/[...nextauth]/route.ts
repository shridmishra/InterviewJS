
import NextAuth from "next-auth"
import { NextAuthOptions, DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const runtime = 'nodejs'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/app/lib/mongodb"
import dbConnect from "@/app/lib/dbConnect"
import User from "@/app/models/User"
import bcrypt from "bcryptjs"

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (user && user.password && await bcrypt.compare(credentials.password as string, user.password)) {
          return { id: user.id, name: user.username, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: '/',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

