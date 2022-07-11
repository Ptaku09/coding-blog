import BoardMobileLayout from '../components/templates/BoardMobileLayout';
import { ReactElement, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, GetSessionParams } from 'next-auth/react';
import BoardPost from '../components/molecules/BoardPost';
import { NextPageWithLayout } from './_app';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DEFAULT_AMOUNT_OF_FETCHED_POSTS } from '../lib/constants';
import PostLoading from '../components/atoms/PostLoading';
import BoardEndMessage from '../components/atoms/BoardEndMessage';

export type Post = {
  _id: string;
  username: string;
  image: string;
  comment: string;
  code: string;
  language: string;
  hashtags: string[];
  date: string;
  likes: number;
};

const Board: NextPageWithLayout = () => {
  const [posts, setPosts] = useState([] as Post[]);
  const [iterator, setIterator] = useState(1);
  const [isEverythingLoaded, setIsEverythingLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/posts')
      .then((r: Response) => r.json())
      .then(({ status, data: posts }) => status === 200 && setPosts(posts));
  }, []);

  const fetchMorePosts = () => {
    !isEverythingLoaded &&
      fetch(`/api/posts?iterator=${iterator}`)
        .then((r: Response) => r.json())
        .then(({ status, data: posts }) => {
          if (status === 200) {
            setPosts((prevState: Post[]) => [...prevState, ...posts]);
            setIterator((prevState: number) => prevState + 1);
            posts.length < DEFAULT_AMOUNT_OF_FETCHED_POSTS && setIsEverythingLoaded(true);
          }
        });
  };

  return (
    <div className="w-screen h-auto min-h-screen py-12 bg-white dark:bg-dark bg-fixed text-white overflow-y-scroll scroll-smooth flex items-center justify-start flex-col">
      <InfiniteScroll
        next={fetchMorePosts}
        hasMore={!isEverythingLoaded}
        loader={<PostLoading />}
        dataLength={posts.length}
        endMessage={<BoardEndMessage />}
      >
        {posts.map((post: Post, index: number) => post && <BoardPost key={index} postData={post} />)}
      </InfiniteScroll>
    </div>
  );
};

Board.getLayout = (page: ReactElement) => {
  return <BoardMobileLayout>{page}</BoardMobileLayout>;
};

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

export default Board;
