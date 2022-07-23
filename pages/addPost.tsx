import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import React, { ReactElement } from 'react';
import DefaultMobileLayout from '../components/templates/DefaultMobileLayout';
import Image from 'next/image';
import defaultAvatar from '../public/images/defaultAvatar.jpg';
import AddPostForm from '../components/organisms/AddPostForm';
import { NextPageWithLayout } from './_app';
import ReturnWhite from '../public/icons/return-white.svg';
import Link from 'next/link';

const AddPost: NextPageWithLayout = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen w-screen py-16 bg-white dark:bg-dark flex flex-col items-center justify-start">
      <div className="h-full w-11/12 flex flex-col items-start">
        <div className="w-full flex flex-row justify-between items-center">
          <Link href={`/users/${session?.user.id}`}>
            <a className="flex flex-row items-center gap-3 font-raleway font-bold">
              <div className="w-11 h-11 rounded-full border-[1px] border-white overflow-hidden">
                <Image src={session?.user?.image || defaultAvatar} width={55} height={55} objectFit="cover" alt="avatar" />
              </div>
              <p className="text-lg">{session?.user?.username}</p>
            </a>
          </Link>
          <Link href="/board" scroll={false}>
            <a className="bg-purple-600 flex items-center justify-center px-3 py-0.5 shadow-lg rounded-xl">
              <Image src={ReturnWhite} width={26} height={26} alt="avatar" />
            </a>
          </Link>
        </div>
        <AddPostForm />
      </div>
    </div>
  );
};

AddPost.getLayout = (page: ReactElement) => {
  return <DefaultMobileLayout>{page}</DefaultMobileLayout>;
};

export default AddPost;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
