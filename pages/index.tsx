import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Background } from '../components/Background';
import dynamic from 'next/dynamic';

const AnimatedGlobe = dynamic(() => import('../components/AnimatedGlobe'), { ssr: false });

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const handleOpening = () => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setIsOpen((prevState: boolean) => !prevState);
    document.body.style.overflow === 'hidden' ? (document.body.style.overflow = 'unset') : (document.body.style.overflow = 'hidden');
  };

  //Gestures to login menu
  const loginMenuHandlers = useSwipeable({
    onSwipedDown: handleOpening,
    onSwipedUp: handleOpening,
  });

  return (
    <>
      <Head>
        <title>Coding blog</title>
      </Head>

      <div className="w-screen h-screen relative">
        <Background />
        <div className="w-full min-h-screen absolute z-[3] flex items-start justify-start">
          <AnimatedGlobe />
          {/*<div*/}
          {/*  className={`${*/}
          {/*    isOpen ? 'md:w-1/2 overflow-hidden' : 'w-screen md:w-11/12 overflow-y-scroll'*/}
          {/*  } pt-32 md:pt-0 min-h-screen relative flex items-center justify-end md:justify-center flex-col-reverse md:flex-col transition-all duration-300 scroll-smooth overflow-x-hidden`}*/}
          {/*>*/}
          {/*  <span className="fixed top-4 left-4 text-2xl font-raleway font-bold text-blue-500 flex items-center justify-center gap-3">*/}
          {/*    <Image src={LogoBlue} width={35} height={35} alt="logo" />*/}
          {/*    coding blog*/}
          {/*  </span>*/}
          {/*  <Carousel>*/}
          {/*    <CarouselItem>*/}
          {/*      <Post*/}
          {/*        nickname="CodingMaster09"*/}
          {/*        role="Backend dev"*/}
          {/*        comment="Coding Blog is a place where you can share your knowledge and experience with other people. It's an amazing feeling when someone*/}
          {/*  appreciates your idea!"*/}
          {/*      />*/}
          {/*    </CarouselItem>*/}
          {/*    <CarouselItem>*/}
          {/*      <Post*/}
          {/*        avatar={mysterious}*/}
          {/*        nickname="Mysterious_"*/}
          {/*        role="Frontend dev"*/}
          {/*        comment="I take a lot of inspiration from the Coding Blog. To my mind every frontend developer should check out this blog. It's a great."*/}
          {/*      />*/}
          {/*    </CarouselItem>*/}
          {/*    <CarouselItem>*/}
          {/*      <Post*/}
          {/*        avatar={jakeWebb}*/}
          {/*        nickname="JakeWebb123"*/}
          {/*        role="Devops"*/}
          {/*        comment="My name is Jake and I'm a devops engineer. Coding Blog is something between Twitter and Pinterest. It's hard to explain it in few sentences. You must try it on your own!"*/}
          {/*      />*/}
          {/*    </CarouselItem>*/}
          {/*  </Carousel>*/}
          {/*  <div className="w-full min-h-screen flex items-center justify-start flex-col">*/}
          {/*    <h2 className="text-3xl font-bold font-jakarta">How to start?</h2>*/}
          {/*    <HowToStartComponent componentNumber={1} title="Create an account">*/}
          {/*      <ul className="list-disc pl-4 mt-5">*/}
          {/*        <li>Click the triangle above or swipe it down</li>*/}
          {/*        <li>*/}
          {/*          Then sign in via <Image src={Google} width={17} height={17} alt="google" />,{' '}*/}
          {/*          <Image src={Twitter} width={17} height={17} alt="twitter" /> or <Image src={GithubBlack} width={17} height={17} alt="github" />*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </HowToStartComponent>*/}
          {/*    <HowToStartComponent componentNumber={2} title="Share your code">*/}
          {/*      <ul className="list-disc pl-4 mt-5">*/}
          {/*        <li>*/}
          {/*          Click the <Image src={NewPostBlack} width={17} height={17} alt="new post" /> button*/}
          {/*        </li>*/}
          {/*        <li>Paste your code or select a file</li>*/}
          {/*        <li>*/}
          {/*          Add a short comment and submit your code via <Image src={SubmitBlack} width={17} height={17} alt="submit" /> button*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </HowToStartComponent>*/}
          {/*    <HowToStartComponent componentNumber={3} title="Wait for reactions">*/}
          {/*      <p className="absolute left-8 mt-5 w-full text-left">Show yourself to the world!</p>*/}
          {/*    </HowToStartComponent>*/}
          {/*  </div>*/}
          {/*  <AnimatedGlobe />*/}
          {/*</div>*/}
          {/*<div*/}
          {/*  {...loginMenuHandlers}*/}
          {/*  className={`${*/}
          {/*    isOpen ? 'w-full translate-y-0 md:w-1/2' : '-translate-y-[90%] w-full md:w-1/12 md:translate-y-0'*/}
          {/*  } h-full fixed right-0 flex items-center justify-center flex-col py-10 bg-gradient-to-b from-blue-500 to-purple-600 transition-all duration-300 ease-in`}*/}
          {/*>*/}
          {/*  <span*/}
          {/*    className={`absolute z-[4] right-[42%] md:left-0 md:top-auto md:bottom-auto w-0 h-0 border-x-[1.5rem] border-transparent border-t-0 border-b-[2rem] border-b-white ${*/}
          {/*      isOpen*/}
          {/*        ? 'md:rotate-90 bottom-11 md:hover:translate-x-1.5'*/}
          {/*        : 'rotate-180 md:-rotate-90 bottom-4 -translate-x-2 md:translate-x-1.5 md:hover:translate-x-0'*/}
          {/*    } transition-all ease-in-out duration-400 cursor-pointer hover:border-b-gray-200 scale-75 md:scale-100`}*/}
          {/*    onClick={handleOpening}*/}
          {/*  />*/}
          {/*  {isOpen ? (*/}
          {/*    <h1*/}
          {/*      className={`text-6xl text-white text-center absolute top-5 font-bebas md:border-b-2 pb-2 px-5 mb-10 transition-opacity ${*/}
          {/*        isOpen ? 'opacity-100 delay-100 duration-200 animate-appearing' : 'opacity-0'*/}
          {/*      }`}*/}
          {/*    >*/}
          {/*      Welcome to coding blog!*/}
          {/*    </h1>*/}
          {/*  ) : (*/}
          {/*    <div className="text-white absolute bottom-4 left-5 md:top-5 md:left-auto duration-200 animate-appearing scale-75 md:scale-100">*/}
          {/*      <Image src={LogoWhite} width={50} height={50} alt="logo" />*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*  <div*/}
          {/*    className={`w-2/3 h-3/5 md:w-1/2 md:h-3/5 bg-white p-1 transition-opacity ${*/}
          {/*      isOpen ? 'opacity-100 delay-100 duration-200 animate-appearing' : 'opacity-0'*/}
          {/*    }`}*/}
          {/*  >*/}
          {/*    <div className="w-full h-full bg-gradient-to-b from-blue-500 to-purple-600 p-1">*/}
          {/*      <div className="w-full h-full bg-white p-5 flex items-center justify-start flex-col font-jakarta">*/}
          {/*        <ul className="flex items-center justify-center flex-col gap-6">*/}
          {/*          <li className="font-flower text-center text-xl">Start sharing your coding ideas!</li>*/}
          {/*          <li>sign in with Google</li>*/}
          {/*          <li>sign in with Twitter</li>*/}
          {/*          <li>sign in with Github</li>*/}
          {/*        </ul>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  {isOpen ? (*/}
          {/*    <p className="text-white text-xs md:text-sm font-raleway absolute bottom-4 md:bottom-0 right-auto md:right-4 animate-appearing flex items-center justify-center gap-2">*/}
          {/*      Created with ❤️ by Ptaku09*/}
          {/*      <a className="scale-90 scale-100 mt-1.5" href="https://github.com/Ptaku09" target="_blank" rel="noreferrer">*/}
          {/*        <Image src={GithubWhite} width={15} height={15} alt="github" />*/}
          {/*      </a>*/}
          {/*    </p>*/}
          {/*  ) : (*/}
          {/*    <a*/}
          {/*      href="https://github.com/Ptaku09"*/}
          {/*      target="_blank"*/}
          {/*      className="text-white absolute bottom-5 right-5 md:right-auto duration-200 animate-appearing transition-all md:hover:-translate-y-1 scale-75 md:scale-100"*/}
          {/*      rel="noreferrer"*/}
          {/*    >*/}
          {/*      <Image src={GithubWhite} width={40} height={40} alt="github" />*/}
          {/*    </a>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  );
};

export default Home;
