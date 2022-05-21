import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

type Props = {
  text: string;
  onClickFunc: () => void;
};

const GradientButton = ({ text, onClickFunc }: Props) => {
  const ref = useRef() as RefObject<HTMLButtonElement>;
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element,
      {
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        lazy: false,
        scrollTrigger: {
          scrub: 1,
          scroller: 'body',
          trigger: element,
          start: 'top bottom-=50',
          end: 'top bottom-=50',
        },
      }
    );
  }, []);

  return (
    <button
      ref={ref}
      className="w-1/2 h-12 mb-8 rounded-md flex items-center justify-center text-xl text-white font-bebas bg-gradient-to-tr from-purple-600 to-blue-500 bg-[length:400%_400%] animate-gradientBackground"
      onClick={onClickFunc}
    >
      {text.toUpperCase()}
    </button>
  );
};

export default GradientButton;
