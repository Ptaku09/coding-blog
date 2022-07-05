import Image from 'next/image';
import BookmarkFilledWhite from '../../public/icons/bookmark-filled-white.svg';
import BookmarkEmptyWhite from '../../public/icons/bookmark-empty-white.svg';
import BookmarkEmptyBlack from '../../public/icons/bookmark-empty-black.svg';
import BookmarkFilledBlack from '../../public/icons/bookmark-filled-black.svg';
import { useTheme } from 'next-themes';

const BookmarkButton = ({ isBookmarked, size = 18, onClick }: { isBookmarked: boolean; size?: number; onClick: () => null }) => {
  const { theme } = useTheme();

  return (
    <>
      {theme === 'dark' ? (
        isBookmarked ? (
          <Image onClick={onClick} src={BookmarkFilledWhite} width={size} height={size} alt="share" />
        ) : (
          <Image onClick={onClick} src={BookmarkEmptyWhite} width={size} height={size} alt="share" />
        )
      ) : isBookmarked ? (
        <Image onClick={onClick} src={BookmarkFilledBlack} width={size} height={size} alt="share" />
      ) : (
        <Image onClick={onClick} src={BookmarkEmptyBlack} width={size} height={size} alt="share" />
      )}
    </>
  );
};

export default BookmarkButton;
