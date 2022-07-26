import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { ObjectId } from 'bson';
import { UpdatePostEndpoint } from '../../../lib/enums';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_POST_NAME);
  const { updatePost: query } = req.query;

  // api/users/[query[0]]/[query[1]]
  // query[0] - postId
  // query[1] - endpoint

  if (query.length > 2) {
    return res.json({ status: 414, data: `Too long URI. Expected: 2, provided: ${query.length}.` });
  }

  if (query[0].length !== 24) {
    return res.json({ status: 404 });
  }

  let updatedPost;
  updatedPost = await db.collection('Posts');

  switch (query[1] as UpdatePostEndpoint) {
    case UpdatePostEndpoint.backgroundImage:
      const { backgroundImage } = req.body;

      updatedPost = await updatedPost.findOneAndUpdate({ _id: new ObjectId(query[0] as string) }, { $set: { backgroundImage } });

      break;

    case UpdatePostEndpoint.comment:
      const { comment } = req.body;

      updatedPost = await updatedPost.findOneAndUpdate({ _id: new ObjectId(query[0] as string) }, { $set: { comment } });

      break;

    case UpdatePostEndpoint.hashtags:
      const { hashtags } = req.body;

      updatedPost = await updatedPost.findOneAndUpdate({ _id: new ObjectId(query[0] as string) }, { $set: { hashtags } });

      break;

    default:
      return res.json({ status: 400, data: `Endpoint not found: /${query[1]}` });
  }

  updatedPost ? res.json({ status: 200 }) : res.json({ status: 404 });
};

export default handler;
