import { ReactNode } from 'react';
import Footer from '../organisms/Footer';

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default HomePageLayout;
