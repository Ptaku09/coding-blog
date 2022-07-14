import { ReactNode } from 'react';
import GoToTopButton from '../atoms/GoToTopButton';

const GoToTopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      <GoToTopButton />
    </>
  );
};

export default GoToTopLayout;
