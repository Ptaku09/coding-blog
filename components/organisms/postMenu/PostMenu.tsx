import React, { useContext, useRef } from 'react';
import { Post } from '../../../pages/board';
import Image from 'next/image';
import EditBlack from '../../../public/icons/edit-black.svg';
import EditPost from './EditPost';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { PostMenuContext, PostMenuContextProps } from '../../../providers/PostMenuProvider';
import DeletePost from './DeletePost';

const PostMenu = ({ postData }: { postData: Post }) => {
  const { isOpen, toggleState } = useContext<PostMenuContextProps>(PostMenuContext);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setTimeout(() => toggleState(false), 100); // wait to prevent miss click
  });

  return (
    <>
      <button
        onClick={() => toggleState(true)}
        className="absolute z-[1] right-2 top-14 md:top-2 w-8 h-8 bg-white flex items-center justify-center shadow-lg rounded-xl"
      >
        <Image src={EditBlack} width={19} height={19} alt="edit" />
      </button>
      {isOpen && (
        <div
          ref={ref}
          className="absolute right-8 top-[5.5rem] md:top-10 z-10 flex items-center justify-start flex-col bg-white h-auto px-5 py-2 border-2 border-black dark:border-0 rounded-b-xl origin-top animate-slide-down "
        >
          <div className="absolute top-0 w-full bg-black py-2">
            <p className="font-raleway font-bold text-center text-white">OPTIONS</p>
          </div>
          <div className="mt-10 flex items-center justify-start flex-col gap-2">
            <EditPost postData={postData} />
            <span className="h-px w-full bg-gray-300" />
            <DeletePost />
          </div>
        </div>
      )}
    </>
  );
};

export default PostMenu;
