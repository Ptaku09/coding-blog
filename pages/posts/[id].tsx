import { Post } from '../board';
import { getSession, useSession } from 'next-auth/react';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import DefaultMobileLayout from '../../components/templates/DefaultMobileLayout';
import { NextPageWithLayout } from '../_app';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Buttons from '../../components/atoms/postButtons/Buttons';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import NotFoundPage from '../../components/organisms/NotFoundPage';
import ArrowLeftBlack from '../../public/icons/arrow-left-black.svg';
import GoToTopLayout from '../../components/templates/GoToTopLayout';
import { server } from '../../config';
import PostMenu from '../../components/organisms/postMenu/PostMenu';
import { PostMenuContext, PostMenuContextProps } from '../../providers/PostMenuProvider';
import { useRouter } from 'next/router';

const Post: ({ postData }: { postData: Post }) => JSX.Element = ({ postData }: { postData: Post }) => {
  const [themeMode, setThemeMode] = useState<string>('dark');
  const { isEditOpen, isDeleteOpen } = useContext<PostMenuContextProps>(PostMenuContext);
  const { data: session } = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setThemeMode(theme || 'dark');
  }, [theme]);

  return (
    <div className={`bg-white dark:bg-dark-user pb-12 ${(isEditOpen || isDeleteOpen) && 'h-screen' + 'overflow-hidden fixed z-30'}`}>
      {postData ? (
        <>
          <div className="w-screen h-56 relative shadow-inner">
            <a
              onClick={() => router.back()}
              className="absolute z-[1] left-2 top-14 w-8 h-8 bg-white flex items-center justify-center shadow-lg rounded-xl"
            >
              <Image src={ArrowLeftBlack} width={19} height={19} alt="go back" />
            </a>
            {session?.user.id === postData.userId && <PostMenu postData={postData} />}
            <div className="absolute bottom-7 z-[1] w-full px-5 py-2 flex items-center justify-between bg-white bg-opacity-80 dark:bg-dark-user dark:bg-opacity-80 shadow-round">
              <div className="flex flex-row items-center gap-3 font-albert font-bold my-2">
                <div className="relative w-14 h-14 rounded-full border-2 border-white dark:border-gray-500 overflow-hidden">
                  <Image src={postData.image} layout="fill" objectFit="cover" alt="avatar" />
                </div>
                <div className="flex items-start justify-center flex-col font-albert">
                  <p className="font-bold text-xl">{postData.username}</p>
                  <div className="flex items-center justify-center flex-row gap-1.5 font-thin text-xs">
                    <p>{new Date(postData.createdAt).toLocaleTimeString('pl-PL', { hour: 'numeric', minute: '2-digit' })}</p>
                    <span className="text-2xl">&#183;</span>
                    <p>{new Date(postData.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                  </div>
                </div>
              </div>
            </div>
            <Image src={`/images/background${postData.backgroundImage || 1}.jpg`} layout="fill" objectFit="cover" alt="background" priority />
          </div>
          <div className="relative -top-4 w-screen min-h-screen h-auto px-4 bg-white dark:bg-dark-user rounded-t-xl">
            <div className="relative flex items-start flex-col border-b-[1px] dark:border-gray-500 font-raleway">
              <p className="min-h-[11rem] h-auto py-4 font-bold">{postData.comment}</p>
              <div className="w-full mb-2 text-sm flex items-center justify-center flex-row flex-wrap gap-2">
                <p className="text-gray-500 font-albert text-sm">{postData.language.charAt(0).toUpperCase() + postData.language.slice(1)}</p>
                {postData.hashtags?.map((text: string) => (
                  <div key={text} className="text-gray-500 font-albert text-sm flex items-center justify-center gap-2">
                    <span className="text-2xl">&#183;</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b-[1px] dark:border-gray-500 overflow-hidden">
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
        </>
      ) : (
        <NotFoundPage title="Post not found" subtitle="Check post id" />
      )}
    </div>
  );
};

(Post as NextPageWithLayout).getLayout = (page: ReactElement) => {
  return (
    <DefaultMobileLayout>
      <GoToTopLayout>{page}</GoToTopLayout>
    </DefaultMobileLayout>
  );
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

  const postRequest = await fetch(`${server}/api/posts/${context.query.id}`);
  const { data: postData } = await postRequest.json();

  return {
    props: {
      postData,
    },
  };
};

export default Post;
