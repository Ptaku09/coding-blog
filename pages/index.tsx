import { faArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MobileHowToStartSection from '../components/organisms/MobileHowToStartSection';
import MyLink from '../components/atoms/MyLink';
import LogoAndName from '../components/atoms/LogoAndName';
import HomePageLayout from '../components/templates/HomePageLayout';
import { ReactElement } from 'react';
import Curiosity from '../components/atoms/Curiosity';
import Carousel from '../components/organisms/Carousel';
import MainViewPicture from '../public/images/main-view-pictrue-desktop.svg';
import Image from 'next/image';
import DesktopHowToStartSection from '../components/organisms/DesktopHowToStartSection';
import { useSession } from 'next-auth/react';
import defaultAvatar from '../public/images/defaultAvatar.jpg';
import Link from 'next/link';
import { NextPageWithLayout } from './_app';
import { useResizeDetector } from 'react-resize-detector';

const AnimatedGlobe = dynamic(() => import('../components/molecules/AnimatedGlobe'), { ssr: false });

const Home: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const { width, ref } = useResizeDetector();

  return (
    <div ref={ref} className="w-screen bg-home-page-mobile md:bg-home-page-desktop h-auto flex items-center justify-start flex-col text-black">
      <div className="absolute z-10 w-screen p-4 pr-8 text-2xl text-white flex items-center justify-between">
        <LogoAndName />
        {status === 'authenticated' ? (
          <div className="flex flex-row items-center gap-3">
            <p className="font-thin text-xl">{session?.user?.name?.split(' ')[0].substring(0, (width as number) < 768 ? 7 : 30)}</p>
            <div className="w-12 h-12 rounded-full border-[1px] border-white overflow-hidden">
              <Image
                src={session?.user?.image || defaultAvatar}
                height={45}
                width={45}
                objectFit="contain"
                alt={session?.user?.image || 'default photo'}
              />
            </div>
          </div>
        ) : (
          <Link href="/signin">
            <a>
              <FontAwesomeIcon className="cursor-pointer" icon={faUser} />
            </a>
          </Link>
        )}
      </div>
      <div className="w-screen h-auto flex items-start justify-start flex-col">
        <div className="h-mobile-screen w-screen md:h-screen md:flex md:items-center md:flex-row-reverse">
          <div className="absolute z-[2] w-screen top-0 h-1/2 md:w-1/2">
            <div className="w-full h-1/2 absolute bottom-7 md:top-1/2 flex items-center justify-center flex-col md:h-full">
              <h1 className="text-white font-raleway text-5xl font-bold text-center border-b-2 mx-12 mb-5 pb-4">Show your ideas to the world!</h1>
              <MyLink text={status === 'authenticated' ? 'Go to board' : 'Login'} direction={status === 'authenticated' ? '/board' : '/signin'} />
              <div className="hidden md:flex md:flex-col md:justify-center md:items-center md:gap-4 md:mt-12">
                <a className="" href="https://storyset.com/technology" target="_blank" rel="noreferrer">
                  <Image src={MainViewPicture} width={300} height={300} alt="story" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-[18rem] md:mt-24 md:absolute md:-left-1/4">
            <AnimatedGlobe />
          </div>
        </div>
        <div className="w-screen md:-mt-16 relative z-[2] h-auto bg-white rounded-t-[100%80px] rounded-b-[100%80px] flex items-center justify-start flex-col">
          <Link href="#how-to-start" scroll={false}>
            <a className="mt-3">
              <FontAwesomeIcon className="animate-myBounce" icon={faArrowDown} />
            </a>
          </Link>
          <h3 className="relative text-black text-3xl font-raleway mt-16 mb-3 px-8 pb-2 border-b-[1px] border-gray-200">
            <span id="how-to-start" className="absolute -top-5" />
            HOW TO START?
          </h3>
          {(width as number) < 768 ? <MobileHowToStartSection /> : <DesktopHowToStartSection />}
        </div>
        <div className="w-screen h-auto relative -mt-16 pt-16 md:pb-12 bg-user-opinions-mobile md:bg-user-opinions-desktop flex flex-col items-center overflow-x-hidden">
          {(width as number) < 768 ? <Curiosity /> : null}
          <h3 className="font-bebas text-5xl md:text-7xl text-white -mb-12 md:mb-5 mt-16">Hear the crowd!</h3>
          <Carousel />
        </div>
      </div>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
