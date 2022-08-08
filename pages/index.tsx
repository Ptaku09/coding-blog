import { faArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MobileHowToStartSection from '../components/organisms/MobileHowToStartSection';
import LogoAndName from '../components/atoms/LogoAndName';
import HomePageLayout from '../components/templates/HomePageLayout';
import React, { ReactElement, useRef } from 'react';
import Image from 'next/image';
import DesktopHowToStartSection from '../components/organisms/DesktopHowToStartSection';
import { useSession } from 'next-auth/react';
import defaultAvatar from '../public/images/defaultAvatar.jpg';
import Link from 'next/link';
import { NextPageWithLayout } from './_app';
import useBreakpointDetector from '../hooks/useBreakpointDetector';
import UsersOpinions from '../components/organisms/UsersOpinions';
import MobileEntryScreen from '../components/organisms/MobileEntryScreen';
import DesktopEntryScreen from '../components/organisms/DesktopEntryScreen';

const AnimatedGlobe = dynamic(() => import('../components/molecules/AnimatedGlobe'), { ssr: false });

const Home: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const ref = useRef<HTMLDivElement>(null);
  const { isBreakpoint } = useBreakpointDetector(ref, 768);

  return (
    <div ref={ref} className="w-screen bg-dark-user h-auto flex items-center justify-start flex-col text-black font-raleway">
      <div className="absolute z-10 w-screen p-4 text-2xl text-white flex items-center justify-between">
        <LogoAndName />
        {status === 'authenticated' ? (
          <Link href={`/users/${session?.user.id}`}>
            <a className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden">
              <Image src={session?.user?.image || defaultAvatar} layout="fill" objectFit="cover" alt={session?.user?.image || 'default photo'} />
            </a>
          </Link>
        ) : (
          <Link href="/signin">
            <a>
              <FontAwesomeIcon className="cursor-pointer" icon={faUser} />
            </a>
          </Link>
        )}
      </div>
      <div className="w-screen h-auto flex items-start justify-start flex-col">
        <div className="h-mobile-screen bg-gradient-to-tr from-black via-gray-900 to-indigo-900 w-screen md:h-screen md:flex md:items-center md:flex-row-reverse">
          {isBreakpoint ? <MobileEntryScreen /> : <DesktopEntryScreen />}
        </div>
        <div className="w-screen md:-mt-16 relative z-[2] h-auto bg-white rounded-t-[100%80px] rounded-b-[100%80px] flex items-center justify-start flex-col">
          <Link href="#how-to-start" scroll={false}>
            <a className="mt-3">
              <FontAwesomeIcon className="animate-myBounce" icon={faArrowDown} />
            </a>
          </Link>
          <h3 className="relative text-black text-3xl mt-16 mb-3 px-8 pb-2 border-b-[1px] border-gray-200 font-[500]">
            <span id="how-to-start" className="absolute -top-5" />
            HOW TO START?
          </h3>
          {isBreakpoint ? <MobileHowToStartSection /> : <DesktopHowToStartSection />}
        </div>
        <div className="w-screen h-auto relative z-[3] translate-y-10 bg-dark-user rounded-b-[100%40px] flex flex-col items-center overflow-x-hidden">
          <UsersOpinions />
        </div>
      </div>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
