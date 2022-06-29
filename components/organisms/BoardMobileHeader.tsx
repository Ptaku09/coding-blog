import useScroll, { ScrollDirection } from '../../hooks/useScroll';
import LogoWhite from '../../public/icons/logo-white.svg';
import Image from 'next/image';
import Link from 'next/link';

const BoardMobileHeader = () => {
  const { scrollDirection, scrollPosition } = useScroll();

  return (
    <div
      className={`bg-black fixed top-0 flex flex-row items-center justify-between text-white px-2 w-screen transform duration-300 h-12 ${
        scrollDirection === ScrollDirection.UP || scrollPosition <= 20 ? 'translate-y-0' : '-translate-y-12'
      }`}
    >
      <Link href="/">
        <a>
          <Image src={LogoWhite} width={25} height={25} alt="white logo" />
        </a>
      </Link>
      <p>CODING BLOG</p>
      <p>logout</p>
    </div>
  );
};

export default BoardMobileHeader;
