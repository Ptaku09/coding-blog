import { NextPageWithLayout } from '../_app';
import DefaultMobileLayout from '../../components/templates/DefaultMobileLayout';
import React, { ReactElement, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { server } from '../../config';
import NotFoundPage from '../../components/organisms/NotFoundPage';
import Image from 'next/image';
import { Post } from '../board';
import GoToTopLayout from '../../components/templates/GoToTopLayout';
import ReturnWhite from '../../public/icons/return-white.svg';
import { useRouter } from 'next/router';
import UserPost from '../../components/molecules/UserPost';

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
  createdAt: string;
  likedPosts: string[];
  bookmarkedPosts: string[];
  createdPosts: string[];
};

const User: ({ userData }: { userData: User }) => JSX.Element = ({ userData }: { userData: User }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    userData &&
      fetch(`/api/created/${userData._id}`)
        .then((res: Response) => res.json())
        .then(({ data: posts }: { data: Post[] }) => setPosts(posts));
  }, [userData]);

  return (
    <div className="w-screen h-auto min-h-screen py-12 bg-white dark:bg-dark">
      {userData ? (
        <>
          <section className="px-4 py-6 flex flex-col items-start justify-start gap-5">
            <div className="relative w-full flex items-center justify-start gap-5">
              <div className="flex items-center justify-center border-4 border-purple-300">
                <Image src={userData.image} height={100} width={100} alt="profile pic" />
              </div>
              <div className="flex items-start justify-start flex-col font-raleway">
                <h3 className="font-bebas text-5xl">{userData.username}</h3>
                <h4 className="text-lg">{userData.name}</h4>
                <p className="text-sm">{new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
              <a
                onClick={() => router.back()}
                className="absolute right-0 top-0 bg-purple-600 flex items-center justify-center px-3 py-0.5 shadow-lg rounded-xl"
              >
                <Image src={ReturnWhite} width={26} height={26} alt="avatar" />
              </a>
            </div>
            <div className="p-2 border-[1px] border-purple-300 w-full font-raleway min-h-[11rem] rounded-lg">
              <h6 className="font-edu-sa text-2xl border-b-[1px] border-purple-300 pb-2 text-center">About me</h6>
              <p className="mt-2">{userData.bio || `${userData.username} has no bio yet!`}</p>
            </div>
          </section>
          <section className="p-2 mx-4 mb-4 border-[1px] border-purple-300 min-h-[11rem] rounded-lg">
            <h5 className="font-edu-sa text-2xl pb-2 border-b-[1px] border-purple-300 text-center">My posts</h5>
            <div>
              {posts.length > 0 ? (
                posts.map((post: Post) => <UserPost key={post._id} postData={post} />)
              ) : (
                <p className="mt-2 font-raleway">{userData.username} has not posted yet!</p>
              )}
            </div>
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
