import SwipeBlack from '../../public/icons/swipe-black.svg';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useScroll from '../../hooks/useScroll';
import useBreakpointDetector from '../../hooks/useBreakpointDetector';

const PopupTutorial = () => {
  const [isShown, setIsShown] = useState(false);
  const { lockScroll, unlockScroll } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const { isBreakpoint } = useBreakpointDetector(ref, 770);

  useEffect(() => {
    if (!localStorage.getItem('popup-tutorial')) {
      lockScroll();
      setIsShown(true);
    }
  }, [lockScroll]);

  const handleGotIt = () => {
    localStorage.setItem('popup-tutorial', 'true');
    unlockScroll();
    setIsShown(false);
  };

  return isShown && isBreakpoint ? (
    <div
      ref={ref}
      className="fixed z-50 w-screen h-screen bg-white bg-opacity-90 dark:bg-gray-500 dark:bg-opacity-90 flex items-center justify-center flex-col grid grid-cols-[1fr_4rem] animate-appearing"
    >
      <div className="flex items-center justify-center flex-col font-edu-sa">
        <p className="absolute -translate-y-32 text-4xl underline dark:text-black">Slide on right side!</p>
        <div className="w-auto h-auto flex items-center justify-center animate-swipe">
          <Image src={SwipeBlack} height={150} width={150} alt="swipe" priority />
        </div>
        <button onClick={handleGotIt} className="absolute translate-y-36 bg-black text-white text-xl px-8 py-2 rounded-xl">
          Got it!
        </button>
      </div>
      <div className="w-full h-full outline-4 outline-dashed outline-black bg-gradient-to-tr from-blue-500 to-purple-600 bg-endless-pattern" />
    </div>
  ) : null;
};

export default PopupTutorial;
