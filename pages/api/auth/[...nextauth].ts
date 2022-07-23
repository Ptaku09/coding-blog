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
          id: profile.id,
          name: profile.name,
          username: profile.login,
          createdAt: new Date().toUTCString(),
          motto: '',
          bio: '',
          email: profile.email,
          image: profile.avatar_url,
          likedPosts: [],
          bookmarkedPosts: [],
          createdPosts: [],
        };
      },
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: '2.0',
      profile(profile) {
        return {
          id: profile.data.id,
          name: profile.data.name,
          username: profile.data.name.split(' ')[0],
          createdAt: new Date().toUTCString(),
          motto: '',
          bio: '',
          email: profile.email,
          image: profile.data.profile_image_url.replace('_normal', ''),
          likedPosts: [],
          bookmarkedPosts: [],
          createdPosts: [],
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
          createdAt: new Date().toUTCString(),
          motto: '',
          bio: '',
          email: profile.email,
          image: profile.picture.replace(/=s\d+-c/, '=s200-c'),
          likedPosts: [],
          bookmarkedPosts: [],
          createdPosts: [],
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
  },
});
