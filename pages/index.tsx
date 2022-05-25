import Head from 'next/head';
import { faArrowDown, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HowToStartSection from '../components/organisms/HowToStartSection';
import Button from '../components/atoms/Button';
import LogoAndName from '../components/atoms/LogoAndName';
import GradientButton from '../components/atoms/GradientButton';
import HomePageLayout from '../components/templates/HomePageLayout';
import { ReactElement } from 'react';
import Curiosity from '../components/atoms/Curiosity';
import Carousel from '../components/organisms/Carousel';
import MainViewPicture from '../public/images/main-view-pictrue-desktop.svg';
import Image from 'next/image';

const AnimatedGlobe = dynamic(() => import('../components/molecules/AnimatedGlobe'), { ssr: false });

const Home = () => {
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

      <div className="w-screen bg-home-page-mobile md:bg-home-page-desktop h-auto flex items-center justify-start flex-col">
        <div className="absolute z-10 w-screen p-4 pr-8 text-2xl text-white flex items-center justify-between">
          <LogoAndName />
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
        <div className="w-screen h-auto flex items-start justify-start flex-col">
          <div className="h-mobile-screen w-screen md:h-screen md:flex md:items-center md:flex-row-reverse">
            <div className="absolute z-[2] w-screen top-0 h-1/2 md:w-1/2">
              <div className="w-full h-1/2 absolute bottom-7 md:top-1/2 flex items-center justify-center flex-col md:h-full">
                <h1 className="text-white font-raleway text-5xl font-bold text-center border-b-2 mx-12 mb-5 pb-4">Show your ideas to the world!</h1>
                <Button text="Login" onClickFunc={() => console.log('Login')} />
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
          <div className="w-screen md:-mt-36 relative z-[2] h-auto bg-white rounded-t-[100%80px] md:rounded-tr-[100%150%] md:rounded-br-[100%150%] rounded-b-[100%80px] flex items-center justify-start flex-col">
            <a className="mt-3" href="#how-to-start">
              <FontAwesomeIcon className="animate-myBounce" icon={faArrowDown} />
            </a>
            <HowToStartSection />
            <GradientButton text="start now" onClickFunc={() => console.log('Login')} />
          </div>
          <div className="w-screen h-auto relative -mt-16 pt-16 bg-user-opinions-mobile md:bg-user-opinions-desktop flex flex-col items-center overflow-x-hidden">
            <Curiosity />
            <h3 className="font-bebas text-5xl text-white -mb-12 mt-16">Hear the crowd!</h3>
            <Carousel />
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
