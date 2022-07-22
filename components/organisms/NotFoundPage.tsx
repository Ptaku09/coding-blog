import Image from 'next/image';
import ErrorBlack from '../../public/icons/error-black.svg';
import ErrorWhite from '../../public/icons/error-white.svg';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const NotFoundPage = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const { theme } = useTheme();

  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center flex-col gap-4 text-xl font-raleway">
      <p className="text-3xl">{title.toUpperCase()}</p>
      {theme === 'light' ? (
        <Image src={ErrorBlack} width={70} height={70} alt="error" />
      ) : (
        <Image src={ErrorWhite} width={70} height={70} alt="error" />
      )}
      <p className="text-lg">{subtitle} or...</p>
      <Link href="/">
        <a className="bg-purple-600 w-44 text-center py-3 shadow-lg text-white font-bebas rounded-xl">Go to main page</a>
      </Link>
      <Link href="/board">
        <a className="bg-purple-600 w-44 text-center py-3 shadow-lg text-white font-bebas rounded-xl">Go to board</a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
