import Image from 'next/image';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Post } from '../../pages/board';
import CopyButton from '../atoms/CopyButton';
import ShareButton from '../atoms/ShareButton';
import BookmarkButton from '../atoms/BookmarkButton';
import HeartButton from '../atoms/HeartButton';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const BoardPost = ({ isFavorite = true, postData }: { isFavorite?: boolean; postData: Post }) => {
  const [themeMode, setThemeMode] = useState('dark');
  const { theme } = useTheme();
  const { data: session } = useSession();

  //omit hydration effect
  useEffect(() => {
    setThemeMode(theme || 'dark');
  }, [theme]);

  return (
    <div className="w-screen h-auto bg-white dark:bg-dark dark:text-white dark:border-dark border-b-[1px] text-black flex flex-col items-start justify-between px-4 pt-4 animate-appearing-short">
      <div className="w-full border-b-[1px] dark:border-dark">
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
        <div className="flex items-center justify-around">
          <ShareButton />
          <BookmarkButton postId={postData._id} />
          <CopyButton text={postData.code} />
        </div>
      </div>
    </div>
  );
};

export default BoardPost;
