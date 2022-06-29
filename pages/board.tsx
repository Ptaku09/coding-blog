import BoardMobileLayout from './BoardMobileLayout';
import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const Board = () => {
  return (
    <div className="bg-red-500 w-screen h-auto min-h-screen md:h-screen md:grid md:grid-cols-[75px_2fr_1fr] text-white overflow-y-scroll scroll-smooth">
      <div className="w-screen pt-20">
        <div className="bg-white w-36 h-36" />
        <div className="bg-white w-36 h-36" />
        <div className="bg-white w-36 h-36" />
        <div className="bg-white w-36 h-36" />
        <div className="bg-white w-36 h-36" />
        <div className="bg-white w-36 h-36" />
        <div className="bg-white w-36 h-36" />
        <div className="bg-white w-36 h-36" />
      </div>
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
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
