import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      likedPosts: string[];
      bookmarkedPosts: { [key in 'bookmarkedPostId' | 'addedAt']: string }[];
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    createdAt: string;
    motto: string;
    bio: string;
    likedPosts: string[];
    bookmarkedPosts: { [key in 'bookmarkedPostId' | 'addedAt']: string }[];
    createdPosts: string[];
  }
}
