import useScroll from '../../hooks/useScroll';
import arrowUp from '../../public/icons/arrowUp.svg';
import Image from 'next/image';

const GoToTopButton = () => {
  const { scrollPosition, scrollToTop } = useScroll();

  return (
    <button
      onClick={scrollToTop}
      className={`fixed flex items-center justify-center rounded-lg shadow-xl bottom-16 right-4 w-10 h-10 bg-black transform duration-300 ${
        scrollPosition >= 200 ? 'translate-x-0' : 'translate-x-16'
      }`}
    >
      <Image src={arrowUp} width={25} height={25} alt="go to top" />
    </button>
  );
};

export default GoToTopButton;
