import { ReactNode } from 'react';
import HomeFooter from '../organisms/HomeFooter';

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
      <HomeFooter />
    </div>
  );
};

export default HomePageLayout;
