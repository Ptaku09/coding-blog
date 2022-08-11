import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import React, { ReactElement } from 'react';
import DefaultLayout from '../components/templates/DefaultLayout';
import Image from 'next/image';
import defaultAvatar from '../public/images/defaultAvatar.jpg';
import AddPostForm from '../components/organisms/AddPostForm';
import { NextPageWithLayout } from './_app';
import Link from 'next/link';
import ArrowLeftBlack from '../public/icons/arrow-left-black.svg';
import { useRouter } from 'next/router';

const AddPost: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen py-16 bg-white dark:bg-dark-user flex flex-col items-center justify-start">
      <div className="h-full w-11/12 flex flex-col items-start">
        <div className="w-full flex flex-row justify-between items-center">
          <Link href={`/users/${session?.user.id}`}>
            <a className="flex flex-row items-center gap-3 font-raleway font-bold">
              <div className="relative w-11 h-11 rounded-full border-2 border-white dark:border-gray-500 overflow-hidden">
                <Image src={session?.user?.image || defaultAvatar} layout="fill" objectFit="cover" alt="avatar" />
              </div>
              <p className="text-lg">{session?.user?.username}</p>
            </a>
          </Link>
          <a onClick={() => router.back()} className="w-8 h-8 bg-white flex items-center justify-center shadow-lg rounded-xl">
            <Image src={ArrowLeftBlack} width={19} height={19} alt="go back" />
          </a>
        </div>
        <AddPostForm />
      </div>
    </div>
  );
};

AddPost.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
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
