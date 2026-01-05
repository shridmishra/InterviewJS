
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

import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
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
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await dbConnect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (existingUser) {
            if (existingUser.authProvider !== 'google') {
              existingUser.authProvider = 'google';
              existingUser.image = user.image;
              await existingUser.save();
            }
          } else {
            const newUser = new User({
              email: user.email,
              username: user.name,
              image: user.image,
              authProvider: 'google',
            });
            await newUser.save();
          }
        } catch (_error) {
          console.error(_error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        await dbConnect();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.name = dbUser.username;
          token.email = dbUser.email;
          token.picture = dbUser.image;
        } 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },

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

