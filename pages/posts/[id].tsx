import { Post } from '../board';
import { getSession, GetSessionParams } from 'next-auth/react';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import AddPostMobileLayout from '../../components/templates/AddPostMobileLayout';
import { NextPageWithLayout } from '../_app';
import ErrorBlack from '../../public/icons/error-black.svg';
import ErrorWhite from '../../public/icons/error-white.svg';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Buttons from '../../components/atoms/postButtons/Buttons';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const Post: NextPageWithLayout = () => {
  const [postData, setPostData] = useState({} as Post);
  const [isWrongId, setIsWrongId] = useState(false);
  const [themeMode, setThemeMode] = useState<string>('dark');
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setThemeMode(theme || 'dark');
  }, [theme]);

  useEffect(() => {
    fetch(`/api/posts/${router.query.id}`)
      .then((r: Response) => r.json())
      .then(({ status, data: post }) => (status === 200 ? setPostData(post) : setIsWrongId(true)));
  }, [router.query.id]);

  return (
    <div className="bg-white dark:bg-dark py-12">
      {isWrongId ? (
        <div className="w-full h-screen flex items-center justify-center flex-col gap-4 text-xl font-raleway">
          <p className="text-3xl">{'post not found'.toUpperCase()}</p>
          {theme === 'light' ? (
            <Image src={ErrorBlack} width={70} height={70} alt="error" />
          ) : (
            <Image src={ErrorWhite} width={70} height={70} alt="error" />
          )}
          <p className="text-lg">Check post id or...</p>
          <Link href="/">
            <a className="bg-purple-600 w-44 text-center py-3 shadow-lg text-white font-bebas rounded-xl">Go to main page</a>
          </Link>
          <Link href="/board">
            <a className="bg-purple-600 w-44 text-center py-3 shadow-lg text-white font-bebas rounded-xl">Go to board</a>
          </Link>
        </div>
      ) : (
        <div className="w-screen min-h-screen h-auto px-4 pt-4">
          <p className="text-gray-400 text-sm tracking-wide select-all border-b-[1px] border-b-gray-300 font-raleway">{postData._id}</p>
          <div className="border-b-[1px] border-b-gray-300 flex items-center justify-between font-raleway">
            <div className="flex flex-row items-center gap-3 font-raleway font-bold my-2">
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                <Image src={postData.image || defaultAvatar} width={60} height={60} objectFit="cover" alt="avatar" />
              </div>
              <p>{postData.username}</p>
            </div>
            <p>date: 08.07.2022</p>
          </div>
          <p className="py-12 border-b-[1px] border-b-gray-300 font-raleway">{postData.comment}</p>
          <div className="border-b-[1px] border-b-gray-300 overflow-hidden">
            <Buttons postData={postData} />
          </div>
          <SyntaxHighlighter
            language={postData.language}
            showLineNumbers={true}
            wrapLines={true}
            style={themeMode === 'dark' ? materialDark : materialLight}
          >
            {postData.code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

Post.getLayout = (page: ReactElement) => {
  return <AddPostMobileLayout>{page}</AddPostMobileLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Post;
