import Image from 'next/image';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import Hashtag from '../atoms/Hashtag';
import Link from 'next/link';
import React from 'react';
import { Post } from '../../pages/board';
import HeartButton from '../atoms/postButtons/HeartButton';

const BookmarkPost = ({ postData, handleRemoveBookmark }: { postData: Post; handleRemoveBookmark: (id: string) => void }) => {
  return (
    <div key={postData._id} className="my-4">
      <div className="flex flex-row items-center justify-between font-raleway font-bold border-y-[1px] dark:border-dark">
        <div className="w-full flex flex-row items-center gap-3 py-4">
          <Link href={`/users/${postData.userId}`}>
            <a className="flex flex-row items-center gap-3">
              <div className="w-9 h-9 rounded-full border-[1px] border-white dark:border-dark overflow-hidden">
                <Image src={postData.image || defaultAvatar} width={45} height={45} objectFit="cover" alt="avatar" />
              </div>
              <p>{postData.username}</p>
            </a>
          </Link>
          <Hashtag text={postData.language} />
        </div>
        <p className="py-4">{new Date(postData.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
      </div>
      <div className="py-4 border-b-[1px] dark:border-dark relative z-10 flex flex-col items-start">
        <Link href={`/posts/${postData._id}`}>
          <a>
            <p className="mb-8">{postData.comment}</p>
          </a>
        </Link>
        <div className="w-full flex justify-center gap-4 font-bebas text-xl">
          <div className="flex items-center justify-center font-raleway text-base w-24 py-2 bg-purple-300 rounded-xl shadow-xl text-black dark:text-dark">
            <HeartButton postId={postData._id} postLikes={postData.likes} />
          </div>
          <Link href={`/posts/${postData._id}`}>
            <a className="px-6 py-2 bg-purple-600 rounded-xl shadow-xl text-white">Read more</a>
          </Link>
          <button onClick={() => handleRemoveBookmark(postData._id)} className="px-6 py-2 bg-gray-400 rounded-xl shadow-xl 4 text-white">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPost;
