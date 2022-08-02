import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Curiosity = () => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element?.querySelector('#curiosity-title') as HTMLDivElement,
      {
        x: -window.innerWidth,
      },
      {
        x: 0,
        lazy: false,
        scrollTrigger: {
          scrub: 1,
          scroller: 'body',
          trigger: element,
          start: 'top bottom-=150',
          end: 'top bottom-=150',
        },
      }
    );

    gsap.fromTo(
      element?.querySelector('#curiosity-content') as HTMLDivElement,
      {
        x: window.innerWidth,
      },
      {
        x: 0,
        lazy: false,
        scrollTrigger: {
          scrub: 1,
          scroller: 'body',
          trigger: element,
          start: 'top bottom-=170',
          end: 'top bottom-=170',
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className="mt-16 shadow-2xl text-black">
      <div id="curiosity-title" className="w-screen h-16 bg-curiosity bg-cover text-white font-bebas text-3xl flex items-center justify-center">
        <p className="bg-black p-1">Did you know that...?</p>
      </div>
      <div id="curiosity-content" className="w-screen h-44 relative font-raleway font-[500] text-xl p-5 flex items-center flex-col bg-white">
        <p>Many people claims, crowd opinion is much more reliable then any description.</p>
        <span className="w-3/5 h-[2px] bg-black absolute bottom-5" />
      </div>
    </div>
  );
};

export default Curiosity;
