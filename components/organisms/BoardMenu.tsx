import Image from 'next/image';
import LogoGray from '../../public/icons/logo-gray.svg';
import SearchGray from '../../public/icons/search-gray.svg';
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

const BoardMenu = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const handleChangeColorMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <div className="w-full h-screen flex justify-end">
      <div className="fixed w-72 h-full p-4 pb-24">
        <div className="flex items-center justify-center gap-3 font-raleway font-bold">
          <Image src={LogoGray} width={35} height={35} alt="blue logo" />
          <p className="text-2xl text-gray-500 dark:text-gray-300">coding blog</p>
        </div>
        <div className="mt-12 h-full flex justify-between flex-col font-raleway font-[500] text-lg text-gray-500 dark:text-gray-300">
          <ul className="space-y-4">
            <li>
              <Link href="/bookmarks">
                <a className="p-2 flex items-center gap-3 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-zinc-700 dark:hover:bg-zinc-700 w-full">
                  <Image src={BookmarksGray} width={25} height={25} alt="bookmarks gray" />
                  <p>Bookmarks</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/search">
                <a className="p-2 flex items-center gap-3 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-zinc-700 w-full">
                  <Image src={SearchGray} width={25} height={25} alt="search gray" />
                  <p>Search</p>
                </a>
              </Link>
            </li>
            <li>
              <button
                onClick={handleChangeColorMode}
                className="p-2 flex items-center gap-3 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-zinc-700 w-full"
              >
                {theme === 'light' ? (
                  <Image src={darkMode} width={25} height={25} alt="go to top" />
                ) : (
                  <Image src={lightMode} width={25} height={25} alt="go to top" />
                )}
                <p>Toggle theme</p>
              </button>
            </li>
            <li>
              <Link href="/addPost">
                <a className="py-2 flex items-center justify-center gap-3 bg-purple-600 transition-all duration-500 hover:bg-purple-500 rounded-full">
                  <Image src={NewPostWhite} width={20} height={20} alt="new post white" />
                  <p className="text-white">Add post</p>
                </a>
              </Link>
            </li>
          </ul>
          <div>
            <ul className="space-y-4">
              <li>
                <Link href={`/users/${session?.user.id}`}>
                  <a className="p-2 flex items-center gap-3 transition-all duration-500 hover:bg-gray-200 dark:hover:bg-zinc-700 w-full">
                    <div className="relative w-10 h-10 rounded-full border-[1px] border-white dark:border-gray-500 overflow-hidden">
                      <Image src={session?.user.image || defaultAvatar} layout="fill" objectFit="cover" alt="avatar" />
                    </div>
                    <p>{session?.user.username}</p>
                  </a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="p-2 flex items-center gap-3 transition-all duration-500 hover:bg-red-200 dark:hover:bg-rose-700 w-full"
                >
                  <Image src={Logout} width={25} height={25} alt="logout" />
                  <p>Logout</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardMenu;
