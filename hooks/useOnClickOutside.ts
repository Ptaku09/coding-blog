import { RefObject, useEffect } from 'react';

type Handler = (event?: MouseEvent | TouchEvent) => void;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: Handler) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  });
};

export default useOnClickOutside;
