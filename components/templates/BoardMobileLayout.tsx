import { ReactNode } from 'react';
import MobileFooter from '../organisms/MobileFooter';
import MobileHeader from '../organisms/MobileHeader';
import AddNewPost from '../atoms/AddNewPost';
import PopupTutorial from '../molecules/PopupTutorial';
import ReloadBoard from '../atoms/ReloadBoard';

const BoardMobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MobileHeader />
      <PopupTutorial />
      <main>{children}</main>
      <AddNewPost />
      <ReloadBoard />
      <MobileFooter />
    </>
  );
};

export default BoardMobileLayout;
