import { NextPageWithLayout } from '../_app';
import DefaultMobileLayout from '../../components/templates/DefaultMobileLayout';
import React, { ReactElement, useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { server } from '../../config';
import NotFoundPage from '../../components/organisms/NotFoundPage';
import Image from 'next/image';
import { Post } from '../board';
import GoToTopLayout from '../../components/templates/GoToTopLayout';
import ArrowLeftBlack from '../../public/icons/arrow-left-black.svg';
import EditBlack from '../../public/icons/edit-black.svg';
import { useRouter } from 'next/router';
import UserPost from '../../components/molecules/UserPost';

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  motto: string;
  bio: string;
  createdAt: string;
  likedPosts: string[];
  bookmarkedPosts: string[];
  createdPosts: string[];
};

const User: ({ userData }: { userData: User }) => JSX.Element = ({ userData }: { userData: User }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    userData &&
      fetch(`/api/created/${userData._id}`)
        .then((res: Response) => res.json())
        .then(({ data: posts }: { data: Post[] }) => setPosts(posts));
  }, [userData]);

  return (
    <div className="w-screen h-auto min-h-screen pb-12 bg-white dark:bg-dark-user">
      {userData ? (
        <>
          <section className="flex flex-col items-start justify-start">
            <div className="w-screen h-56 relative">
              <a
                onClick={() => router.back()}
                className="absolute z-[1] left-2 top-14 w-8 h-8 bg-white flex items-center justify-center shadow-lg rounded-xl"
              >
                <Image src={ArrowLeftBlack} width={19} height={19} alt="go back" />
              </a>
              {session?.user.id === userData._id && (
                <button className="absolute z-[1] right-2 top-14 w-8 h-8 bg-white flex items-center justify-center shadow-lg rounded-xl">
                  <Image src={EditBlack} width={19} height={19} alt="edit" />
                </button>
              )}
              <Image src="/images/background2.jpg" layout="fill" objectFit="cover" alt="background" priority />
            </div>
            <div className="w-screen h-auto px-5 bg-white dark:bg-dark-user -translate-y-4 rounded-t-xl">
              <div className="w-32 h-32 relative -translate-y-16 rounded-full border-4 border-white dark:border-dark-user overflow-hidden">
                <Image src={userData.image} objectFit="cover" layout="fill" alt="avatar" />
              </div>
              <div className="pb-8 -translate-y-12 flex items-start justify-start flex-col font-raleway border-b-[1px] dark:border-gray-600">
                <h2 className="font-bebas text-4xl">{userData.username}</h2>
                <h6 className="font-albert text-xs text-purple-600">{userData.name.toUpperCase()}</h6>
                <p className="text-sm">{new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <div className="mt-6">
                  <h3 className="text-2xl font-[500]">{userData.motto || `${userData.username} has no motto yet!`}</h3>
                  <p className="mt-1 text-gray-500">{userData.bio || `${userData.username} has no bio yet!`}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="px-5 -mt-5 font-raleway">
            <h3 className="mb-3 text-xl font-bold">Posts</h3>
            {posts.length > 0 ? (
              posts.map((post: Post) => <UserPost key={post._id} postData={post} />)
            ) : (
              <p className="mt-2 text-gray-500">{userData.username} has not posted yet!</p>
            )}
          </section>
        </>
      ) : (
        <NotFoundPage title="User not found" subtitle="Check user id" />
      )}
    </div>
  );
};

(User as NextPageWithLayout).getLayout = (page: ReactElement) => {
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

  const userRequest = await fetch(`${server}/api/users/${context.query.id}`);
  const { data: userData } = await userRequest.json();

  return {
    props: {
      userData,
    },
  };
};

export default User;
