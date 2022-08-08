import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const AnimatedGlobe = dynamic(() => import('../molecules/AnimatedGlobe'), { ssr: false });

const MobileEntryScreen = () => {
  const { status } = useSession();

  return (
    <>
      <div className="absolute z-[2] w-screen top-0 h-1/2">
        <div className="w-full h-1/2 absolute bottom-7 flex items-center justify-center flex-col">
          <h1 className="text-white font-ubuntu text-5xl font-bold text-center border-b-2 mx-12 mb-5 pb-4">Show your ideas to the world!</h1>
          <p className="mb-5 text-gray-300 font-bold text-xl">Invent, create and share</p>
          <Link href={status === 'authenticated' ? '/board' : '/signin'}>
            <a className="px-12 py-2 bg-white text-black font-bold">{status === 'authenticated' ? 'Go to board' : 'Login'}</a>
          </Link>
        </div>
      </div>
      <div className="z-[2] h-screen w-screen flex items-end justify-center mt-44 pt-2 overflow-hidden">
        <AnimatedGlobe />
      </div>
    </>
  );
};

export default MobileEntryScreen;
