import Image from 'next/image';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import { useSession } from 'next-auth/react';
import ColorModeToggle from '../atoms/ColorModeToggle';
import Search from '../../public/icons/search.svg';
import Bookmarks from '../../public/icons/bookmarks.svg';
import Link from 'next/link';

const MobileFooter = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed z-20 bottom-0 w-screen h-12 pb-2 flex flex-row items-center justify-around bg-black bg-opacity-90">
      <Link href={`/users/${session?.user.id}`}>
        <a className="w-7 h-7 rounded-full border-[1px] border-white overflow-hidden">
          <Image
            src={session?.user?.image || defaultAvatar}
            height={45}
            width={45}
            objectFit="contain"
            alt={session?.user?.image || 'default photo'}
          />
        </a>
      </Link>
      <Link href="/search">
        <a className="flex items-center justify-center">
          <Image src={Search} width={25} height={25} alt="search" />
        </a>
      </Link>
      <Link href="/bookmarks">
        <a className="flex items-center justify-center">
          <Image src={Bookmarks} width={25} height={25} alt="bookmarks" />
        </a>
      </Link>
      <ColorModeToggle />
    </div>
  );
};

export default MobileFooter;
