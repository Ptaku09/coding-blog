import { createContext, ReactChild, ReactChildren, ReactNode, RefObject, useRef } from 'react';

interface ScrollRestorationContextProps {
  scrollRef: RefObject<{ [key: string]: number }>;
}

export const ScrollRestorationContext = createContext<ScrollRestorationContextProps>({} as ScrollRestorationContextProps);

const ScrollRestorationProvider = ({ children }: { children: ReactChild | ReactChildren | ReactNode }) => {
  const scrollRef = useRef<{ [key: string]: number }>({
    scrollPosition: 0,
  });

  return <ScrollRestorationContext.Provider value={{ scrollRef }}>{children}</ScrollRestorationContext.Provider>;
};

export default ScrollRestorationProvider;
