import React, { useEffect, useState } from 'react';

export enum StatusMessageType {
  SUCCESS = 'green-500',
  ERROR = 'red-500',
  INFORMATION = 'blue-500',
}

const StatusMessage = ({ message, type }: { message: string; type: StatusMessageType }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(true);

    setTimeout(() => {
      setIsShown(false);
    }, 2000);
  }, []);

  return (
    <div
      className={`fixed bottom-16 animate-appearing-short mt-10 transition duration-500 bg-white dark:bg-dark text-black dark:text-white font-bebas text-3xl shadow-xl border-2 border-red-500 px-8 py-4 rounded-xl
       ${isShown ? 'translate-x-0' : '-translate-x-96'} ${
        type === StatusMessageType.ERROR ? 'border-red-500' : type === StatusMessageType.SUCCESS ? 'border-green-500' : 'border-blue-500'
      }`}
    >
      <p>{message.toLocaleUpperCase()}</p>
      <span
        className={`absolute left-1/2 right-1/2 -translate-x-1/2 top-1 w-16 h-1 bg-gray-200 rounded-full overflow-hidden before:animate-slidingShort before:absolute before:-translate-x-full before:w-full before:rounded-full before:h-full 
        ${
          type === StatusMessageType.ERROR ? 'before:bg-red-500' : type === StatusMessageType.SUCCESS ? 'before:bg-green-500' : 'before:bg-blue-500'
        }`}
      />
    </div>
  );
};

export default StatusMessage;
