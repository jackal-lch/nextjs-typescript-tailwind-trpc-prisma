import NextAuth, { type NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/prisma';
// import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      //   if (session.user) {
      //     session.user.id = user.id;
      //   }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
