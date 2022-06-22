import TypingAnimation from '../components/atoms/TypingAnimation';
import Google from '../public/icons/google.svg';
import GithubBlack from '../public/icons/github-black.svg';
import Twitter from '../public/icons/twitter-black.svg';
import Image from 'next/image';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const Signin = () => {
  return (
    <div className="w-screen h-screen p-10 bg-cover bg-signin-page-mobile md:bg-signin-page-desktop flex flex-col font-raleway text-2xl text-black">
      <TypingAnimation baseText={`Sign in via...`} textsToAnimate={['Google', 'Twitter', 'Github']} />
      <div className="w-full md:w-1/3 my-8 flex flex-col items-center gap-6 border-y-[1px] border-gray-500 py-6 px-12">
        <button
          onClick={() => signIn('google')}
          className="w-full h-auto flex flex-row items-center justify-center gap-3 border-[1px] py-3 transform duration-500 hover:bg-gray-300"
        >
          <p>Google</p>
          <Image src={Google} width={25} height={25} alt="google" />
        </button>
        <button
          onClick={() => signIn('twitter')}
          className="w-full h-auto flex flex-row items-center justify-center gap-3 border-[1px] py-3 transform duration-500 hover:bg-gray-300"
        >
          <p>Twitter</p>
          <Image src={Twitter} width={25} height={25} alt="twitter" />
        </button>
        <button
          onClick={() => signIn('github')}
          className="w-full h-auto flex flex-row items-center justify-center gap-3 border-[1px] py-3 transform duration-500 hover:bg-gray-300"
        >
          <p>Github</p>
          <Image src={GithubBlack} width={25} height={25} alt="google" />
        </button>
      </div>
    </div>
  );
};

export default Signin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
