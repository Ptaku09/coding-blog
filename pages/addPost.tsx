import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import React, { ReactElement } from 'react';
import AddPostMobileLayout from '../components/templates/AddPostMobileLayout';
import Image from 'next/image';
import defaultAvatar from '../public/images/defaultAvatar.jpg';
import AddPostForm from '../components/organisms/AddPostForm';
import { NextPageWithLayout } from './_app';

const AddPost: NextPageWithLayout = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen w-screen py-16 bg-white dark:bg-dark flex flex-col items-center justify-start">
      <div className="h-full w-11/12 flex flex-col items-start">
        <div className="flex flex-row items-center gap-3 font-raleway font-bold mt-2">
          <div className="w-11 h-11 rounded-full border-[1px] border-white overflow-hidden">
            <Image src={session?.user?.image || defaultAvatar} width={55} height={55} objectFit="cover" alt="avatar" />
          </div>
          <p className="text-lg">{session?.user?.username}</p>
        </div>
        <AddPostForm />
      </div>
    </div>
  );
};

AddPost.getLayout = (page: ReactElement) => {
  return <AddPostMobileLayout>{page}</AddPostMobileLayout>;
};

export default AddPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
