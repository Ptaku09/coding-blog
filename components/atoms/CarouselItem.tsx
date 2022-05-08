import React from 'react';

export const CarouselItem = ({ children }: { children?: React.ReactNode }) => {
  return <div className="inline-block items-center justify-center h-auto w-auto">{children}</div>;
};
