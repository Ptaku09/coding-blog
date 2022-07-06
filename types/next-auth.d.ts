import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      likedPosts: string[];
      bookmarkedPosts: string[];
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    likedPosts: string[];
    bookmarkedPosts: string[];
  }
}
