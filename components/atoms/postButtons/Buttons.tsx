import HeartButton from './HeartButton';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';
import CopyButton from './CopyButton';
import { Post } from '../../../pages/board';
import { useState } from 'react';

const Buttons = ({ postData }: { postData: Post }) => {
  const [isShareButtonClicked, setIsShareButtonClicked] = useState<boolean>(false);

  return (
    <div className="w-full my-6 grid grid-cols-[1fr_2fr]">
      <HeartButton postId={postData._id} postLikes={postData.likes} />
      <div
        className={`relative flex items-center justify-around animate-appearing-short duration-500 ease-in-out
           ${isShareButtonClicked ? 'top-56' : 'top-0'}`}
      >
        <ShareButton updateParentState={setIsShareButtonClicked} postId={postData._id} />
        <BookmarkButton postId={postData._id} />
        <CopyButton text={postData.code} />
      </div>
    </div>
  );
};

export default Buttons;
