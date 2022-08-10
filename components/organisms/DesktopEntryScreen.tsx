import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const AnimatedGlobe = dynamic(() => import('../molecules/AnimatedGlobe'), { ssr: false });

const DesktopEntryScreen = () => {
  const { status } = useSession();

  return (
    <div className="absolute z-[2] w-full h-screen top-0 grid grid-cols-[1fr_1fr]">
      <div className="pl-20 w-full h-full flex items-center justify-end">
        <AnimatedGlobe />
      </div>
      <div className="w-full flex flex-col items-start justify-center">
        <div className="w-5/6 flex flex-col items-start justify-center">
          <h1 className="text-white font-ubuntu text-5xl font-bold text-left mb-2 pb-4">Show your ideas to the world!</h1>
          <p className="mb-5 text-gray-300 font-bold text-xl">Invent, create and share</p>
          <Link href={status === 'authenticated' ? '/board' : '/signin'}>
            <a className="px-12 py-2 bg-white text-black font-bold hover:bg-gray-200">{status === 'authenticated' ? 'Go to board' : 'Login'}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopEntryScreen;
