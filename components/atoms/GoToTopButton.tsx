import useScroll from '../../hooks/useScroll';
import arrowUp from '../../public/icons/arrow-up.svg';
import Image from 'next/image';

const GoToTopButton = () => {
  const { scrollPosition, scrollToTop } = useScroll();

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-20 flex items-center justify-center rounded-lg shadow-xl bottom-16 right-4 w-10 h-10 bg-black dark:border-white dark:border-[1px] transform duration-300 ${
        scrollPosition >= 200 ? 'translate-x-0' : 'translate-x-16'
      }`}
    >
      <Image src={arrowUp} width={25} height={25} alt="go to top" />
    </button>
  );
};

export default GoToTopButton;
