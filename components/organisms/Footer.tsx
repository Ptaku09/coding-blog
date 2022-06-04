import LogoAndName from '../atoms/LogoAndName';
import GithubWhite from '../../public/icons/github-white.svg';
import TwitterWhite from '../../public/icons/twitter-white.svg';
import InstagramWhite from '../../public/icons/instagram-white.svg';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="w-screen relative z-[2] p-3 min-h-56 h-auto bg-black text-white grid grid-rows-[1fr_4fr_1fr] font-bebas">
      <div className="flex justify-start text-xl border-b-[1px] pb-2">
        <LogoAndName />
      </div>
      <div className="grid grid-cols-2 md:flex md:items-center md:justify-center md:gap-56 md:bg-black pt-5 px-5">
        <div className="flex flex-col justify-start items-start gap-4">
          <p className="text-xl">Follow me!</p>
          <a className="flex items-center justify-center gap-1" href="https://github.com/Ptaku09" target="_blank" rel="noreferrer">
            <Image src={GithubWhite} width={22} height={22} alt="github" />
            <p className="text-sm">@Ptaku09</p>
          </a>
          <a className="flex items-center justify-center gap-1" href="https://twitter.com/Ptaku09" target="_blank" rel="noreferrer">
            <Image src={TwitterWhite} width={20} height={20} alt="twitter" />
            <p className="text-sm">@Ptaku09</p>
          </a>
          <a className="flex items-center justify-center gap-1" href="https://www.instagram.com/ptaku08" target="_blank" rel="noreferrer">
            <Image src={InstagramWhite} width={20} height={20} alt="twitter" />
            <p className="text-sm">@Ptaku08</p>
          </a>
        </div>
        <div className="flex flex-col justify-start items-start gap-4 pl-5">
          <p className="text-xl">About</p>
          <p className="text-sm">Privacy</p>
          <p className="text-sm">Policy</p>
          <p className="text-sm">Terms</p>
        </div>
      </div>
      <div className="flex items-end justify-between w-full text-sm">
        <p>
          <span className="after:content-['❤'] after:mx-1">Created with</span>
          by{' '}
          <a className="text-blue-500" href="https://github.com/Ptaku09" target="_blank" rel="noreferrer">
            Ptaku09
          </a>{' '}
          ©2022
        </p>
      </div>
    </div>
  );
};

export default Footer;
