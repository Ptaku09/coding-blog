import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { ObjectId } from 'bson';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_USER_NAME);

  switch (req.method) {
    case 'GET':
      if (userId.length !== 24) {
        return res.json({ status: 404, data: null });
      }

      const user = await db.collection('users').findOne({ _id: new ObjectId(userId as string) });

      user ? res.json({ status: 200, data: user }) : res.json({ status: 404, data: null });
      break;
  }
};

export default handler;
