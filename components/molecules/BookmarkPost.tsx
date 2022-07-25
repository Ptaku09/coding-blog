import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Post } from '../../pages/board';
import HeartDarkGray from '../../public/icons/heart-dark-gray.svg';

const BookmarkPost = ({ postData, handleRemoveBookmark }: { postData: Post; handleRemoveBookmark: (id: string) => void }) => {
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
        <Link href={`/users/${postData.userId}`}>
          <a className="flex flex-row items-center gap-2 font-raleway font-bold text-xl my-3">
            <div className="relative w-9 h-9 rounded-full border-[1px] border-white dark:border-dark overflow-hidden">
              <Image src={postData.image} layout="fill" objectFit="cover" alt="avatar" />
            </div>
            <p>{postData.username}</p>
          </a>
        </Link>
        <p className="font-bold">{postData.comment}</p>
        <div className="flex items-center justify-between text-sm font-albert mt-2">
          <Link href={`/posts/${postData._id}`}>
            <a className="text-purple-600">Read more</a>
          </Link>
          <button onClick={() => handleRemoveBookmark(postData._id)} className="text-red-500">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPost;
