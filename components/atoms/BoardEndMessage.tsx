import { useTheme } from 'next-themes';
import ArrowsBlack from '../../public/icons/arrows-black.svg';
import ArrowsWhite from '../../public/icons/arrows-white.svg';
import Image from 'next/image';

const BoardEndMessage = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center py-1 relative font-bebas text-2xl text-black dark:text-white">
      <p className="absolute -translate-x-[4.5rem] translate-y-2">Go to top</p>
      {theme === 'dark' ? (
        <Image src={ArrowsWhite} width={60} height={60} alt="arrows" />
      ) : (
        <Image src={ArrowsBlack} width={60} height={60} alt="arrows" />
      )}
      <p className="absolute translate-x-[4.5rem] -translate-y-1.5">Add post</p>
    </div>
  );
};

export default BoardEndMessage;
