import React from 'react';

export const HowToStartComponents = ({ componentNumber, title, children }: { componentNumber: number; title: string; children: React.ReactNode }) => {
  return (
    <div className="w-4/5 h-auto min-h-56 my-10 bg-white relative flex items-end justify-start flex-col p-4 shadow-2xl rounded-xl font-jakarta">
      <p className="absolute -left-3 -top-10 font-raleway text-8xl font-bold text-purple-600">{componentNumber}</p>
      <p className="text-xl text-right border-b-[1px] border-b-black">{title.toLocaleUpperCase()}</p>
      <div className="mb-5">{children}</div>
      <div className="absolute bottom-3 left-1/2 right-1/2 -translate-x-1/2 flex items-center justify-center gap-2 w-10">
        {['', '', ''].map((item: string, index: number) => (
          <span key={index} className={`p-1 rounded-full ${index + 1 === componentNumber ? 'bg-purple-700' : 'bg-gray-200'} bg-purple-700`} />
        ))}
      </div>
    </div>
  );
};
