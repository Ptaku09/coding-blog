import MobileHeader from '../organisms/MobileHeader';
import MobileFooter from '../organisms/MobileFooter';
import { ReactNode } from 'react';

const AddPostMobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MobileHeader />
      <main>{children}</main>
      <MobileFooter />
    </>
  );
};

export default AddPostMobileLayout;
