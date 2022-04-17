import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { LOGO } from '../assets/Logo';

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpening = () => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setIsOpen((prevState) => !prevState);
    document.body.style.overflow === 'hidden' ? (document.body.style.overflow = 'unset') : (document.body.style.overflow = 'hidden');
  };

  return (
    <>
      <Head>
        <title>Coding blog</title>
      </Head>

      <div className="w-screen h-screen relative">
        <div className="w-96 h-96 md:w-[32rem] md:h-[32rem] absolute -top-20 lg:top-20 -left-24 bg-blue-700 rounded-full blur-2xl" />
        <div className="w-72 h-72 md:w-[36rem] md:h-[36rem] lg:w-96 lg:h-96 absolute -bottom-32 lg:-top-20 lg:-right-24 bg-blue-700 rounded-full blur-2xl" />
        <div className="w-80 h-80 md:w-[40rem] md:h-[40rem] absolute -right-32 top-72 lg:-bottom-56 md:left-[35rem] bg-purple-700 rounded-full blur-2xl" />
        <div className="w-full min-h-screen bg-white z-[2] absolute opacity-80" />
        <div className="w-full min-h-screen absolute z-[3] flex items-start justify-start">
          <div className={`${isOpen ? 'w-1/2' : 'w-11/12'} min-h-screen relative flex flex-col transition-all duration-300 scroll-smooth`}>
            <span className="absolute top-2 left-2 text-5xl font-bold font-bebas text-blue-500">{LOGO}</span>
            <div className="h-screen w-full" />
            <div className="h-screen w-auto"></div>
          </div>
          <div
            className={`${
              isOpen ? 'w-1/2' : 'w-1/12'
            } h-screen fixed right-0 flex items-center justify-center flex-col py-10 bg-gradient-to-b from-blue-500 to-purple-600 transition-all duration-300`}
          >
            <span
              className={`absolute z-[4] left-0 my-auto w-0 h-0 border-x-[1.5rem] border-transparent border-t-0 border-b-[2rem] border-b-white ${
                isOpen ? 'rotate-90 hover:translate-x-1.5' : '-rotate-90 translate-x-1.5 hover:translate-x-0'
              } transition-all ease-in-out duration-400 cursor-pointer`}
              onClick={handleOpening}
            />
            <h1
              className={`text-6xl text-white absolute top-5 font-bebas border-b-2 pb-2 px-5 mb-10 transition-opacity ${
                isOpen ? 'opacity-100 delay-100 duration-200 animate-appearing' : 'opacity-0'
              }`}
            >
              Welcome to coding blog!
            </h1>
            <div
              className={`w-1/2 h-3/5 bg-white rounded-xl p-1 transition-opacity ${
                isOpen ? 'opacity-100 delay-100 duration-200 animate-appearing' : 'opacity-0'
              }`}
            >
              <div className="w-full h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-xl p-1">
                <div className="w-full h-full bg-white rounded-xl p-5 flex items-center justify-start flex-col font-jakarta">
                  <ul>
                    <li>Start sharing your coding ideas!</li>
                    <li>sign in with Google</li>
                    <li>sign in with Twitter</li>
                    <li>sign in with Github</li>
                  </ul>
                </div>
              </div>
            </div>
            {isOpen ? (
              <p className={`text-white absolute bottom-0 right-4 animate-appearing`}>Created with {`<3`} by Ptaku09 (r) 2022 /github/</p>
            ) : (
              <p className={`text-white absolute bottom-5 mx-auto duration-200 delay-100`}>github</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
