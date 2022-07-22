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
        return res.json({ status: 404 });
      }

      const post = await db.collection('Posts').findOne({ _id: new ObjectId(postId as string) });

      post ? res.json({ status: 200, data: post }) : res.json({ status: 404 });
      break;

    case 'PATCH':
      if (postId.length !== 24) {
        return res.json({ status: 404 });
      }

      const { likes } = req.body;
      const updatedPost = await db.collection('Posts').findOneAndUpdate({ _id: new ObjectId(postId as string) }, { $set: { likes } });

      updatedPost ? res.json({ status: 200 }) : res.json({ status: 404 });
      break;
  }
};

export default handler;
