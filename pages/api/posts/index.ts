import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { detectLanguage } from '../../../lib/extensions';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_POST_NAME);

  switch (req.method) {
    case 'GET':
      const posts = await db.collection('Posts').find().toArray();

      posts ? res.json({ status: 200, data: posts }) : res.json({ status: 204 });
      break;

    case 'POST':
      const { username, image, comment, code, extension } = req.body;
      const language = detectLanguage(extension);

      const newPost = await db.collection('Posts').insertOne({ username, image, comment, code, language, likes: 0 });

      newPost ? res.json({ status: 200, data: newPost }) : res.json({ status: 204 });
      break;
  }
};

export default handler;
