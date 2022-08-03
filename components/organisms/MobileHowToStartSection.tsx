import { MobileHowToStartComponent } from '../atoms/MobileHowToStartComponent';
import Image from 'next/image';
import NewPostBlack from '../../public/icons/new-post-black.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import SampleUserPost from '../atoms/SampleUserPost';
import SamplePostCreator from '../atoms/SamplePostCreator';
import SampleSingInMenu from '../atoms/SampleSingInMenu';
import GradientLink from '../atoms/GradientLink';
import { useSession } from 'next-auth/react';

const MobileHowToStartSection = () => {
  const { status } = useSession();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const components: HTMLDivElement[] = gsap.utils.toArray('.mobile-how-to-start-component');

    components.forEach((component: HTMLDivElement) => {
      gsap.fromTo(
        component,
        {
          scale: 0.7,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          lazy: false,
          scrollTrigger: {
            scrub: 1,
            scroller: 'body',
            trigger: component,
            start: 'top bottom-=50',
            end: 'top bottom-=50',
          },
        }
      );
    });
  }, []);

  return (
    <section className="flex items-center justify-start flex-col w-screen h-auto px-6">
      <MobileHowToStartComponent title="Create an account">
        <p className="mb-4 p-1 font-raleway font-[500] text-lg text-center">Sign in for free via Google, Github or Twitter.</p>
        <SampleSingInMenu />
      </MobileHowToStartComponent>
      <MobileHowToStartComponent title="Share your code">
        <p className="mb-4 p-1 font-raleway font-[500] text-lg text-center">
          Click the{' '}
          <span>
            <Image src={NewPostBlack} width={13} height={13} alt="new post" />
          </span>{' '}
          button and add your code with short comment.
        </p>
        <SamplePostCreator />
      </MobileHowToStartComponent>
      <MobileHowToStartComponent title="Wait for reactions">
        <p className="mb-4 p-1 font-raleway font-[500] text-lg text-center">Share your knowledge and gain reactions!</p>
        <SampleUserPost />
      </MobileHowToStartComponent>
      <GradientLink text={status === 'authenticated' ? 'go to board' : 'Login'} direction={status === 'authenticated' ? '/board' : '/signin'} />
    </section>
  );
};

export default MobileHowToStartSection;
