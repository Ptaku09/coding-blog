import useScroll from '../../hooks/useScroll';

const GoToTopButton = () => {
  const { scrollPosition, scrollToTop } = useScroll();

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-16 right-4 w-10 h-10 bg-black transform duration-300 ${scrollPosition >= 200 ? 'translate-x-0' : 'translate-x-14'}`}
    >
      <p>go</p>
    </button>
  );
};

export default GoToTopButton;
