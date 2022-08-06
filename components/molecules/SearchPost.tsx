import Image from 'next/image';
import HeartDarkGray from '../../public/icons/heart-dark-gray.svg';
import Link from 'next/link';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import React from 'react';
import { SearchResultPost } from '../../pages/search';

const SearchPost = ({ data }: { data: SearchResultPost }) => {
  return (
    <div className="mb-4 pb-4 font-raleway border-b-[1px] dark:border-gray-600">
      <div className="flex items-center justify-between text-gray-500 font-albert text-xs">
        <div className="flex items-center justify-start gap-1">
          <Image src={HeartDarkGray} width={12} height={12} alt="unchecked heart" />
          <p>{data.likes}</p>
          <span className="text-2xl">&#183;</span>
          <p>{data.language.toUpperCase()}</p>
        </div>
        <p>{new Date(data.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
      </div>
      <Link href={`/users/${data._id}`}>
        <a className="flex flex-row items-center gap-2 font-raleway font-bold mb-3">
          <div className="relative w-8 h-8 rounded-full border-[1px] border-white dark:border-dark overflow-hidden">
            <Image src={data.image || defaultAvatar} layout="fill" objectFit="cover" alt="avatar" />
          </div>
          <p>{data.username}</p>
        </a>
      </Link>
      <Link href={`/posts/${data._id}`}>
        <a className="flex flex-col gap-1 mt-1">
          <p className="font-bold">{data.comment}</p>
          <p className="flex items-center gap-1 text-sm font-albert text-purple-600">Read more</p>
        </a>
      </Link>
    </div>
  );
};

export default SearchPost;
