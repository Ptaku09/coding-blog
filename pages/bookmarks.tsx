import { getSession, GetSessionParams, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from './_app';
import React, { ReactElement, useLayoutEffect } from 'react';
import DefaultMobileLayout from '../components/templates/DefaultMobileLayout';
import Link from 'next/link';

const Bookmarks: NextPageWithLayout = () => {
  const { data: session } = useSession();

  // Reload session to update data
  useLayoutEffect(() => {
    reloadSession();
  }, []);

  const reloadSession = () => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };

  return (
    <div className="w-screen min-h-screen h-auto py-12 bg-white dark:bg-dark font-raleway flex items-center justify-center flex-col">
      {session?.user.bookmarkedPosts.length === 0 ? (
        <div className="w-full flex items-center justify-center flex-col gap-1">
          <p className="text-xl font-raleway">You have no bookmarked posts</p>
          <p>
            go to{' '}
            <span>
              <Link href="/board">
                <a className="text-purple-600 dark:text-purple-500">board</a>
              </Link>
            </span>{' '}
            and find some
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-edu-sa mt-6 underline">Your bookmarks</h1>
          <p>Total: {session?.user.bookmarkedPosts.length}</p>
        </>
      )}
    </div>
  );
};

Bookmarks.getLayout = (page: ReactElement) => {
  return <DefaultMobileLayout>{page}</DefaultMobileLayout>;
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

export default Bookmarks;
