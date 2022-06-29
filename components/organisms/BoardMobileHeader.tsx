import useScroll, { ScrollDirection } from '../../hooks/useScroll';

const BoardMobileHeader = () => {
  const { scrollDirection, scrollPosition } = useScroll();

  return (
    <div
      className={`bg-black fixed top-0 flex flex-row items-center justify-between text-white px-2 w-screen transform duration-300 h-12 ${
        scrollDirection === ScrollDirection.UP || scrollPosition <= 20 ? 'translate-y-0' : '-translate-y-12'
      }`}
    >
      <p>icon</p>
      <p>CODING BLOG</p>
      <p>logout</p>
    </div>
  );
};

export default BoardMobileHeader;
