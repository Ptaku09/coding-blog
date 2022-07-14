import { getSession, GetSessionParams, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';
import DefaultMobileLayout from '../components/templates/DefaultMobileLayout';
import Link from 'next/link';
import { Post } from './board';
import { OperationType } from '../lib/enums';
import StatusMessage, { StatusMessageOrientation, StatusMessageType } from '../components/atoms/StatusMessage';
import BookmarkPost from '../components/molecules/BookmarkPost';
import Image from 'next/image';
import ReturnWhite from '../public/icons/return-white.svg';
import { useRouter } from 'next/router';
import GoToTopLayout from '../components/templates/GoToTopLayout';
import { NextPageWithLayout } from './_app';

const Bookmarks: ({ bookmarkedPosts }: { bookmarkedPosts: string[] }) => JSX.Element = ({ bookmarkedPosts }: { bookmarkedPosts: string[] }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSomethingWrong, setIsSomethingWrong] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    bookmarkedPosts.forEach((postId: string) => {
      fetch(`/api/posts/${postId}`)
        .then((r: Response) => r.json())
        .then(({ data: post }) => {
          setPosts((prevState: Post[]) => [post, ...prevState]);
        });
    });
  }, [bookmarkedPosts]);

  const handleRemoveBookmark = (postId: string) => {
    fetch(`/api/users/${session?.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookmarkedPostId: postId,
        type: OperationType.REMOVE,
      }),
    })
      .then((r: Response) => r.json())
      .then(({ status }) => {
        if (status === 204) {
          setIsSomethingWrong(true);

          setTimeout(() => {
            setIsSomethingWrong(false);
          }, 2000);
        } else {
          setPosts((prevState: Post[]) => prevState.filter((post: Post) => post._id !== postId));
        }
      });
  };

  return posts.length === 0 ? (
    <div className="w-screen min-h-screen h-auto py-12 bg-white dark:bg-dark font-raleway flex items-center justify-center flex-col">
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
    </div>
  ) : (
    <div className="w-screen min-h-screen h-auto py-12 bg-white dark:bg-dark font-raleway flex items-center justify-start flex-col gap-2">
      <h1 className="text-4xl font-edu-sa mt-6 underline">Your bookmarks</h1>
      <p>Total: {posts.length}</p>
      <a onClick={() => router.back()} className="bg-purple-600 flex items-center justify-center px-6 py-0.5 shadow-lg rounded-xl">
        <Image src={ReturnWhite} width={26} height={26} alt="avatar" />
      </a>
      <div className="w-11/12">
        {posts.map((post: Post) => (
          <BookmarkPost key={post._id} post={post} handleRemoveBookmark={handleRemoveBookmark} />
        ))}
      </div>
      <StatusMessage
        isShown={isSomethingWrong}
        orientation={StatusMessageOrientation.VERTICAL}
        type={StatusMessageType.ERROR}
        message="Something went wrong"
      />
    </div>
  );
};

(Bookmarks as NextPageWithLayout).getLayout = (page: ReactElement) => {
  return (
    <DefaultMobileLayout>
      <GoToTopLayout>{page}</GoToTopLayout>
    </DefaultMobileLayout>
  );
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
    props: {
      bookmarkedPosts: session.user.bookmarkedPosts,
    },
  };
};

export default Bookmarks;
