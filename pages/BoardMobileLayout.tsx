import { ReactNode } from 'react';
import BoardMobileFooter from '../components/organisms/BoardMobileFooter';
import BoardMobileHeader from '../components/organisms/BoardMobileHeader';
import GoToTopButton from '../components/atoms/GoToTopButton';
import AddNewPost from '../components/atoms/AddNewPost';

const BoardMobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BoardMobileHeader />
      <main>{children}</main>
      <GoToTopButton />
      <AddNewPost />
      <BoardMobileFooter />
    </>
  );
};

export default BoardMobileLayout;
