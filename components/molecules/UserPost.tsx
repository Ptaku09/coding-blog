import Link from 'next/link';
import Image from 'next/image';
import Hashtag from '../atoms/Hashtag';
import HeartButton from '../atoms/postButtons/HeartButton';
import React from 'react';
import { Post } from '../../pages/board';

const UserPost = ({ postData }: { postData: Post }) => {
  return (
    <div key={postData._id}>
      <div className="flex flex-row items-center justify-between font-raleway font-bold border-b-[1px] border-purple-300">
        <div className="w-full flex flex-row items-center gap-3 py-4">
          <Link href={`/users/${postData.userId}`}>
            <a className="flex flex-row items-center gap-3">
              <div className="w-9 h-9 rounded-full border-[1px] border-white border-purple-300 overflow-hidden">
                <Image src={postData.image} width={45} height={45} objectFit="cover" alt="avatar" />
              </div>
              <p>{postData.username}</p>
            </a>
          </Link>
          <Hashtag text={postData.language} />
        </div>
        <p className="py-4">{new Date(postData.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
      </div>
      <div className="border-b-[1px] border-purple-300 relative z-10 flex flex-col items-start font-raleway">
        <Link href={`/posts/${postData._id}`}>
          <a className="w-full h-full py-4">
            <p className="pb-8">{postData.comment}</p>
          </a>
        </Link>
        <div className="flex items-center justify-center mb-3 w-20 py-1 bg-purple-300 rounded-xl shadow-xl text-lg text-black dark:text-dark">
          <HeartButton postId={postData._id} postLikes={postData.likes} />
        </div>
      </div>
    </div>
  );
};

export default UserPost;
