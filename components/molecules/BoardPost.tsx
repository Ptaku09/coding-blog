import Image from 'next/image';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Post } from '../../pages/board';
import Link from 'next/link';
import Buttons from '../atoms/postButtons/Buttons';
import Hashtag from '../atoms/Hashtag';

const BoardPost = ({ postData }: { postData: Post }) => {
  const [themeMode, setThemeMode] = useState<string>('dark');
  const [likes, setLikes] = useState<number>(0);
  const { theme } = useTheme();

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
    <div className="w-screen h-auto bg-white dark:bg-dark dark:text-white dark:border-dark border-b-[1px] text-black flex flex-col items-start justify-between px-4 pt-4 animate-appearing-short overflow-hidden">
      <div className="w-full border-b-[1px] dark:border-dark z-[1] bg-inherit outline-none">
        <div className="flex flex-row items-center justify-between font-raleway font-bold">
          <div className="flex flex-row items-center gap-3">
            <Link href={`/users/${postData.userId}`}>
              <a className="flex flex-row items-center gap-3">
                <div className="w-9 h-9 rounded-full border-[1px] border-white dark:border-dark overflow-hidden">
                  <Image src={postData.image || defaultAvatar} width={45} height={45} objectFit="cover" alt="avatar" />
                </div>
                <p>{postData.username}</p>
              </a>
            </Link>
            <Hashtag text={postData.language} />
          </div>
          <p>{new Date(postData.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
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
      <Buttons postData={{ ...postData, likes }} />
    </div>
  );
};

export default BoardPost;
