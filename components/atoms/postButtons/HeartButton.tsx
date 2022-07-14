import Image from 'next/image';
import HeartRed from '../../../public/icons/heart-red.svg';
import HeartGray from '../../../public/icons/heart-gray.svg';
import { useEffect, useLayoutEffect, useState } from 'react';
import StatusMessage, { StatusMessageOrientation, StatusMessageType } from '../StatusMessage';
import { useSession } from 'next-auth/react';
import { OperationType } from '../../../lib/enums';

const HeartButton = ({ postId, postLikes, size = 18 }: { postId: string; postLikes: number; size?: number }) => {
  const { data: session } = useSession({ required: true });
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(postLikes);
  const [isSomethingWrong, setIsSomethingWrong] = useState(false);

  useEffect(() => {
    session && setIsLiked(session?.user.likedPosts.includes(postId));
    setLikeCount(postLikes);
  }, [postId, session, postLikes]);

  // Reload session to update data
  useLayoutEffect(() => {
    reloadSession();
  }, []);

  const reloadSession = () => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };

  const handleAddLike = () => {
    fetch(`/api/posts/${postId}`, {
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
          setLikeCount((prevState: number) => (isLiked ? prevState - 1 : prevState + 1));

          // save current likes count to session storage to avoid data mismatch
          sessionStorage.setItem(`${postId}`, JSON.stringify(isLiked ? likeCount - 1 : likeCount + 1));
        }
      });

    fetch(`/api/users/${session?.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likedPostId: postId,
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
      <button onClick={handleAddLike} className="flex items-center justify-center">
        {isLiked ? (
          <Image src={HeartRed} width={size} height={size} alt="checked heart" />
        ) : (
          <Image src={HeartGray} width={size} height={size} alt="unchecked heart" />
        )}
      </button>
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
