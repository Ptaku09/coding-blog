import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../mongodb';
import { ObjectId } from 'bson';
import { OperationType } from '../../../lib/enums';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_USER_NAME);

  switch (req.method) {
    case 'GET':
      if (userId.length !== 24) {
        return res.json({ status: 204, data: null });
      }

      const user = await db.collection('users').findOne({ _id: new ObjectId(userId as string) });

      user ? res.json({ status: 200, data: user }) : res.json({ status: 204, data: null });
      break;

    case 'PATCH':
      const { likedPostId, bookmarkedPostId, type } = req.body;
      let updatedUser;

      if (userId.length !== 24) {
        return res.json({ status: 204 });
      }

      updatedUser = await db.collection('users');

      if (likedPostId && !bookmarkedPostId) {
        switch (type) {
          case OperationType.ADD:
            updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(userId as string) }, { $addToSet: { likedPosts: likedPostId } });
            break;

          case OperationType.REMOVE:
            updatedUser = await updatedUser.findOneAndUpdate({ _id: new ObjectId(userId as string) }, { $pull: { likedPosts: likedPostId } });
            break;
        }
      } else if (!likedPostId && bookmarkedPostId) {
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
      }

      updatedUser ? res.json({ status: 200 }) : res.json({ status: 204 });
      break;
  }
};

export default handler;
