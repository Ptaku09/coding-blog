import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const DesktopHowToStartComponent = ({ title, children }: Props) => {
  return (
    <div
      id={title.split(' ').join('-').toLowerCase()}
      className="w-auto h-auto relative bg-gray-100 shadow-2xl shadow-blue-500/40 py-5 px-10 flex items-center justify-center flex-col gap-5"
    >
      <p className="font-bebas text-4xl border-b-2 border-b-gray-300 px-4 pb-2">{title}</p>
      {children}
    </div>
  );
};

export default DesktopHowToStartComponent;
