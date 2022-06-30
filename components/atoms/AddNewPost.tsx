import Image from 'next/image';
import NewPostWhite from '../../public/icons/new-post-white.svg';

const AddNewPost = () => {
  return (
    <div className="fixed bottom-16 left-4 w-10 h-10 flex items-center justify-center bg-purple-600 rounded-lg shadow-xl dark:border-white dark:border-[1px]">
      <Image src={NewPostWhite} width={20} height={20} alt="new post" />
    </div>
  );
};

export default AddNewPost;
