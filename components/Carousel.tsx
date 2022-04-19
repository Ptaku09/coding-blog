import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const Carousel = ({ children }: { children: React.ReactElement[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevState: number) => (prevState + 1) % children.length);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((prevState: number) => (prevState + 1) % children.length),
    onSwipedRight: () => setActiveIndex((prevState: number) => (prevState - 1 + children.length) % children.length),
  });

  return (
    <div {...handlers} className="relative overflow-hidden w-[32rem]">
      <div className={`-translate-x-[${100 * activeIndex}%] whitespace-nowrap transition-transform duration-500`}>{children}</div>
      <div className="absolute bottom-4 left-1/2 right-1/2 -translate-x-1/2 flex flex-row gap-2 w-10">
        {React.Children.map(children, (child: React.ReactElement, index: number) => (
          <button className={`p-1 rounded-full ${activeIndex === index ? 'bg-purple-700' : 'bg-gray-200'}`} onClick={() => setActiveIndex(index)} />
        ))}
      </div>
      <span className="absolute left-1/2 right-1/2 -translate-x-1/2 top-3 w-16 h-1 bg-gray-200 rounded-full overflow-hidden before:animate-sliding before:absolute before:bg-blue-500 before:w-full before:rounded-full before:h-full" />
    </div>
  );
};
