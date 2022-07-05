import Image from 'next/image';
import ShareWhite from '../../public/icons/share-white.svg';
import ShareBlack from '../../public/icons/share-black.svg';
import { useTheme } from 'next-themes';

const ShareButton = () => {
  const { theme } = useTheme();

  return (
    <>
      {theme === 'dark' ? (
        <Image src={ShareWhite} width={18} height={18} alt="share" />
      ) : (
        <Image src={ShareBlack} width={18} height={18} alt="share" />
      )}
    </>
  );
};

export default ShareButton;
