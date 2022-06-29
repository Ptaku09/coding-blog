import { MobileHowToStartComponent } from '../atoms/MobileHowToStartComponent';
import Image from 'next/image';
import NewPostBlack from '../../public/icons/new-post-black.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { RefObject, useEffect, useRef } from 'react';
import SampleUserPost from '../atoms/SampleUserPost';
import SamplePostCreator from '../atoms/SamplePostCreator';
import SampleSingInMenu from '../atoms/SampleSingInMenu';
import GradientLink from '../atoms/GradientLink';
import { useSession } from 'next-auth/react';

const MobileHowToStartSection = () => {
  const { status } = useSession();
  const ref = useRef() as RefObject<HTMLElement>;
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element!.querySelector('#create-an-account'),
      {
        x: -50,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        lazy: false,
        scrollTrigger: {
          scroller: 'body',
          trigger: element!.querySelector('#create-an-account'),
          start: 'top bottom-=50',
          end: 'top bottom-=50',
        },
      }
    );
  }, []);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element!.querySelector('#share-your-code'),
      {
        x: 50,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        lazy: false,
        scrollTrigger: {
          scroller: 'body',
          trigger: element!.querySelector('#share-your-code'),
          start: 'top bottom-=50',
          end: 'top bottom-=50',
        },
      }
    );
  }, []);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element!.querySelector('#wait-for-reactions'),
      {
        x: -50,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        lazy: false,
        scrollTrigger: {
          scroller: 'body',
          trigger: element!.querySelector('#wait-for-reactions'),
          start: 'top bottom-=50',
          end: 'top bottom-=50',
        },
      }
    );
  }, []);

  return (
    <section className="flex items-center justify-start flex-col w-screen h-auto px-6" ref={ref}>
      <MobileHowToStartComponent title="Create an account">
        <p className="mb-4 p-1 font-raleway text-lg text-center">Sign in for free via Google, Github or Twitter.</p>
        <SampleSingInMenu />
      </MobileHowToStartComponent>
      <MobileHowToStartComponent title="Share your code">
        <p className="mb-4 p-1 font-raleway text-lg text-center">
          Click the <Image src={NewPostBlack} width={13} height={13} alt="new post" /> button and add your code with short comment.
        </p>
        <SamplePostCreator />
      </MobileHowToStartComponent>
      <MobileHowToStartComponent title="Wait for reactions">
        <p className="mb-4 p-1 font-raleway text-lg text-center">Share your knowledge and gain reactions!</p>
        <SampleUserPost />
      </MobileHowToStartComponent>
      <GradientLink text={status === 'authenticated' ? 'go to board' : 'Login'} direction={status === 'authenticated' ? '/board' : '/signin'} />
    </section>
  );
};

export default MobileHowToStartSection;
