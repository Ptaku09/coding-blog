import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Post } from '../../pages/board';
import HeartDarkGray from '../../public/icons/heart-dark-gray.svg';

const UserPost = ({ postData }: { postData: Post }) => {
  return (
    <div className="mb-4 pb-4 font-raleway border-b-[1px] dark:border-gray-600">
      <div className="flex items-center justify-between text-gray-500 font-albert text-xs">
        <div className="flex items-center justify-start gap-1">
          <Image src={HeartDarkGray} width={12} height={12} alt="unchecked heart" />
          <p>{postData.likes}</p>
          <span className="text-2xl">&#183;</span>
          <p>{postData.language.toUpperCase()}</p>
        </div>
        <p>{new Date(postData.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <p className="font-bold">{postData.comment}</p>
        <Link href={`/posts/${postData._id}`}>
          <a className="flex items-center gap-1 text-sm font-albert text-purple-600">Read more</a>
        </Link>
      </div>
    </div>
  );
};

export default UserPost;
