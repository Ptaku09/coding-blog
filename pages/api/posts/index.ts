import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { detectLanguage } from '../../../utils/extensions';
import { DEFAULT_AMOUNT_OF_FETCHED_POSTS } from '../../../lib/constants';
import { RequestOperationType, UpdateUserEndpoint } from '../../../lib/enums';
import { server } from '../../../config';

interface Query {
  iterator?: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_POST_NAME);

  switch (req.method) {
    case 'GET':
      const { iterator } = req.query as Query;
      const posts = await db
        .collection('Posts')
        .find()
        .skip(DEFAULT_AMOUNT_OF_FETCHED_POSTS * (iterator || 0))
        .limit(DEFAULT_AMOUNT_OF_FETCHED_POSTS)
        .sort({ _id: -1 })
        .toArray();

      posts ? res.json({ status: 200, data: posts }) : res.json({ status: 404 });
      break;

    case 'POST':
      const { backgroundImage, username, userId, image, comment, code, extension, hashtags, createdAt } = req.body;
      const language = detectLanguage(extension);

      const newPost = await db
        .collection('Posts')
        .insertOne({ backgroundImage, username, userId, image, comment, code, language, hashtags, createdAt, likes: 0 });

      // Assign the post to the user
      await fetch(`${server}/api/users/${userId}/${UpdateUserEndpoint.createdPosts}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          createdPostId: newPost.insertedId,
          type: RequestOperationType.ADD,
        }),
      });

      newPost ? res.json({ status: 200, data: newPost }) : res.json({ status: 404 });
      break;
  }
};

export default handler;
