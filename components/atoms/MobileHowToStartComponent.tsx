import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const MobileHowToStartComponent = ({ title, children }: Props) => {
  return (
    <div
      id={title.split(' ').join('-').toLowerCase()}
      className="w-72 h-auto my-10 p-3 bg-gray-100 rounded-xl shadow-2xl flex items-start justify-start flex-col text-black"
    >
      <p className="w-full text-center font-bebas font-bold border-b-2 text-3xl text-purple-600 mb-3">{title.toUpperCase()}</p>
      <div>{children}</div>
    </div>
  );
};
