import Image from 'next/image';
import Heart from '../../public/icons/heart.svg';
import Share from '../../public/icons/share.svg';
import Copy from '../../public/icons/copy.svg';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const sampleText = `public static void main(String[] args) {
  System.out.println("Hello, World!");
}
`;

const BoardPost = () => {
  return (
    <div className="w-screen h-auto bg-white border-b-[1px] text-black flex flex-col items-start justify-between px-4 pt-4 animate-appearing-short">
      <div className="w-full border-b-[1px]">
        <div className="flex flex-row items-center gap-3 font-raleway font-bold">
          <Image className="rounded-full" objectFit="cover" src={defaultAvatar} width={40} height={40} alt="avatar" />
          <p>nickname</p>
        </div>
        <div className="py-2 font-raleway border-b-[1px] mb-2">
          <p>This is sample comment in comment section. Here you can describe your code.</p>
        </div>
        <SyntaxHighlighter language="java" showLineNumbers={true} wrapLines={true}>
          {sampleText}
        </SyntaxHighlighter>
      </div>
      <div className="w-full my-6 grid grid-cols-2">
        <div className="flex items-center justify-center gap-2">
          <Image src={Heart} width={20} height={20} className="scale-90 md:hover:scale-100 animate-scale" alt="heart" />
          <p>23k</p>
        </div>
        <div className="flex items-center justify-around">
          <Image src={Share} width={18} height={18} alt="share" />
          <Image src={Copy} width={18} height={18} alt="copy" />
        </div>
      </div>
    </div>
  );
};

export default BoardPost;
