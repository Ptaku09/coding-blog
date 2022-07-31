import { RefObject, useEffect, useState } from 'react';

type UseElementOnScreenReturnType = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
) => { isVisible: boolean };

const useElementOnScreen: UseElementOnScreenReturnType = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    setIsVisible(entries[0].isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const current = ref.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [ref, options]);

  return {
    isVisible,
  };
};

export default useElementOnScreen;
