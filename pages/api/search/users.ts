import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';

type Query = {
  query?: string;
  limit?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_USER_NAME);

  switch (req.method) {
    case 'GET':
      const { query: searchQuery, limit }: Query = req.query;

      try {
        const users = await db
          .collection('users')
          .aggregate([
            {
              $search: {
                index: 'users',
                autocomplete: {
                  query: searchQuery,
                  path: 'username',
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 3,
                  },
                },
              },
            },
            {
              $limit: parseInt(limit || '5'),
            },
            {
              $project: {
                image: true,
                name: true,
                username: true,
                backgroundImage: true,
                bio: true,
              },
            },
          ])
          .toArray();

        res.json({ status: 200, data: users });
      } catch (error) {
        res.json({ status: 404 });
      }

      break;
  }
};

export default handler;
