import Image from 'next/image';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Post } from '../../pages/board';
import CopyButton from '../atoms/postButtons/CopyButton';
import ShareButton from '../atoms/postButtons/ShareButton';
import BookmarkButton from '../atoms/postButtons/BookmarkButton';
import HeartButton from '../atoms/postButtons/HeartButton';
import Link from 'next/link';

const BoardPost = ({ postData }: { postData: Post }) => {
  const [themeMode, setThemeMode] = useState<string>('dark');
  const [isShareButtonClicked, setIsShareButtonClicked] = useState<boolean>(false);
  const { theme } = useTheme();

  //omit hydration effect
  useEffect(() => {
    setThemeMode(theme || 'dark');
  }, [theme]);

  return (
    <div className="w-screen h-auto bg-white dark:bg-dark dark:text-white dark:border-dark border-b-[1px] text-black flex flex-col items-start justify-between px-4 pt-4 animate-appearing-short overflow-hidden">
      <div className="w-full border-b-[1px] dark:border-dark z-[1] bg-inherit outline-none">
        <div className="flex flex-row items-center gap-3 font-raleway font-bold">
          <div className="w-9 h-9 rounded-full border-[1px] border-white overflow-hidden">
            <Image src={postData.image || defaultAvatar} width={45} height={45} objectFit="cover" alt="avatar" />
          </div>
          <p>{postData.username}</p>
          <p className="bg-purple-300 px-3 py-0.5 rounded-xl shadow-md text-sm dark:text-[#0e172a]">#{postData.language}</p>
        </div>
        <Link href={`/posts/${postData._id}`}>
          <a>
            <div className="py-2 font-raleway border-b-[1px] dark:border-dark mb-2">
              <p>{postData.comment}</p>
            </div>
            <SyntaxHighlighter
              language={postData.language}
              showLineNumbers={true}
              wrapLines={true}
              style={themeMode === 'dark' ? materialDark : materialLight}
              customStyle={{ maxHeight: '450px' }}
            >
              {postData.code}
            </SyntaxHighlighter>
          </a>
        </Link>
      </div>
      <div className="w-full my-6 grid grid-cols-[1fr_2fr]">
        <HeartButton postId={postData._id} postLikes={postData.likes} />
        <div
          className={`relative flex items-center justify-around animate-appearing-short duration-500 ease-in-out
           ${isShareButtonClicked ? 'top-56' : 'top-0'}`}
        >
          <ShareButton updateParentState={setIsShareButtonClicked} postId={postData._id} />
          <BookmarkButton postId={postData._id} />
          <CopyButton text={postData.code} />
        </div>
      </div>
    </div>
  );
};

export default BoardPost;
