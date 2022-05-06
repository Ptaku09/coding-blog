import type { NextPage } from 'next';
import Head from 'next/head';
import { MobileHomeBackground } from '../components/svg/MobileHomeBackground';
import Image from 'next/image';
import { faArrowDown, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HowToStartComponent } from '../components/HowToStartComponent';
import GithubBlack from '../assets/github-black.svg';
import LogoWhite from '../assets/logo-white.svg';
import Google from '../assets/google.svg';
import Twitter from '../assets/twitter.svg';
import NewPostBlack from '../assets/new-post-black.svg';
import SubmitBlack from '../assets/submit-black.svg';

const AnimatedGlobe = dynamic(() => import('../components/AnimatedGlobe'), { ssr: false });

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Coding blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-screen h-screen overflow-x-hidden scroll-smooth">
        <MobileHomeBackground />
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
          <div className="w-[102rem] h-[102rem] absolute -bottom-[98.5rem] left-1/2 -translate-x-1/2 bg-white rounded-full flex items-center justify-start flex-col">
            <div className="flex items-center justify-start flex-col w-screen h-auto mt-3 px-6">
              <a href="#how-to-start">
                <FontAwesomeIcon className="animate-myBounce" icon={faArrowDown} />
              </a>
              <h3 className="relative text-black text-4xl font-raleway mt-16 mb-5">
                <span id="how-to-start" className="absolute -top-5" />
                How to start?
              </h3>
              <HowToStartComponent componentNumber={1} title="Create an account">
                <ul className="list-disc pl-4 mt-5">
                  <li>Click the triangle above or swipe it down</li>
                  <li>
                    Then sign in via <Image src={Google} width={17} height={17} alt="google" />,{' '}
                    <Image src={Twitter} width={17} height={17} alt="twitter" /> or <Image src={GithubBlack} width={17} height={17} alt="github" />
                  </li>
                </ul>
              </HowToStartComponent>
              <HowToStartComponent componentNumber={2} title="Share your code">
                <ul className="list-disc pl-4 mt-5">
                  <li>
                    Click the <Image src={NewPostBlack} width={17} height={17} alt="new post" /> button
                  </li>
                  <li>Paste your code or select a file</li>
                  <li>
                    Add a short comment and submit your code via <Image src={SubmitBlack} width={17} height={17} alt="submit" /> button
                  </li>
                </ul>
              </HowToStartComponent>
              <HowToStartComponent componentNumber={3} title="Wait for reactions">
                <p className="absolute left-8 mt-5 w-full text-left">Show yourself to the world!</p>
              </HowToStartComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
