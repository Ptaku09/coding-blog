import BoardMobileLayout from '../components/templates/BoardMobileLayout';
import { ReactElement, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, GetSessionParams } from 'next-auth/react';
import BoardPost from '../components/molecules/BoardPost';

export type Post = {
  _id: string;
  username: string;
  image: string;
  comment: string;
  code: string;
  language: string;
  likes: number;
};

const Board = () => {
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    fetch('/api/posts')
      .then((r: Response) => r.json())
      .then(({ status, data: posts }) => status === 200 && setPosts(posts));
  }, []);

  return (
    <div className="w-screen h-auto min-h-screen py-12 bg-white dark:bg-dark bg-fixed text-white overflow-y-scroll scroll-smooth flex items-center justify-start flex-col">
      {posts.map((post: Post) => (
        <BoardPost key={post._id} postData={post} />
      ))}
    </div>
  );
};

Board.getLayout = (page: ReactElement) => {
  return <BoardMobileLayout>{page}</BoardMobileLayout>;
};

export default Board;

export const getServerSideProps: GetServerSideProps = async (context: GetSessionParams) => {
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
