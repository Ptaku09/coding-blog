import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_POST_NAME);

  switch (req.method) {
    case 'POST':
      const bodyObject = req.body;
      const newPost = await db.collection('Posts').insertOne(bodyObject);
      newPost ? res.json({ status: 200, data: newPost }) : res.json({ status: 500 });
      break;
  }
};

export default handler;
