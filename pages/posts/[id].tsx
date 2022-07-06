import { Post } from '../board';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

const Post = () => {
  const [postData, setPostData] = useState({} as Post);
  const [isWrongId, setIsWrongId] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/posts/${router.query.id}`)
      .then((r: Response) => r.json())
      .then(({ status, data: post }) => (status === 200 ? setPostData(post) : setIsWrongId(true)));
  }, [router.query.id]);

  return (
    <div className="w-screen h-screen bg-red-500 flex items-center justify-center">
      <h1 className="text-white text-3xl">{isWrongId ? 'post not found' : postData.language}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetSessionParams) => {
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

export default Post;
