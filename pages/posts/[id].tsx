import { Post } from '../board';
import { getSession, GetSessionParams } from 'next-auth/react';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import AddPostMobileLayout from '../../components/templates/AddPostMobileLayout';
import { NextPageWithLayout } from '../_app';
import ErrorBlack from '../../public/icons/error-black.svg';
import ErrorWhite from '../../public/icons/error-white.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Post: NextPageWithLayout = () => {
  const [postData, setPostData] = useState({} as Post);
  const [isWrongId, setIsWrongId] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`/api/posts/${router.query.id}`)
      .then((r: Response) => r.json())
      .then(({ status, data: post }) => (status === 200 ? setPostData(post) : setIsWrongId(true)));
  }, [router.query.id]);

  return (
    <div className="w-screen h-screen bg-white dark:bg-dark flex items-center justify-center font-raleway text-xl">
      {isWrongId ? (
        <div className="flex items-center justify-center flex-col gap-4">
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
      ) : null}
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
