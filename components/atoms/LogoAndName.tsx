import Image from 'next/image';
import LogoWhite from '../../public/icons/logo-white.svg';

const LogoAndName = () => {
  return (
    <div className="flex items-center justify-center gap-3 font-raleway font-[500]">
      <Image src={LogoWhite} width={35} height={35} alt="white logo" />
      <p>coding blog</p>
    </div>
  );
};

export default LogoAndName;
