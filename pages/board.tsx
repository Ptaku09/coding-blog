import BoardMobileLayout from './BoardMobileLayout';
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import BoardPost from '../components/molecules/BoardPost';

const Board = () => {
  return (
    <div className="w-screen h-auto min-h-screen py-12 bg-white dark:bg-[#0e172a] bg-fixed text-white overflow-y-scroll scroll-smooth flex items-center justify-start flex-col">
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
      <BoardPost />
    </div>
  );
};

Board.getLayout = (page: ReactElement) => {
  return <BoardMobileLayout>{page}</BoardMobileLayout>;
};

export default Board;

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
