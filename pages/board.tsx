import BoardLayout from '../components/templates/BoardLayout';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import BoardPost from '../components/molecules/BoardPost';
import { NextPageWithLayout } from './_app';
import { DEFAULT_AMOUNT_OF_FETCHED_POSTS } from '../lib/constants';
import { ScrollRestorationContext, ScrollRestorationContextProps } from '../providers/ScrollRestorationProvider';
import GoToTopLayout from '../components/templates/GoToTopLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostLoading from '../components/atoms/PostLoading';
import BoardEndMessage from '../components/atoms/BoardEndMessage';
import { useResizeDetector } from 'react-resize-detector';

export type Post = {
  _id: string;
  backgroundImage: number;
  username: string;
  userId: string;
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
  const { scrollRef } = useContext<ScrollRestorationContextProps>(ScrollRestorationContext);
  const { width, ref } = useResizeDetector();

  useEffect(() => {
    const storedPosts = sessionStorage.getItem('posts');

    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
      setIterator(JSON.parse(sessionStorage.getItem('iterator') || '1'));
    } else {
      fetch('/api/posts')
        .then((r: Response) => r.json())
        .then(({ status, data: posts }) => status === 200 && setPosts(posts));
    }
  }, []);

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
          if (status === 200 && posts.length > 0) {
            setPosts((prevState: Post[]) => {
              // save posts to session storage to avoid refetching
              sessionStorage.setItem('posts', JSON.stringify([...prevState, ...posts]));
              return [...prevState, ...posts];
            });

            setIterator((prevState: number) => {
              // save iterator to session storage to avoid refetching
              sessionStorage.setItem('iterator', (prevState + 1).toString());
              return prevState + 1;
            });
          }

          if (status === 200 && posts.length < DEFAULT_AMOUNT_OF_FETCHED_POSTS) {
            setIsEverythingLoaded(true);
          }
        });
  };

  return (
    <div
      ref={ref}
      className="relative w-screen md:w-full h-auto min-h-screen py-12 md:py-0 bg-white dark:bg-dark-user text-white overflow-y-scroll md:overflow-hidden scroll-smooth flex items-center justify-start flex-col md:grid md:grid-cols-1"
    >
      {(width as number) < 600 && <div className="absolute z-10 top-0 right-0 w-16 h-full" />}
      <div className="flex flex-col">
        <InfiniteScroll
          next={fetchMorePosts}
          hasMore={!isEverythingLoaded}
          loader={null}
          scrollThreshold={(width as number) < 600 ? `150px` : 0.5}
          dataLength={posts.length}
          endMessage={<BoardEndMessage />}
        >
          {posts.map((post: Post, index: number) => post && <BoardPost key={index} postData={post} />)}
        </InfiniteScroll>
        {!isEverythingLoaded && <PostLoading />}
      </div>
    </div>
  );
};

Board.getLayout = (page: ReactElement) => {
  return (
    <BoardLayout>
      <GoToTopLayout>{page}</GoToTopLayout>
    </BoardLayout>
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

  return {
    props: {},
  };
};

export default Board;
