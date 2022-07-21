import { Post } from '../board';
import { getSession } from 'next-auth/react';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import DefaultMobileLayout from '../../components/templates/DefaultMobileLayout';
import { NextPageWithLayout } from '../_app';
import ErrorBlack from '../../public/icons/error-black.svg';
import ErrorWhite from '../../public/icons/error-white.svg';
import ReturnWhite from '../../public/icons/return-white.svg';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Buttons from '../../components/atoms/postButtons/Buttons';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Hashtag from '../../components/atoms/Hashtag';

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
    <div className="bg-white dark:bg-dark py-16">
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
        <div className="w-screen min-h-screen h-auto px-4">
          <div className="w-full flex items-center justify-between border-b-[1px] border-b-gray-300 pb-2">
            <p className="text-gray-400 text-sm tracking-wide select-all font-raleway">{postData._id}</p>
            <a onClick={() => router.back()} className="bg-purple-600 flex items-center justify-center px-3 py-0.5 shadow-lg rounded-xl">
              <Image src={ReturnWhite} width={26} height={26} alt="avatar" />
            </a>
          </div>
          <div className="border-b-[1px] border-b-gray-300 flex items-center justify-between font-raleway">
            <div className="flex flex-row items-center gap-3 font-raleway font-bold my-2">
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                <Image src={postData.image || defaultAvatar} width={60} height={60} objectFit="cover" alt="avatar" />
              </div>
              <p>{postData.username}</p>
            </div>
            <div className="flex flex-row justify-center gap-2">
              <p>{new Date(postData.createdAt).toLocaleTimeString().slice(0, 5)}</p>
              <span>|</span>
              <p>{new Date(postData.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
            </div>
          </div>
          <div className="relative flex items-start border-b-[1px] border-b-gray-300 font-raleway">
            <p className="mb-28 mt-4">{postData.comment}</p>
            <div className="absolute bottom-2 text-sm flex flex-row flex-wrap gap-2">
              <Hashtag text={postData.language} />
              {postData.hashtags && postData.hashtags.map((text: string) => <Hashtag key={text} text={text} />)}
            </div>
          </div>
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
          <Link href="/board" scroll={false}>
            <a className="bg-purple-600 flex items-center justify-center gap-2 px-3 py-2 mt-4 shadow-lg rounded-xl text-white text-xl font-edu-sa">
              Return to board
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

Post.getLayout = (page: ReactElement) => {
  return <DefaultMobileLayout>{page}</DefaultMobileLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
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
