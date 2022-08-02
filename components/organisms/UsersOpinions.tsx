import mysterious from '../../public/images/mysterious.jpg';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import jakeWebb from '../../public/images/jakeWebb.jpg';
import React, { useEffect, useRef } from 'react';
import OpinionPost, { OpinionPostTypes } from '../molecules/OpinionPost';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const UsersOpinions = () => {
  const ref = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element!.querySelector('#users-opinions-title'),
      {
        x: -50,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          scroller: 'body',
          trigger: element!.querySelector('#create-an-account'),
          start: 'top bottom-=50',
          end: 'top bottom-=50',
        },
      }
    );
  }, []);

  return (
    <section>
      <h3 className="font-raleway font-bold text-4xl text-white text-center my-10">Hear the crowd!</h3>
      <div ref={ref} className="relative w-full h-auto px-10 mb-7">
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
