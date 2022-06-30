import { ReactNode } from 'react';
import MobileFooter from '../organisms/MobileFooter';
import MobileHeader from '../organisms/MobileHeader';
import GoToTopButton from '../atoms/GoToTopButton';
import AddNewPost from '../atoms/AddNewPost';

const BoardMobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MobileHeader />
      <main>{children}</main>
      <GoToTopButton />
      <AddNewPost />
      <MobileFooter />
    </>
  );
};

export default BoardMobileLayout;
