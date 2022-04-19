import { ReactNode } from 'react';

export const CarouselItem = ({ children }: { children?: ReactNode }) => {
  return <div className="inline-block items-center justify-center h-auto w-auto bg-green-600">{children}</div>;
};
