import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const DesktopHowToStartComponentLeft = ({ title, children }: Props) => {
  return (
    <div className="w-auto h-auto relative text-black">
      <div
        id={title.split(' ').join('-').toLowerCase()}
        className="w-auto h-auto relative bg-gray-100 shadow-2xl shadow-blue-500/40 py-5 px-10 flex items-center justify-center flex-col gap-5"
      >
        <p className="font-bebas text-4xl border-b-2 border-b-gray-300 px-4 pb-2">{title}</p>
        {children}
      </div>
      <div id={`${title.split(' ').join('-').toLowerCase()}-bg`} className="w-full h-full absolute -z-10 top-5 right-5 bg-purple-600" />
    </div>
  );
};

export default DesktopHowToStartComponentLeft;
