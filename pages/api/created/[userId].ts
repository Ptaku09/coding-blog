import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { ObjectId } from 'bson';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const dbUsers = client.db(process.env.MONGODB_USER_NAME);
  const dbPosts = client.db(process.env.MONGODB_POST_NAME);
  const { userId } = req.query;

  if (userId.length !== 24) {
    return res.json({ status: 404, data: null });
  }

  const user = await dbUsers.collection('users').findOne({ _id: new ObjectId(userId as string) });
  const posts: any[] = [];

  if (!user) return res.json({ status: 404, data: null });

  // Fetch posts from db
  for (const createdPost of user.createdPosts) {
    const post = await dbPosts.collection('Posts').findOne({ _id: new ObjectId(createdPost) });
    posts.unshift(post);
  }

  res.json({ status: 200, data: posts });
};

export default handler;
