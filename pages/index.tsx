import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Coding blog</title>
      </Head>

      <div className="w-screen h-screen relative overflow-hidden">
        <div className="w-96 h-96 md:w-[32rem] md:h-[32rem] absolute -top-20 lg:top-20 -left-24 bg-blue-700 rounded-full blur-2xl" />
        <div className="w-72 h-72 md:w-[36rem] md:h-[36rem] lg:w-96 lg:h-96 absolute -bottom-32 lg:-top-20 lg:-right-24 bg-blue-700 rounded-full blur-2xl" />
        <div className="w-80 h-80 md:w-[40rem] md:h-[40rem] absolute -right-32 top-72 lg:-bottom-56 md:left-[35rem] bg-purple-700 rounded-full blur-2xl" />
        <div className="w-full h-full bg-white z-[2] absolute opacity-80" />
      </div>
    </>
  );
};

export default Home;
