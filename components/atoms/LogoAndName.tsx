import Image from 'next/image';
import LogoWhite from '../../public/icons/logo-white.svg';

const LogoAndName = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <Image src={LogoWhite} width={35} height={35} alt="white logo" />
      coding blog
    </div>
  );
};

export default LogoAndName;
