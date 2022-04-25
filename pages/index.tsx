import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Github from '../assets/github-brands.svg';
import LogoBlue from '../assets/logo-blue.svg';
import LogoWhite from '../assets/logo-white.svg';
import Image from 'next/image';
import { Post } from '../components/Post';
import { Carousel } from '../components/Carousel';
import { CarouselItem } from '../components/CarouselItem';

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true);

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

  return (
    <>
      <Head>
        <title>Coding blog</title>
      </Head>

      <div className="w-screen h-screen relative">
        <div className="w-96 h-96 md:w-[32rem] md:h-[32rem] fixed -top-20 lg:top-20 -left-24 bg-blue-700 rounded-full blur-2xl" />
        <div className="w-72 h-72 md:w-[36rem] md:h-[36rem] lg:w-96 lg:h-96 fixed -bottom-32 lg:-top-20 lg:-right-24 bg-blue-700 rounded-full blur-2xl" />
        <div className="w-80 h-80 md:w-[40rem] md:h-[40rem] fixed -right-32 top-72 lg:-bottom-56 md:left-[35rem] bg-purple-700 rounded-full blur-2xl" />
        <div className="w-full min-h-screen bg-white z-[2] fixed opacity-80" />
        <div className="w-full min-h-screen absolute z-[3] flex items-start justify-start">
          <div
            className={`${
              isOpen ? 'md:w-1/2 overflow-hidden' : 'w-screen md:w-11/12 overflow-y-scroll'
            } mt-10 md:mt-0 min-h-screen relative flex items-center justify-start md:justify-center flex-col transition-all duration-300 scroll-smooth overflow-x-hidden`}
          >
            <span className="fixed top-4 left-4 text-2xl font-raleway font-bold text-blue-500 flex items-center justify-center gap-3">
              <Image src={LogoBlue} width={35} height={35} alt="logo" />
              coding blog
            </span>
            <Carousel>
              <CarouselItem>
                <Post
                  nickname="CodingMaster09"
                  role="Backend dev"
                  comment="Coding blog is a place where you can share your knowledge and experience with other people. It's an amazing feeling when someone
            appreciates your idea!"
                />
              </CarouselItem>
              <CarouselItem>
                <Post
                  nickname="CodingMaster09s"
                  role="Backend dev"
                  comment="Coding blog is a place where you can share your knowledge and experience with other people. It's an amazing feeling when someone
              appreciates your idea!"
                />
              </CarouselItem>
              <CarouselItem>
                <Post
                  nickname="CodingMaster09s"
                  role="Backend dev"
                  comment="Coding blog is a place where you can share your knowledge and experience with other people. It's an amazing feeling when someone
              appreciates your idea!"
                />
              </CarouselItem>
            </Carousel>
          </div>
          <div
            className={`${
              isOpen ? 'w-screen translate-y-0 md:w-1/2' : '-translate-y-[90%] w-screen md:w-1/12 md:translate-y-0'
            } h-screen fixed right-0 flex items-center justify-center flex-col py-10 bg-gradient-to-b from-blue-500 to-purple-600 transition-all duration-300 ease-in`}
          >
            <span
              className={`absolute z-[4] right-[42%] md:left-0 md:top-auto md:bottom-auto w-0 h-0 border-x-[1.5rem] border-transparent border-t-0 border-b-[2rem] border-b-white ${
                isOpen
                  ? 'md:rotate-90 bottom-7 md:hover:translate-x-1.5'
                  : 'rotate-180 md:-rotate-90 bottom-4 -translate-x-2 md:translate-x-1.5 md:hover:translate-x-0'
              } transition-all ease-in-out duration-400 cursor-pointer hover:border-b-gray-200 scale-75 md:scale-100`}
              onClick={handleOpening}
            />
            {isOpen ? (
              <h1
                className={`text-6xl text-white text-center absolute top-5 font-bebas border-b-2 pb-2 px-5 mb-10 transition-opacity ${
                  isOpen ? 'opacity-100 delay-100 duration-200 animate-appearing' : 'opacity-0'
                }`}
              >
                Welcome to coding blog!
              </h1>
            ) : (
              <div className="text-white absolute bottom-4 left-5 md:top-5 md:left-auto duration-200 animate-appearing scale-75 md:scale-100">
                <Image src={LogoWhite} width={50} height={50} alt="logo" />
              </div>
            )}
            <div
              className={`w-2/3 h-3/5 md:w-1/2 md:h-3/5 bg-white p-1 transition-opacity ${
                isOpen ? 'opacity-100 delay-100 duration-200 animate-appearing' : 'opacity-0'
              }`}
            >
              <div className="w-full h-full bg-gradient-to-b from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full bg-white p-5 flex items-center justify-start flex-col font-jakarta">
                  <ul className="flex items-center justify-center flex-col gap-6">
                    <li className="font-flower text-center text-xl">Start sharing your coding ideas!</li>
                    <li>sign in with Google</li>
                    <li>sign in with Twitter</li>
                    <li>sign in with Github</li>
                  </ul>
                </div>
              </div>
            </div>
            {isOpen ? (
              <p className="text-white text-xs md:text-sm font-raleway absolute bottom-0 right-auto md:right-4 animate-appearing flex items-center justify-center gap-2">
                Created with ❤️ by Ptaku09
                <a className="scale-90 scale-100 mt-1.5" href="https://github.com/Ptaku09" target="_blank" rel="noreferrer">
                  <Image src={Github} width={15} height={15} alt="github" />
                </a>
              </p>
            ) : (
              <a
                href="https://github.com/Ptaku09"
                target="_blank"
                className="text-white absolute bottom-5 right-5 md:right-auto duration-200 animate-appearing transition-all md:hover:-translate-y-1 scale-75 md:scale-100"
                rel="noreferrer"
              >
                <Image src={Github} width={40} height={40} alt="github" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
