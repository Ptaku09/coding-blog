import Image from 'next/image';
import BookmarkEmptyWhite from '../../../public/icons/bookmark-empty-white.svg';
import BookmarkEmptyBlack from '../../../public/icons/bookmark-empty-black.svg';
import BookmarkFilledBlack from '../../../public/icons/bookmark-filled-black.svg';
import BookmarkFilledWhite from '../../../public/icons/bookmark-filled-white.svg';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import StatusMessage, { StatusMessageOrientation, StatusMessageType } from '../StatusMessage';
import { OperationType } from '../../../lib/enums';

const BookmarkButton = ({ postId, size = 18 }: { postId: string; size?: number }) => {
  const { theme } = useTheme();
  const { data: session } = useSession({ required: true });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSomethingWrong, setIsSomethingWrong] = useState(false);

  useEffect(() => {
    session && setIsBookmarked(session?.user.bookmarkedPosts.includes(postId));
  }, [postId, session]);

  const handleAddBookmark = () => {
    fetch(`/api/users/${session?.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookmarkedPostId: postId,
        type: isBookmarked ? OperationType.REMOVE : OperationType.ADD,
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
          setIsBookmarked((prevState) => !prevState);
        }
      });
  };

  return (
    <>
      <button onClick={handleAddBookmark} className="flex items-center justify-center">
        {theme === 'dark' ? (
          isBookmarked ? (
            <Image src={BookmarkFilledWhite} width={size} height={size} alt="share" />
          ) : (
            <Image src={BookmarkEmptyWhite} width={size} height={size} alt="share" />
          )
        ) : isBookmarked ? (
          <Image src={BookmarkFilledBlack} width={size} height={size} alt="share" />
        ) : (
          <Image src={BookmarkEmptyBlack} width={size} height={size} alt="share" />
        )}
      </button>
      <StatusMessage
        isShown={isSomethingWrong}
        orientation={StatusMessageOrientation.VERTICAL}
        type={StatusMessageType.ERROR}
        message="Something went wrong"
      />
    </>
  );
};

export default BookmarkButton;
