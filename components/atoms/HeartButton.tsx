import Image from 'next/image';
import HeartRed from '../../public/icons/heart-red.svg';
import HeartGray from '../../public/icons/heart-gray.svg';
import { Post } from '../../pages/board';
import { useEffect, useState } from 'react';
import StatusMessage, { StatusMessageOrientation, StatusMessageType } from './StatusMessage';
import { useSession } from 'next-auth/react';
import { OperationType } from '../../lib/enums';

const HeartButton = ({ post, size = 18 }: { post: Post; size?: number }) => {
  const { data: session } = useSession({ required: true });
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isSomethingWrong, setIsSomethingWrong] = useState(false);

  useEffect(() => {
    session && setIsLiked(session?.user.likedPosts.includes(post._id));
  }, [post._id, session]);

  const handleAddLike = () => {
    fetch(`/api/posts/${post._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: isLiked ? likeCount - 1 : likeCount + 1,
      }),
    })
      .then((r: Response) => r.json())
      .then(({ status }) => {
        if (status === 204) {
          setIsSomethingWrong(true);

          setTimeout(() => {
            setIsSomethingWrong(false);
          }, 2000);
        } else {
          setLikeCount((prevState) => (isLiked ? prevState - 1 : prevState + 1));
        }
      });

    fetch(`/api/users/${session?.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likedPostId: post._id,
        type: isLiked ? OperationType.REMOVE : OperationType.ADD,
      }),
    })
      .then((r: Response) => r.json())
      .then(({ status }) => {
        if (status === 204) {
          setIsSomethingWrong(true);

          setTimeout(() => {
            setIsSomethingWrong(false);
          }, 2000);
        } else {
          setIsLiked((prevState: boolean) => !prevState);
        }
      });
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {isLiked ? (
        <Image onClick={handleAddLike} src={HeartRed} width={size} height={size} alt="checked heart" />
      ) : (
        <Image onClick={handleAddLike} src={HeartGray} width={size} height={size} alt="unchecked heart" />
      )}
      <p>{likeCount}</p>
      <StatusMessage
        isShown={isSomethingWrong}
        orientation={StatusMessageOrientation.VERTICAL}
        type={StatusMessageType.ERROR}
        message="Something went wrong"
      />
    </div>
  );
};

export default HeartButton;
