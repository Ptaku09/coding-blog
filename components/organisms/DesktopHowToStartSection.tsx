import CreateAccount from '../../public/images/create-acc.svg';
import WaitForReactions from '../../public/images/wait-for-reactions.svg';
import ShareYourCode from '../../public/images/share-your-code.svg';
import Image from 'next/image';
import DesktopHowToStartComponent from '../atoms/DesktopHowToStartComponent';
import NewPostBlack from '../../public/icons/new-post-black.svg';
import React from 'react';

enum componentType {
  LEFT = 'left',
  RIGHT = 'right',
}

const DesktopHowToStartSection = () => {
  return (
    <div className="h-auto w-screen grid grid-rows-3 pt-10 pb-20">
      <div className="w-1/2 h-auto flex items-center justify-end p-10">
        <DesktopHowToStartComponent title="Create an account">
          <p className="font-raleway w-80 text-center">Sign in for free via Google, Github or Twitter</p>
          <a href="https://storyset.com/technology" target="_blank" rel="noreferrer">
            <Image src={CreateAccount} height={250} width={250} alt="Create Account" />
          </a>
          <div className="w-full h-full absolute -z-10 top-5 right-5 bg-purple-600" />
        </DesktopHowToStartComponent>
      </div>
      <div className="w-screen h-auto flex justify-end">
        <div className="w-1/2 h-auto flex items-center justify-start p-10">
          <DesktopHowToStartComponent title="Share your code">
            <p className="font-raleway w-80 text-center">
              Click the <Image src={NewPostBlack} width={13} height={13} alt="new post" /> button and add your code with short comment.
            </p>
            <a href="https://storyset.com/technology" target="_blank" rel="noreferrer">
              <Image src={ShareYourCode} height={250} width={250} alt="Create Account" />
            </a>
            <div className="w-full h-full absolute -z-10 top-5 left-5 bg-purple-600" />
          </DesktopHowToStartComponent>
        </div>
      </div>
      <div className="w-1/2 h-auto flex items-center justify-end p-10">
        <DesktopHowToStartComponent title="Wait for reactions">
          <p className="font-raleway w-80 text-center">Share your knowledge and gain reactions!</p>
          <a href="https://storyset.com/technology" target="_blank" rel="noreferrer">
            <Image src={WaitForReactions} height={250} width={250} alt="Create Account" />
          </a>
          <div className="w-full h-full absolute -z-10 top-5 right-5 bg-purple-600" />
        </DesktopHowToStartComponent>
      </div>
    </div>
  );
};

export default DesktopHowToStartSection;
