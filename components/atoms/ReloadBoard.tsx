import { useRouter } from 'next/router';
import useScroll from '../../hooks/useScroll';
import Image from 'next/image';
import Refresh from '../../public/icons/refresh-white.svg';

const ReloadBoard = () => {
  const router = useRouter();
  const { scrollPosition } = useScroll();

  const handleReload = () => {
    sessionStorage.clear();
    router.reload();
  };

  return (
    <button
      className={`fixed z-20 bottom-28 flex items-center justify-center rounded-lg shadow-xl border-[1px] border-white right-4 bg-gray-500 h-10 w-10 transform duration-300 ${
        scrollPosition >= 200 ? 'translate-y-0' : 'translate-y-12'
      }`}
      onClick={handleReload}
    >
      <Image src={Refresh} width={25} height={25} alt="reload" />
    </button>
  );
};

export default ReloadBoard;
