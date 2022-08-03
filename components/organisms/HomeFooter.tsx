import LogoAndName from '../atoms/LogoAndName';
import GithubWhite from '../../public/icons/github-white.svg';
import TwitterWhite from '../../public/icons/twitter-white.svg';
import InstagramWhite from '../../public/icons/instagram-white.svg';
import Image from 'next/image';

const HomeFooter = () => {
  return (
    <div className="w-screen relative z-[2] p-3 pt-14 pb-0 md:p-5 min-h-56 md:min-h-0 h-auto bg-black text-white grid grid-rows-[1fr_2fr_1fr] font-bebas md:flex md:justify-around">
      <div className="flex justify-start text-xl border-b-[1px] md:border-0 pb-0">
        <LogoAndName />
      </div>
      <div className="flex justify-center items-center md:justify-start gap-8">
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
      <div className="flex items-center justify-between w-full md:w-auto text-sm">
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

export default HomeFooter;
