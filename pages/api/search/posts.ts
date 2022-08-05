import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';

type Query = {
  query?: string;
  limit?: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_POST_NAME);

  switch (req.method) {
    case 'GET':
      const { query: searchQuery, limit = 5 }: Query = req.query;

      try {
        const posts = await db
          .collection('Posts')
          .aggregate([
            {
              $search: {
                index: 'posts',
                autocomplete: {
                  query: searchQuery,
                  path: 'comment',
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 3,
                  },
                },
              },
            },
            {
              $limit: limit,
            },
            {
              $project: {
                image: true,
                username: true,
                language: true,
                comment: true,
                likes: true,
                createdAt: true,
              },
            },
          ])
          .toArray();

        res.json({ status: 200, data: posts });
      } catch (error) {
        res.json({ status: 404 });
      }

      break;
  }
};

export default handler;
