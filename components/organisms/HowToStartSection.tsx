import { HowToStartComponent } from '../atoms/HowToStartComponent';
import Image from 'next/image';
import Google from '../../assets/google.svg';
import Twitter from '../../assets/twitter.svg';
import GithubBlack from '../../assets/github-black.svg';
import NewPostBlack from '../../assets/new-post-black.svg';
import SubmitBlack from '../../assets/submit-black.svg';

const HowToStartSection = () => {
  return (
    <section className="flex items-center justify-start flex-col w-screen h-auto px-6">
      <h3 className="relative text-black text-4xl font-raleway mt-16 mb-5">
        <span id="how-to-start" className="absolute -top-5" />
        How to start?
      </h3>
      <HowToStartComponent componentNumber={1} title="Create an account">
        <ul className="list-disc pl-4 mt-5">
          <li>Click the triangle above or swipe it down</li>
          <li>
            Then sign in via <Image src={Google} width={17} height={17} alt="google" />, <Image src={Twitter} width={17} height={17} alt="twitter" />{' '}
            or <Image src={GithubBlack} width={17} height={17} alt="github" />
          </li>
        </ul>
      </HowToStartComponent>
      <HowToStartComponent componentNumber={2} title="Share your code">
        <ul className="list-disc pl-4 mt-5">
          <li>
            Click the <Image src={NewPostBlack} width={17} height={17} alt="new post" /> button
          </li>
          <li>Paste your code or select a file</li>
          <li>
            Add a short comment and submit your code via <Image src={SubmitBlack} width={17} height={17} alt="submit" /> button
          </li>
        </ul>
      </HowToStartComponent>
      <HowToStartComponent componentNumber={3} title="Wait for reactions">
        <p className="absolute left-8 mt-5 w-full text-left">Show yourself to the world!</p>
      </HowToStartComponent>
    </section>
  );
};

export default HowToStartSection;
