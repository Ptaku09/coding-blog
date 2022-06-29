import Image from 'next/image';
import Heart from '../../public/icons/heart.svg';
import ShareBlack from '../../public/icons/share-black.svg';
import CopyBlack from '../../public/icons/copy-black.svg';
import ShareWhite from '../../public/icons/share-white.svg';
import CopyWhite from '../../public/icons/copy-white.svg';
import defaultAvatar from '../../public/images/defaultAvatar.jpg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const sampleText = `public static void main(String[] args) {
  System.out.println("Hello, World!");
}
`;

const BoardPost = () => {
  const { theme } = useTheme();
  const [themeMode, setThemeMode] = useState('dark');

  //omit hydration effect
  useEffect(() => {
    setThemeMode(theme || 'dark');
  }, [theme]);

  return (
    <div className="w-screen h-auto bg-white dark:bg-[#0e172a] dark:text-white dark:border-[#2e3336] border-b-[1px] text-black flex flex-col items-start justify-between px-4 pt-4 animate-appearing-short">
      <div className="w-full border-b-[1px] dark:border-[#2e3336]">
        <div className="flex flex-row items-center gap-3 font-raleway font-bold">
          <div className="w-9 h-9 rounded-full border-[1px] border-white overflow-hidden">
            <Image src={defaultAvatar} width={45} height={45} objectFit="cover" alt="avatar" />
          </div>
          <p>nickname</p>
        </div>
        <div className="py-2 font-raleway border-b-[1px] dark:border-[#2e3336] mb-2">
          <p>This is sample comment in comment section. Here you can describe your code.</p>
        </div>
        <SyntaxHighlighter language="java" showLineNumbers={true} wrapLines={true} style={themeMode === 'dark' ? materialDark : materialLight}>
          {sampleText}
        </SyntaxHighlighter>
      </div>
      <div className="w-full my-6 grid grid-cols-2">
        <div className="flex items-center justify-center gap-2">
          <Image src={Heart} width={20} height={20} className="scale-90 md:hover:scale-100 animate-scale" alt="heart" />
          <p>23k</p>
        </div>
        <div className="flex items-center justify-around">
          {theme === 'dark' ? (
            <Image src={ShareWhite} width={18} height={18} alt="share" />
          ) : (
            <Image src={ShareBlack} width={18} height={18} alt="share" />
          )}
          {theme === 'dark' ? (
            <Image src={CopyWhite} width={18} height={18} alt="copy" />
          ) : (
            <Image src={CopyBlack} width={18} height={18} alt="copy" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardPost;
