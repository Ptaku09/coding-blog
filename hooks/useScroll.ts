import { useCallback, useEffect, useState } from 'react';

export enum ScrollDirection {
  UP = 'up',
  DOWN = 'down',
}

type UseScrollReturnType = {
  scrollPosition: number;
  scrollDirection: ScrollDirection;
  scrollToTop: () => void;
};

const useScroll = (): UseScrollReturnType => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(ScrollDirection.DOWN);

  const handleScroll = useCallback(() => {
    if (scrollPosition > window.scrollY) setScrollDirection(ScrollDirection.UP);
    else if (scrollPosition < window.scrollY) setScrollDirection(ScrollDirection.DOWN);

    setScrollPosition(window.scrollY);
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return {
    scrollPosition,
    scrollDirection,
    scrollToTop,
  };
};

export default useScroll;
