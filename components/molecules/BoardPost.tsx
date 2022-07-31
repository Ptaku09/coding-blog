import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import { Post } from '../../pages/board';
import Link from 'next/link';
import Buttons from '../atoms/postButtons/Buttons';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import ShiningSlide from '../atoms/ShiningSlide';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';

const BoardPost = ({ postData }: { postData: Post }) => {
  const [themeMode, setThemeMode] = useState<string>('dark');
  const [likes, setLikes] = useState<number>(0);
  const { theme } = useTheme();
  const ref = useRef<HTMLAnchorElement>(null);
  const { isVisible } = useElementOnScreen(ref, {
    root: null,
    rootMargin: '50px 0px',
    threshold: 0,
  });

  // omit hydration effect
  useEffect(() => {
    setThemeMode(theme || 'dark');
  }, [theme]);

  // display correct likes count depending on user interaction
  useEffect(() => {
    const likeCount = sessionStorage.getItem(postData._id);
    if (likeCount) setLikes(parseInt(likeCount));
    else setLikes(postData.likes);
  }, [postData._id, postData.likes]);

  return (
    <div className="w-screen h-auto bg-white dark:bg-dark-user dark:text-white dark:border-gray-500 border-b-[1px] text-black flex flex-col items-start justify-between px-4 pt-4 animate-appearing-short overflow-hidden">
      <div className="w-full border-b-[1px] dark:border-gray-500 z-[1] bg-inherit outline-none">
        <div className="relative w-full flex items-center justify-between text-gray-500 font-albert">
          <div className="flex items-center justify-start gap-5">
            <Link href={`/users/${postData.userId}`}>
              <a className="flex flex-row items-center gap-3">
                <div className="relative w-12 h-12 rounded-full border-[1px] border-white dark:border-gray-500 overflow-hidden">
                  <Image src={postData.image || defaultAvatar} layout="fill" objectFit="cover" alt="avatar" />
                </div>
                <div className="flex items-start justify-center flex-col">
                  <p className="text-xl text-black dark:text-white">{postData.username}</p>
                  <p className="text-xs">{postData.language.toUpperCase()}</p>
                </div>
              </a>
            </Link>
          </div>
          <p className="absolute top-0 right-0 text-sm">
            {new Date(postData.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          </p>
        </div>
        <Link href={`/posts/${postData._id}`}>
          <a ref={ref}>
            <div className="pt-4 pb-2 border-b-[1px] dark:border-gray-500 mb-2">
              <p className="font-raleway font-bold">{postData.comment}</p>
            </div>
            {isVisible || postData.code.split('\n').length < 18 ? (
              <SyntaxHighlighter
                language={postData.language}
                showLineNumbers={true}
                wrapLines={true}
                style={themeMode === 'dark' ? materialDark : materialLight}
                customStyle={{ maxHeight: '450px' }}
              >
                {postData.code}
              </SyntaxHighlighter>
            ) : (
              <div className="w-full h-[450px] mb-2 bg-[#fafafa] dark:bg-[#2f2f2f]">
                <ShiningSlide />
              </div>
            )}
          </a>
        </Link>
      </div>
      <Buttons postData={{ ...postData, likes }} />
    </div>
  );
};

export default BoardPost;
