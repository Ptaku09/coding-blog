import type { NextPage } from 'next';
import Head from 'next/head';
import { MobileBackground } from '../components/svg/MobileBackground';
import LogoWhite from '/assets/logo-white.svg';
import Image from 'next/image';
import { faArrowDown, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AnimatedGlobe = dynamic(() => import('../components/AnimatedGlobe'), { ssr: false });

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Coding blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-screen h-screen overflow-x-hidden">
        <MobileBackground />
        <div className="w-full min-h-screen h-full relative z-[2] flex items-start justify-start">
          <div className="absolute z-[2] w-screen h-1/2">
            <div className="w-screen relative p-4 pr-8 text-2xl font-raleway font-bold text-white flex items-center justify-between">
              <div className="flex items-center justify-center gap-3">
                <Image src={LogoWhite} width={35} height={35} alt="white logo" />
                coding blog
              </div>
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <div className="w-screen h-1/2 absolute bottom-7 flex items-center justify-center flex-col">
              <h1 className="text-white font-raleway text-6xl font-bold text-center border-b-2 mx-12 pb-4">Show your ideas to the world!</h1>
              <button className="px-12 py-2 bg-white text-black mt-5 font-bold font-raleway">Login</button>
            </div>
          </div>
          <div className="mt-[18rem]">
            <AnimatedGlobe />
          </div>
          <div className="w-[102rem] h-[102rem] absolute -bottom-[98.5rem] left-1/2 -translate-x-1/2 bg-white rounded-full">
            <span className="absolute top-3 left-1/2 -translate-x-1/2 animate-myBounce">
              <FontAwesomeIcon icon={faArrowDown} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
