import mysterious from '../../public/images/mysterious.jpg';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import jakeWebb from '../../public/images/jakeWebb.jpg';
import React, { useEffect } from 'react';
import OpinionPost, { OpinionPostTypes } from '../molecules/OpinionPost';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const UsersOpinions = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const dots: HTMLDivElement[] = gsap.utils.toArray('.opinion-dot');
    const usersInfo: HTMLDivElement[] = gsap.utils.toArray('.opinion-info');
    const comments: HTMLParagraphElement[] = gsap.utils.toArray('.opinion-comment');

    dots.forEach((dot: HTMLDivElement) => {
      gsap.fromTo(
        dot,
        {
          scale: 0.7,
        },
        {
          scale: 1,
          backgroundColor: '#ccc',
          lazy: false,
          scrollTrigger: {
            scrub: 1,
            scroller: 'body',
            trigger: dot,
            start: 'top bottom-=93',
            end: 'top bottom-=93',
          },
        }
      );
    });

    usersInfo.forEach((info: HTMLDivElement) => {
      gsap.fromTo(
        info,
        {
          x: -25,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          lazy: false,
          scrollTrigger: {
            scrub: 1,
            scroller: 'body',
            trigger: info,
            start: 'top bottom-=110',
            end: 'top bottom-=110',
          },
        }
      );
    });

    comments.forEach((comment: HTMLParagraphElement) => {
      gsap.fromTo(
        comment,
        {
          x: 25,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          lazy: false,
          scrollTrigger: {
            scrub: 1,
            scroller: 'body',
            trigger: comment,
            start: 'top bottom-=50',
            end: 'top bottom-=50',
          },
        }
      );
    });
  }, []);

  return (
    <section className="-mt-10">
      <h3 className="font-raleway font-bold text-4xl text-white text-center my-10">Hear the crowd!</h3>
      <div className="relative w-full h-auto px-10 mb-14">
        <ul className="flex flex-col gap-16 py-5 after:absolute after:top-0 after:-translate-x-5 after:block after:w-[2px] after:h-full after:bg-gray-300">
          {[
            {
              username: 'Mysterious',
              role: 'Front-end dev',
              avatar: mysterious,
              commentBegin: 'I take a lot of inspiration from the Coding Blog. To my mind ',
              commentHighlight: 'every frontend developer should check out',
              commentEnd: " this blog. It's great.",
            },
            {
              username: 'CodingMaster09',
              role: 'Back-end dev',
              avatar: defaultAvatar,
              commentBegin: 'Coding Blog is a place where you can share your knowledge and experience with other' + " people. It's an ",
              commentHighlight: 'amazing feeling when someone appreciates',
              commentEnd: ' your idea!',
            },
            {
              username: 'JakeWebb123',
              role: 'Devops',
              avatar: jakeWebb,
              commentBegin:
                "My name is Jake and I'm a devops engineer. Coding Blog is something between" +
                " Twitter and Pinterest. It's hard to explain it in few sentences. ",
              commentHighlight: 'You must try it on your own!',
              commentEnd: '',
            },
          ].map((data: OpinionPostTypes) => (
            <li key={data.username} className="relative flex flex-col items-start gap-2">
              <OpinionPost data={data} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UsersOpinions;
