import Image from 'next/image';
import CopyWhite from '../../public/icons/copy-white.svg';
import StatusMessage, { StatusMessageOrientation, StatusMessageType } from './StatusMessage';
import CopyBlack from '../../public/icons/copy-black.svg';
import { useTheme } from 'next-themes';
import { useState } from 'react';

const CopyButton = ({ text, size = 18 }: { text: string; size?: number }) => {
  const { theme } = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <>
      {theme === 'dark' ? (
        <>
          <Image onClick={handleCopy} src={CopyWhite} width={size} height={size} alt="copy" />
          <StatusMessage isShown={isCopied} message="Copied" type={StatusMessageType.SUCCESS} orientation={StatusMessageOrientation.VERTICAL} />
        </>
      ) : (
        <>
          <Image onClick={handleCopy} src={CopyBlack} width={size} height={size} alt="copy" />
          <StatusMessage isShown={isCopied} message="Copied" type={StatusMessageType.SUCCESS} orientation={StatusMessageOrientation.VERTICAL} />
        </>
      )}
    </>
  );
};

export default CopyButton;
