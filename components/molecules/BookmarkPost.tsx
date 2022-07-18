import Image from 'next/image';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import Hashtag from '../atoms/Hashtag';
import Link from 'next/link';
import React from 'react';
import { Post } from '../../pages/board';
import HeartButton from '../atoms/postButtons/HeartButton';

const BookmarkPost = ({ post, handleRemoveBookmark }: { post: Post; handleRemoveBookmark: (id: string) => void }) => {
  return (
    <div key={post._id} className="my-4">
      <div className="flex flex-row items-center justify-between font-raleway font-bold border-y-[1px] dark:border-dark">
        <div className="w-full flex flex-row items-center gap-3 py-4">
          <div className="w-9 h-9 rounded-full border-[1px] border-white dark:border-dark overflow-hidden">
            <Image src={post.image || defaultAvatar} width={45} height={45} objectFit="cover" alt="avatar" />
          </div>
          <p>{post.username}</p>
          <Hashtag text={post.language} />
        </div>
        <p className="py-4">{new Date(post.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
      </div>
      <div className="py-4 border-b-[1px] dark:border-dark relative z-10 flex flex-col items-start">
        <Link href={`/posts/${post._id}`}>
          <a>
            <p className="mb-8">{post.comment}</p>
          </a>
        </Link>
        <div className="w-full flex justify-center gap-4 font-bebas text-xl">
          <div className="flex items-center justify-center font-raleway text-base w-24 py-2 bg-purple-300 rounded-xl shadow-xl text-black dark:text-dark">
            <HeartButton postId={post._id} postLikes={post.likes} />
          </div>
          <Link href={`/posts/${post._id}`}>
            <a className="px-6 py-2 bg-purple-600 rounded-xl shadow-xl text-white">Read more</a>
          </Link>
          <button onClick={() => handleRemoveBookmark(post._id)} className="px-6 py-2 bg-gray-400 rounded-xl shadow-xl 4 text-white">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPost;
