import Image from 'next/image';
import ShareWhite from '../../../public/icons/share-white.svg';
import ShareBlack from '../../../public/icons/share-black.svg';
import AlignTopWhite from '../../../public/icons/align-top-white.svg';
import AlignTopBlack from '../../../public/icons/align-top-black.svg';
import { useTheme } from 'next-themes';
import { Dispatch, SetStateAction } from 'react';
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { server } from '../../../config';

const ShareButton = ({
  updateParentState,
  postId,
  size = 18,
}: {
  updateParentState: Dispatch<SetStateAction<boolean>>;
  postId: string;
  size?: number;
}) => {
  const { theme } = useTheme();

  return (
    <>
      <button onClick={() => updateParentState((prevState: boolean) => !prevState)} className="flex items-center justify-center">
        {theme === 'dark' ? (
          <Image src={ShareWhite} width={size} height={size} alt="share" />
        ) : (
          <Image src={ShareBlack} width={size} height={size} alt="share" />
        )}
      </button>
      <div className="w-full h-full absolute -top-56 z-0 flex items-center justify-around">
        <button onClick={() => updateParentState((prevState: boolean) => !prevState)} className="flex items-center justify-center animate-bounce">
          {theme === 'dark' ? (
            <Image src={AlignTopWhite} width={size + 5} height={size + 5} alt="close" />
          ) : (
            <Image src={AlignTopBlack} width={size + 5} height={size + 5} alt="close" />
          )}
        </button>
        <FacebookShareButton url={`${server}/${postId}`}>
          <FacebookIcon className="rounded-full border-2 border-white" size={30} />
        </FacebookShareButton>
        <TwitterShareButton url={`${server}/${postId}`}>
          <TwitterIcon className="rounded-full border-white border-2" size={30} />
        </TwitterShareButton>
        <FacebookMessengerShareButton url={`${server}/${postId}`} appId={process.env.FACEBOOK_APP_ID as string}>
          <FacebookMessengerIcon className="rounded-full border-white border-2" size={30} />
        </FacebookMessengerShareButton>
      </div>
    </>
  );
};

export default ShareButton;
