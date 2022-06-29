import useScroll, { ScrollDirection } from '../../hooks/useScroll';
import LogoWhite from '../../public/icons/logo-white.svg';
import Logout from '../../public/icons/logout.svg';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const BoardMobileHeader = () => {
  const { scrollDirection, scrollPosition } = useScroll();

  return (
    <div
      className={`bg-black fixed top-0 flex flex-row items-center justify-between px-5 w-screen transform duration-300 h-12 ${
        scrollDirection === ScrollDirection.UP || scrollPosition <= 20 ? 'translate-y-0' : '-translate-y-12'
      }`}
    >
      <Link href="/">
        <a>
          <Image src={LogoWhite} width={25} height={25} alt="white logo" />
        </a>
      </Link>
      <p className="text-white font-bebas text-2xl">CODING BLOG</p>
      <button onClick={() => signOut()}>
        <Image src={Logout} width={25} height={25} alt="logout" />
      </button>
    </div>
  );
};

export default BoardMobileHeader;
