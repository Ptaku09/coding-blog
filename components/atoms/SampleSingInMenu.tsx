import Image from 'next/image';
import Google from '../../public/icons/google.svg';
import GithubBlack from '../../public/icons/github-black.svg';
import Twitter from '../../public/icons/twitter.svg';

const SampleSingInMenu = () => {
  return (
    <div className="w-full h-auto p-2 flex items-center justify-start flex-col border-[1px] border-gray-300 shadow-lg rounded-md">
      <p className="mb-3 border-b-[1px] border-gray-300 px-10 font-raleway">SIGN IN</p>
      <div className="w-3/5 h-12 bg-gray-100 border-[1px] border-gray-300 flex items-center justify-center p-4">
        <Image src={Google} width={25} height={25} alt="google" />
      </div>
      <div className="w-3/5 h-12 bg-gray-100 border-[1px] border-gray-300 flex items-center justify-center p-4 my-2">
        <Image src={GithubBlack} width={25} height={25} alt="github" />
      </div>
      <div className="w-3/5 h-12 bg-gray-100 border-[1px] border-gray-300 flex items-center justify-center p-4">
        <Image src={Twitter} width={25} height={25} alt="twitter" />
      </div>
    </div>
  );
};

export default SampleSingInMenu;
