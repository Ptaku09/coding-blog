import Image from 'next/image';
import React from 'react';

export type OpinionPostTypes = {
  username: string;
  role: string;
  avatar: StaticImageData;
  commentBegin: string;
  commentHighlight: string;
  commentEnd: string;
};

const OpinionPost = ({ data }: { data: OpinionPostTypes }) => {
  return (
    <>
      <div className="absolute z-[1] top-2.5 -translate-x-[27px] w-auto h-7 bg-dark-user flex items-center justify-center">
        <div className="block w-4 h-4 rounded-full border-2 border-gray-300 bg-dark-user" />
      </div>
      <div className="flex items-center justify-start gap-3">
        <div className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden">
          <Image className="rounded-full" layout="fill" objectFit="cover" src={data.avatar} alt="avatar" />
        </div>
        <div className="text-white font-albert">
          <p className="text-lg">{data.username}</p>
          <p className="text-sm text-gray-400">{data.role}</p>
        </div>
      </div>
      <p className="relative font-albert pr-10 whitespace-normal text-white">
        {data.commentBegin}
        <span className="text-purple-600">{data.commentHighlight}</span>
        {data.commentEnd}
      </p>
    </>
  );
};

export default OpinionPost;
