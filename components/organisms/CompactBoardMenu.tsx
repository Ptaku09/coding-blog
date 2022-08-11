import Image from 'next/image';
import LogoGray from '../../public/icons/logo-gray.svg';
import SearchGray from '../../public/icons/search-gray.svg';
import BoardGray from '../../public/icons/board-gray.svg';
import BookmarksGray from '../../public/icons/bookmarks-gray.svg';
import NewPostWhite from '../../public/icons/new-post-white.svg';
import Link from 'next/link';
import darkMode from '../../public/icons/dark-mode-gray.svg';
import lightMode from '../../public/icons/light-mode-gray.svg';
import { useTheme } from 'next-themes';
import { signOut, useSession } from 'next-auth/react';
import Logout from '../../public/icons/logout-gray.svg';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import React from 'react';
import usePathDetector from '../../hooks/usePathDetector';
import { PathNames } from '../../lib/enums';

const CompactBoardMenu = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const { currentPathName } = usePathDetector();

  const handleChangeColorMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="fixed w-20 h-full pt-4 px-2 pb-24">
        <div className="flex items-center justify-center gap-3 font-raleway font-bold">
          <Image src={LogoGray} width={35} height={35} alt="blue logo" />
        </div>
        <div className="mt-12 h-full flex justify-between flex-col font-raleway font-[500] text-lg text-gray-500 dark:text-gray-300">
          <ul className="space-y-4">
            <li>
              <Link href="/board">
                <a
                  className={`p-2 flex items-center justify-center justify-center gap-3 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-zinc-700 ${
                    currentPathName === PathNames.board && 'bg-gray-200 dark:bg-zinc-700'
                  }`}
                >
                  <Image src={BoardGray} width={25} height={25} alt="board gray" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks">
                <a
                  className={`p-2 flex items-center justify-center justify-center gap-3 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-zinc-700 ${
                    currentPathName === PathNames.bookmarks && 'bg-gray-200 dark:bg-zinc-700'
                  }`}
                >
                  <Image src={BookmarksGray} width={25} height={25} alt="bookmarks gray" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/search">
                <a
                  className={`p-2 flex items-center justify-center gap-3 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-zinc-700 ${
                    currentPathName === PathNames.search && 'bg-gray-200 dark:bg-zinc-700'
                  }`}
                >
                  <Image src={SearchGray} width={25} height={25} alt="search gray" />
                </a>
              </Link>
            </li>
            <li>
              <button
                onClick={handleChangeColorMode}
                className="w-full p-2 flex items-center justify-center gap-3 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-zinc-700"
              >
                {theme === 'light' ? (
                  <Image src={darkMode} width={25} height={25} alt="go to top" />
                ) : (
                  <Image src={lightMode} width={25} height={25} alt="go to top" />
                )}
              </button>
            </li>
            <li>
              <Link href="/addPost">
                <a
                  className={`py-2 flex items-center justify-center gap-3 bg-purple-600 transition-all duration-500 hover:bg-purple-500 rounded-full ${
                    currentPathName === PathNames.addPost && 'bg-purple-500'
                  }`}
                >
                  <Image src={NewPostWhite} width={20} height={20} alt="new post white" />
                </a>
              </Link>
            </li>
          </ul>
          <div>
            <ul className="space-y-4">
              <li>
                <Link href={`/users/${session?.user.id}`}>
                  <a
                    className={`p-2 flex items-center justify-center gap-3 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-zinc-700 ${
                      currentPathName === PathNames.user && 'bg-gray-200 dark:bg-zinc-700'
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-full border-[1px] border-white dark:border-gray-500 overflow-hidden">
                      <Image src={session?.user.image || defaultAvatar} layout="fill" objectFit="cover" alt="avatar" />
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="w-full p-2 flex items-center justify-center gap-3 transition-all duration-500 hover:bg-red-200 dark:hover:bg-rose-700"
                >
                  <Image src={Logout} width={25} height={25} alt="logout" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactBoardMenu;
