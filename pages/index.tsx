import type { NextPage } from 'next';
import Head from 'next/head';
import { MobileHomeBackground } from '../components/atoms/svg/MobileHomeBackground';
import { faArrowDown, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HowToStartSection from '../components/organisms/HowToStartSection';
import Button from '../components/atoms/Button';
import LogoAndName from '../components/atoms/LogoAndName';

const AnimatedGlobe = dynamic(() => import('../components/molecules/AnimatedGlobe'), { ssr: false });

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Coding blog</title>
        <meta
          name="viewport"
          content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="w-screen h-screen">
        <MobileHomeBackground />
        <div className="w-screen h-full relative flex items-start justify-start">
          <div className="absolute z-[2] w-screen h-1/2">
            <div className="w-screen relative p-4 pr-8 text-2xl font-raleway font-bold text-white flex items-center justify-between">
              <LogoAndName />
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <div className="w-screen h-1/2 absolute bottom-7 flex items-center justify-center flex-col">
              <h1 className="text-white font-raleway text-5xl font-bold text-center border-b-2 mx-12 mb-5 pb-4">Show your ideas to the world!</h1>
              <Button text="Login" onClickFunc={() => console.log('Login')} />
            </div>
          </div>
          <div className="mt-[18rem]">
            <AnimatedGlobe />
          </div>
          <div className="w-screen h-auto absolute top-[49.5rem] bg-white rounded-tl-[100%80px] rounded-tr-[100%80px] flex items-center justify-start flex-col">
            <a className="mt-3" href="#how-to-start">
              <FontAwesomeIcon className="animate-myBounce" icon={faArrowDown} />
            </a>
            <HowToStartSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
