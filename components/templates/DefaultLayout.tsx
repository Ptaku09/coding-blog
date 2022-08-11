import MobileHeader from '../organisms/MobileHeader';
import MobileFooter from '../organisms/MobileFooter';
import { ReactNode } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import CompactBoardMenu from '../organisms/CompactBoardMenu';
import SearchMenu from '../organisms/SearchMenu';
import BoardMenu from '../organisms/BoardMenu';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const { width, ref } = useResizeDetector();

  return (
    <div ref={ref}>
      {(width as number) < 770 ? (
        <>
          <MobileHeader />
          <main>{children}</main>
          <MobileFooter />
        </>
      ) : (width as number) < 1050 ? (
        <div className="grid grid-cols-[1fr_80px_650px_1fr] bg-white dark:bg-dark-user">
          <div />
          <CompactBoardMenu />
          <div className="w-full relative">
            <main className="border-x-[1px] dark:border-gray-500">{children}</main>
          </div>
          <div />
        </div>
      ) : (width as number) < 1226 ? (
        <div className="grid grid-cols-[0.3fr_80px_650px_1fr_1fr] bg-white dark:bg-dark-user">
          <div />
          <CompactBoardMenu />
          <div className="w-full relative">
            <main className="border-x-[1px] dark:border-gray-500">{children}</main>
          </div>
          <SearchMenu />
          <div />
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_650px_1fr] bg-white dark:bg-dark-user">
          <BoardMenu />
          <div className="w-full relative">
            <main className="border-x-[1px] dark:border-gray-500">{children}</main>
          </div>
          <SearchMenu />
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
