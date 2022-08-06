import { SearchResultUser } from '../../pages/search';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SearchUser = ({ data }: { data: SearchResultUser }) => {
  return (
    <Link href={`/users/${data._id}`}>
      <a>
        <div className="w-full h-52 relative mb-6 shadow-inner border-2 dark:border-gray-500 rounded-xl overflow-hidden">
          <div className="absolute shadow-xl bottom-4 z-[1] w-full px-5 py-2 flex items-center justify-between bg-white bg-opacity-80 dark:bg-dark-user dark:bg-opacity-80 shadow-round">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-3 my-2">
                <div className="relative w-12 h-12 rounded-full border-2 border-white dark:border-gray-500 overflow-hidden">
                  <Image src={data.image} layout="fill" objectFit="cover" alt="avatar" />
                </div>
                <div className="flex items-start justify-center flex-col font-raleway">
                  <p className="font-bold">{data.username}</p>
                  <p className="text-sm font-normal">{data.name}</p>
                </div>
              </div>
              {data.bio && <p className="my-4">{data.bio}</p>}
            </div>
          </div>
          <Image src={`/images/background${data.backgroundImage || 1}.jpg`} layout="fill" objectFit="cover" alt="background" priority />
        </div>
      </a>
    </Link>
  );
};

export default SearchUser;
