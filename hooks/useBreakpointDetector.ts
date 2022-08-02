import { RefObject, useCallback, useEffect, useState } from 'react';

type UseBreakpointDetectorReturnType = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  breakpoint: number
) => { isBreakpoint: boolean; dimensions: { width: number; height: number } };

const useBreakpointDetector: UseBreakpointDetectorReturnType = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, breakpoint: number) => {
  const [isBreakpointAchieved, setIsBreakpointAchieved] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const callback = useCallback(
    (entries: ResizeObserverEntry[]) => {
      const { width, height } = entries[0].contentRect;
      setIsBreakpointAchieved(width < breakpoint);
      setWidth(width);
      setHeight(height);
    },
    [breakpoint]
  );

  useEffect(() => {
    const observer = new ResizeObserver(callback);
    const current = ref.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [callback, ref]);

  return {
    isBreakpoint: isBreakpointAchieved,
    dimensions: {
      width,
      height,
    },
  };
};

export default useBreakpointDetector;
