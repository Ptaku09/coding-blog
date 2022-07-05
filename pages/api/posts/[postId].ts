import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { ObjectId } from 'bson';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_POST_NAME);

  switch (req.method) {
    case 'GET':
      if (postId.length !== 24) {
        return res.json({ status: 204 });
      }

      const post = await db.collection('Posts').findOne({ _id: new ObjectId(postId as string) });

      post ? res.json({ status: 200, data: post }) : res.json({ status: 204 });
      break;
  }
};

export default handler;