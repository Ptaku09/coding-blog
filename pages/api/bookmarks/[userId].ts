import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { ObjectId } from 'bson';
import { Post } from '../../board';
import { BookmarkedPostData } from '../../bookmarks';
import { SortDirection, SortOptions } from '../../../lib/enums';

interface Query {
  userId?: string;
  sort?: SortOptions;
  direction?: SortDirection;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const dbUsers = client.db(process.env.MONGODB_USER_NAME);
  const dbPosts = client.db(process.env.MONGODB_POST_NAME);

  const { userId, sort, direction } = req.query as Query;
  const user = await dbUsers.collection('users').findOne({ _id: new ObjectId(userId as string) });
  const posts: any[] = [];

  if (!user) return res.json({ status: 404 });

  // Deal with default sort - cannot access added time via post object
  if (!sort || sort === SortOptions.addedAt) {
    user.bookmarkedPosts.sort((a: BookmarkedPostData, b: BookmarkedPostData) => {
      if (direction === SortDirection.asc) {
        return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
      } else {
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });
  }

  // Fetch posts from db
  for (const bookmarkedPost of user.bookmarkedPosts) {
    const post = await dbPosts.collection('Posts').findOne({ _id: new ObjectId(bookmarkedPost.bookmarkedPostId) });
    posts.push(post);
  }

  // Deal with other sort options
  switch (sort) {
    case SortOptions.createdAt:
      posts.sort((a: Post, b: Post) => {
        if (direction === SortDirection.asc) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });

      break;

    case SortOptions.likes:
      posts.sort((a: Post, b: Post) => {
        if (direction === SortDirection.asc) {
          return a.likes - b.likes;
        } else {
          return b.likes - a.likes;
        }
      });

      break;

    case SortOptions.author:
      posts.sort((a: Post, b: Post) => {
        if (direction === SortDirection.asc) {
          return a.username.localeCompare(b.username);
        } else {
          return b.username.localeCompare(a.username);
        }
      });

      break;

    case SortOptions.language:
      posts.sort((a: Post, b: Post) => {
        if (direction === SortDirection.asc) {
          return a.language.localeCompare(b.language);
        } else {
          return b.language.localeCompare(a.language);
        }
      });

      break;
  }

  res.json({ status: 200, data: posts });
};

export default handler;
