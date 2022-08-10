import CreateAccount from '../../public/images/create-acc.svg';
import WaitForReactions from '../../public/images/wait-for-reactions.svg';
import ShareYourCode from '../../public/images/share-your-code.svg';
import Image from 'next/image';
import DesktopHowToStartComponentLeft from '../atoms/DesktopHowToStartComponentLeft';
import NewPostBlack from '../../public/icons/new-post-black.svg';
import React, { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import DesktopHowToStartComponentRight from '../atoms/DesktopHowToStartComponentRight';
import LoremIpsumForHTS from '../atoms/LoremIpsumForHTS';
import DesktopHowToStartModule from '../molecules/DesktopHowToStartModule';

const DesktopHowToStartSection = () => {
  const ref = useRef() as RefObject<HTMLElement>;
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element!.querySelector('#create-an-account-bg'),
      {
        x: -70,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        lazy: false,
        scrollTrigger: {
          scroller: 'body',
          scrub: 1,
          trigger: element!.querySelector('#create-an-account-bg'),
          start: 'top bottom-=160',
          end: 'top bottom-=200',
        },
      }
    );

    gsap.fromTo(
      element!.querySelector('#create-an-account'),
      {
        x: 70,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        lazy: false,
        scrollTrigger: {
          scroller: 'body',
          scrub: 1,
          trigger: element!.querySelector('#create-an-account'),
          start: 'top bottom-=180',
          end: 'top bottom-=220',
        },
      }
    );
  }, []);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element!.querySelector('#share-your-code-bg'),
      {
        x: 70,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        lazy: false,
        scrollTrigger: {
          scroller: 'body',
          scrub: 1,
          trigger: element!.querySelector('#share-your-code-bg'),
          start: 'top bottom-=160',
          end: 'top bottom-=200',
        },
      }
    );

    gsap.fromTo(
      element!.querySelector('#share-your-code'),
      {
        x: -70,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        lazy: false,
        scrollTrigger: {
          scroller: 'body',
          scrub: 1,
          trigger: element!.querySelector('#share-your-code'),
          start: 'top bottom-=180',
          end: 'top bottom-=220',
        },
      }
    );
  }, []);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element!.querySelector('#wait-for-reactions-bg'),
      {
        x: -70,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        lazy: false,
        scrollTrigger: {
          scroller: 'body',
          scrub: 1,
          trigger: element!.querySelector('#wait-for-reactions-bg'),
          start: 'top bottom-=160',
          end: 'top bottom-=200',
        },
      }
    );

    gsap.fromTo(
      element!.querySelector('#wait-for-reactions'),
      {
        x: 70,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        lazy: false,
        scrollTrigger: {
          scroller: 'body',
          scrub: 1,
          trigger: element!.querySelector('#wait-for-reactions'),
          start: 'top bottom-=180',
          end: 'top bottom-=220',
        },
      }
    );
  }, []);

  useEffect(() => {
    const texts: HTMLDivElement[] = gsap.utils.toArray('.desktop-how-to-start-text');

    texts.forEach((text: HTMLDivElement) => {
      gsap.fromTo(
        text,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          scrollTrigger: {
            scroller: 'body',
            scrub: 1,
            trigger: text,
            start: 'top bottom-=230',
            end: 'top bottom-=272',
          },
        }
      );
    });
  });

  return (
    <section className="h-auto w-full grid grid-rows-3 pt-10 pb-20" ref={ref}>
      <DesktopHowToStartModule>
        <div className="flex items-center justify-end p-10">
          <DesktopHowToStartComponentLeft title="Create an account">
            <p className="font-raleway w-80 text-center">Sign in for free via Google, Github or Twitter</p>
            <a href="https://storyset.com/technology" target="_blank" rel="noreferrer">
              <Image src={CreateAccount} height={250} width={250} alt="Create Account" />
            </a>
          </DesktopHowToStartComponentLeft>
        </div>
        <LoremIpsumForHTS />
      </DesktopHowToStartModule>
      <DesktopHowToStartModule>
        <div className="p-10 font-raleway flex justify-center items-end flex-col">
          <LoremIpsumForHTS />
        </div>
        <div className="flex items-center justify-start p-10">
          <DesktopHowToStartComponentRight title="Share your code">
            <p className="font-raleway w-80 text-center">
              Click the <Image src={NewPostBlack} width={13} height={13} alt="new post" /> button and add your code with short comment.
            </p>
            <a href="https://storyset.com/technology" target="_blank" rel="noreferrer">
              <Image src={ShareYourCode} height={250} width={250} alt="Create Account" />
            </a>
          </DesktopHowToStartComponentRight>
        </div>
      </DesktopHowToStartModule>
      <DesktopHowToStartModule>
        <div className="flex items-center justify-end p-10">
          <DesktopHowToStartComponentLeft title="Wait for reactions">
            <p className="font-raleway w-80 text-center">Share your knowledge and gain reactions!</p>
            <a href="https://storyset.com/technology" target="_blank" rel="noreferrer">
              <Image src={WaitForReactions} height={250} width={250} alt="Create Account" />
            </a>
          </DesktopHowToStartComponentLeft>
        </div>
        <LoremIpsumForHTS />
      </DesktopHowToStartModule>
    </section>
  );
};

export default DesktopHowToStartSection;
