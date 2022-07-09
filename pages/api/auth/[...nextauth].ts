import NextAuth, { Session, TokenSet, User } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Twitter from 'next-auth/providers/twitter';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../mongodb';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXT_AUTH_SECRET as string,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.name.split(' ')[0],
          email: profile.email,
          image: profile.picture,
          likedPosts: [],
          bookmarkedPosts: [],
        };
      },
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: '2.0',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.name.split(' ')[0],
          email: profile.email,
          image: profile.picture,
          likedPosts: [],
          bookmarkedPosts: [],
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.name.split(' ')[0],
          email: profile.email,
          image: profile.picture,
          likedPosts: [],
          bookmarkedPosts: [],
        };
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    session: async (params: { session: Session; user: User; token: TokenSet }) => {
      if (params.user) {
        params.session.user.id = params.user.id;
        params.session.user.username = params.user.username;
        params.session.user.likedPosts = params.user.likedPosts;
        params.session.user.bookmarkedPosts = params.user.bookmarkedPosts;
      }

      return Promise.resolve(params.session);
    },
    redirect: async (params: { baseUrl: string }) => {
      return `${params.baseUrl}/board`;
    },
  },
});
