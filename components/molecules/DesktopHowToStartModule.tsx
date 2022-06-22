import { ReactNode } from 'react';

const DesktopHowToStartModule = ({ children }: { children: ReactNode }) => {
  return <div className="w-full h-auto grid grid-cols-2 py-10">{children}</div>;
};

export default DesktopHowToStartModule;
