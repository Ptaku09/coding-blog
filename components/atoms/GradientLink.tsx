import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

type Props = {
  text: string;
  direction: string;
};

const GradientLink = ({ text, direction }: Props) => {
  const ref = useRef() as RefObject<HTMLAnchorElement>;
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
    <Link href={direction}>
      <a
        ref={ref}
        className="w-1/2 md:w-1/6 h-12 mb-8 rounded-md flex items-center justify-center text-xl text-white font-bebas bg-gradient-to-tr from-purple-600 to-blue-500 bg-[length:400%_400%] animate-gradientBackground"
      >
        {text.toUpperCase()}
      </a>
    </Link>
  );
};

export default GradientLink;
