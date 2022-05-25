import CreateAccount from '../../public/images/create-acc.svg';
import Image from 'next/image';
import DesktopHowToStartComponent from '../atoms/DesktopHowToStartComponent';

const DesktopHowToStartSection = () => {
  return (
    <div className="h-screen flex items-center justify-center w-screen">
      <DesktopHowToStartComponent title="Create an account">
        <p className="font-raleway">Sign in for free via Google, Github or Twitter</p>
        <Image src={CreateAccount} height={250} width={250} alt="Create Account" />
        <div className="w-full h-full absolute -z-10 top-5 left-5 bg-purple-600" />
      </DesktopHowToStartComponent>
    </div>
  );
};

export default DesktopHowToStartSection;
