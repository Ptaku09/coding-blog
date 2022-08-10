import { ReactNode } from 'react';
import MobileFooter from '../organisms/MobileFooter';
import MobileHeader from '../organisms/MobileHeader';
import AddNewPost from '../atoms/AddNewPost';
import PopupTutorial from '../molecules/PopupTutorial';
import ReloadBoard from '../atoms/ReloadBoard';
import { useResizeDetector } from 'react-resize-detector';
import BoardMenu from '../organisms/BoardMenu';
import SearchMenu from '../organisms/SearchMenu';
import CompactBoardMenu from '../organisms/CompactBoardMenu';

const BoardLayout = ({ children }: { children: ReactNode }) => {
  const { width, ref } = useResizeDetector();
  return (
    <div ref={ref}>
      {(width as number) < 770 ? (
        <>
          <MobileHeader />
          <PopupTutorial />
          <main>{children}</main>
          <AddNewPost />
          <ReloadBoard />
          <MobileFooter />
        </>
      ) : (width as number) < 1050 ? (
        <div className="grid grid-cols-[1fr_80px_650px_1fr] bg-white dark:bg-dark-user">
          <div />
          <CompactBoardMenu />
          <div className="w-full relative">
            <main className="border-x-[1px] dark:border-gray-500">{children}</main>
            <ReloadBoard />
          </div>
          <div />
        </div>
      ) : (width as number) < 1226 ? (
        <div className="grid grid-cols-[0.3fr_80px_650px_1fr_1fr] bg-white dark:bg-dark-user">
          <div />
          <CompactBoardMenu />
          <div className="w-full relative">
            <main className="border-x-[1px] dark:border-gray-500">{children}</main>
            <ReloadBoard />
          </div>
          <SearchMenu />
          <div />
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_650px_1fr] bg-white dark:bg-dark-user">
          <BoardMenu />
          <div className="w-full relative">
            <main className="border-x-[1px] dark:border-gray-500">{children}</main>
            <ReloadBoard />
          </div>
          <SearchMenu />
        </div>
      )}
    </div>
  );
};

export default BoardLayout;
