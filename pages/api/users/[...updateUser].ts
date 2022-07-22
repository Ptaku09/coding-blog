import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { ObjectId } from 'bson';
import { OperationType, UpdateUserEndpoint } from '../../../lib/enums';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_USER_NAME);

  if (userId.length !== 24) {
    return res.json({ status: 404 });
  }

  const { type } = req.body;
  let updatedUser;
  updatedUser = await db.collection('users');

  switch (req.query[1] as UpdateUserEndpoint) {
    case UpdateUserEndpoint.likedPosts:
      const { likedPostId } = req.body;

      switch (type) {
        case OperationType.ADD:
          updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(userId as string) }, { $addToSet: { likedPosts: likedPostId } });
          break;

        case OperationType.REMOVE:
          updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(userId as string) }, { $pull: { likedPosts: likedPostId } });
          break;
      }

      break;

    case UpdateUserEndpoint.bookmarkedPosts:
      const { bookmarkedPostId } = req.body;

      switch (type) {
        case OperationType.ADD:
          updatedUser = await updatedUser.findOneAndUpdate(
            { _id: new ObjectId(userId as string) },
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

        case OperationType.REMOVE:
          updatedUser = await updatedUser.findOneAndUpdate(
            { _id: new ObjectId(userId as string) },
            { $pull: { bookmarkedPosts: { bookmarkedPostId: bookmarkedPostId } as any } }
          );
          break;
      }

      break;

    case UpdateUserEndpoint.createdPosts:
      const { createdPostId } = req.body;

      switch (type) {
        case OperationType.ADD:
          updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(userId as string) }, { $addToSet: { createdPosts: createdPostId } });
          break;

        case OperationType.REMOVE:
          updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(userId as string) }, { $pull: { createdPosts: createdPostId } });
          break;
      }

      break;

    default:
      return res.json({ status: 400, data: `Endpoint not found: /${req.query[1]}` });
  }

  updatedUser ? res.json({ status: 200 }) : res.json({ status: 404 });
};

export default handler;
