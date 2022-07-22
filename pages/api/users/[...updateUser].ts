import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { ObjectId } from 'bson';
import { RequestOperationType, UpdateUserEndpoint } from '../../../lib/enums';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_USER_NAME);
  const { updateUser: query } = req.query;

  // api/users/[query[0]]/[query[1]]
  // query[0] - userId
  // query[1] - endpoint

  if (query.length > 2) {
    return res.json({ status: 414, data: `Too long URI. Expected: 2, provided: ${query.length}.` });
  }

  if (query[0].length !== 24) {
    return res.json({ status: 404 });
  }

  const { type } = req.body;
  let updatedUser;
  updatedUser = await db.collection('users');

  switch (query[1] as UpdateUserEndpoint) {
    case UpdateUserEndpoint.likedPosts:
      const { likedPostId } = req.body;

      switch (type) {
        case RequestOperationType.ADD:
          updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(query[0] as string) }, { $addToSet: { likedPosts: likedPostId } });
          break;

        case RequestOperationType.REMOVE:
          updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(query[0] as string) }, { $pull: { likedPosts: likedPostId } });
          break;
      }

      break;

    case UpdateUserEndpoint.bookmarkedPosts:
      const { bookmarkedPostId } = req.body;

      switch (type) {
        case RequestOperationType.ADD:
          updatedUser = await updatedUser.findOneAndUpdate(
            { _id: new ObjectId(query[0] as string) },
            {
              $addToSet: {
                bookmarkedPosts: {
                  bookmarkedPostId: bookmarkedPostId,
                  addedAt: new Date().toUTCString(),
                } as any,
              },
            }
          );
          break;

        case RequestOperationType.REMOVE:
          updatedUser = await updatedUser.findOneAndUpdate(
            { _id: new ObjectId(query[0] as string) },
            { $pull: { bookmarkedPosts: { bookmarkedPostId: bookmarkedPostId } as any } }
          );
          break;
      }

      break;

    case UpdateUserEndpoint.createdPosts:
      const { createdPostId } = req.body;

      switch (type) {
        case RequestOperationType.ADD:
          updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(query[0] as string) }, { $addToSet: { createdPosts: createdPostId } });
          break;

        case RequestOperationType.REMOVE:
          updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(query[0] as string) }, { $pull: { createdPosts: createdPostId } });
          break;
      }

      break;

    default:
      return res.json({ status: 400, data: `Endpoint not found: /${query[1]}` });
  }

  updatedUser ? res.json({ status: 200 }) : res.json({ status: 404 });
};

export default handler;
