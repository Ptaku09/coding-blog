import BoardMobileLayout from '../components/templates/BoardMobileLayout';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, GetSessionParams } from 'next-auth/react';
import BoardPost from '../components/molecules/BoardPost';
import { NextPageWithLayout } from './_app';
import { DEFAULT_AMOUNT_OF_FETCHED_POSTS } from '../lib/constants';
import { ScrollRestorationContext } from '../providers/ScrollRestorationProvider';
import GoToTopLayout from '../components/templates/GoToTopLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
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
  createdAt: string;
  likes: number;
};

const Board: NextPageWithLayout = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [iterator, setIterator] = useState<number>(1);
  const [isEverythingLoaded, setIsEverythingLoaded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { scrollRef } = useContext(ScrollRestorationContext);

  useEffect(() => {
    const storedPosts = sessionStorage.getItem('posts');
    window.innerWidth < 768 && setIsMobile(true);

    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
      setIterator(JSON.parse(sessionStorage.getItem('iterator') || '1'));
    } else {
      fetch('/api/posts')
        .then((r: Response) => r.json())
        .then(({ status, data: posts }) => status === 200 && setPosts(posts));
    }
  }, []);

  // save posts to session storage to avoid refetching
  useEffect(() => {
    sessionStorage.setItem('posts', JSON.stringify(posts));
    sessionStorage.setItem('iterator', Math.floor(posts.length / DEFAULT_AMOUNT_OF_FETCHED_POSTS).toString());
  }, [posts, iterator]);

  useEffect(() => {
    // scroll to the last post without animation
    document.documentElement.style.scrollBehavior = 'auto';
    setTimeout(() => window.scrollTo(0, scrollRef?.current?.scrollPosition || 0), 5);
    setTimeout(() => (document.documentElement.style.scrollBehavior = 'smooth'), 5);

    const handleScrollPosition = () => {
      if (scrollRef.current) scrollRef.current.scrollPosition = window.scrollY;
    };

    window.addEventListener('scroll', handleScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScrollPosition);
    };
  });

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
    <div className="relative w-screen h-auto min-h-screen py-12 bg-white dark:bg-dark bg-fixed text-white overflow-y-scroll scroll-smooth flex items-center justify-start flex-col">
      <div className="absolute z-10 top-0 right-0 w-16 h-full" />
      <InfiniteScroll
        next={fetchMorePosts}
        hasMore={!isEverythingLoaded}
        loader={null}
        scrollThreshold={isMobile ? `150px` : 0.5}
        dataLength={posts.length}
        endMessage={<BoardEndMessage />}
      >
        {posts.map((post: Post, index: number) => post && <BoardPost key={index} postData={post} />)}
      </InfiniteScroll>
      {!isEverythingLoaded && <PostLoading />}
    </div>
  );
};

Board.getLayout = (page: ReactElement) => {
  return (
    <BoardMobileLayout>
      <GoToTopLayout>{page}</GoToTopLayout>
    </BoardMobileLayout>
  );
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
