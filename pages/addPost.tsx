import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { ReactElement, useState } from 'react';
import AddPostMobileLayout from '../components/templates/AddPostMobileLayout';
import Image from 'next/image';
import defaultAvatar from '../public/images/defaultAvatar.jpg';

const AddPost = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen w-screen py-16 bg-white dark:bg-dark flex flex-col items-center justify-start">
      <div className="h-full w-11/12 flex flex-col items-start">
        <div className="flex flex-row items-center gap-3 font-raleway font-bold">
          <div className="w-9 h-9 rounded-full border-[1px] border-white overflow-hidden">
            <Image src={defaultAvatar} width={45} height={45} objectFit="cover" alt="avatar" />
          </div>
          <p>nickname</p>
        </div>
        <form className="w-full flex flex-col items-center">
          <textarea
            className="peer relative dark:bg-dark w-full min-h-56 rounded-xl border-[1px] my-2 dark:text-white font-raleway p-2 outline-purple-600"
            maxLength={250}
            onChange={(e) => setCount(e.target.value.length)}
            placeholder="Add comment..."
          />
          <p
            className={`peer-focus:bg-purple-600 peer-focus:translate-x-0 ${
              count > 0 ? 'translate-x-0' : '-translate-x-64'
            } bg-gray-300 transform duration-200 text-white w-24 text-center py-1 px-3 rounded-xl shadow-xl`}
          >
            {count} / 250
          </p>
        </form>
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
