import { NextPageWithLayout } from '../_app';
import DefaultMobileLayout from '../../components/templates/DefaultMobileLayout';
import { ReactElement } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { server } from '../../config';
import NoSuchUserPage from '../../components/organisms/NoSuchUserPage';
import Image from 'next/image';

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
  return (
    <div className="w-screen h-auto min-h-screen py-12 bg-white dark:bg-dark">
      {userData ? (
        <section>
          <Image src={userData.image} height={200} width={200} alt="profile pic" />
        </section>
      ) : (
        <NoSuchUserPage />
      )}
    </div>
  );
};

(User as NextPageWithLayout).getLayout = (page: ReactElement) => {
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

  const userRequest = await fetch(`${server}/api/users/${context.query.id}`);
  const { data: userData } = await userRequest.json();

  return {
    props: {
      userData,
    },
  };
};

export default User;
