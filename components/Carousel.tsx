import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const Carousel = ({ children }: { children: React.ReactElement[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const loadingBarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevState: number) => (prevState + 1) % children.length);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  });

  //handle loading animation to restart after every slide
  useEffect(() => {
    loadingBarRef.current!.className =
      'absolute left-1/2 right-1/2 -translate-x-1/2 top-3 w-16 h-1 before:-translate-x-full bg-gray-200 rounded-full overflow-hidden before:animate-none before:absolute before:bg-blue-500 before:w-full before:rounded-full before:h-full';

    setTimeout(() => {
      loadingBarRef.current!.className =
        'absolute left-1/2 right-1/2 -translate-x-1/2 top-3 w-16 h-1 before:-translate-x-full bg-gray-200 rounded-full overflow-hidden before:animate-sliding before:absolute before:bg-blue-500 before:w-full before:rounded-full before:h-full';
    }, 200);
  }, [activeIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((prevState: number) => (prevState + 1) % children.length),
    onSwipedRight: () => setActiveIndex((prevState: number) => (prevState - 1 + children.length) % children.length),
  });

  return (
    <div {...handlers} className="relative mt-5 md:mt-0 overflow-hidden w-[32rem] scale-[70%] md:scale-100">
      <div style={{ transform: `translate(${-100 * activeIndex}%)` }} className="whitespace-nowrap transition-transform duration-500">
        {children}
      </div>
      <div className="absolute bottom-4 left-1/2 right-1/2 -translate-x-1/2 flex flex-row gap-2 w-10">
        {React.Children.map(children, (child: React.ReactElement, index: number) => (
          <button className={`p-1 rounded-full ${activeIndex === index ? 'bg-purple-700' : 'bg-gray-200'}`} onClick={() => setActiveIndex(index)} />
        ))}
      </div>
      <span
        ref={loadingBarRef}
        className="absolute left-1/2 right-1/2 -translate-x-1/2 top-3 w-16 h-1 bg-gray-200 rounded-full overflow-hidden before:animate-sliding before:absolute before:bg-blue-500 before:-translate-x-full before:w-full before:rounded-full before:h-full"
      />
    </div>
  );
};
