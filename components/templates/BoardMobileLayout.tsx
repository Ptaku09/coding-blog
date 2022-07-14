import { ReactNode } from 'react';
import MobileFooter from '../organisms/MobileFooter';
import MobileHeader from '../organisms/MobileHeader';
import AddNewPost from '../atoms/AddNewPost';
import PopupTutorial from '../molecules/PopupTutorial';

const BoardMobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MobileHeader />
      <PopupTutorial />
      <main>{children}</main>
      <AddNewPost />
      <MobileFooter />
    </>
  );
};

export default BoardMobileLayout;
