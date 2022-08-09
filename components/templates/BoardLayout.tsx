import { ReactNode } from 'react';
import MobileFooter from '../organisms/MobileFooter';
import MobileHeader from '../organisms/MobileHeader';
import AddNewPost from '../atoms/AddNewPost';
import PopupTutorial from '../molecules/PopupTutorial';
import ReloadBoard from '../atoms/ReloadBoard';
import { useResizeDetector } from 'react-resize-detector';
import BoardMenu from '../organisms/BoardMenu';

const BoardLayout = ({ children }: { children: ReactNode }) => {
  const { width, ref } = useResizeDetector();
  return (
    <div ref={ref}>
      {(width as number) < 1130 ? (
        <>
          <MobileHeader />
          <PopupTutorial />
          <main>{children}</main>
          <AddNewPost />
          <ReloadBoard />
          <MobileFooter />
        </>
      ) : (
        <div className="grid grid-cols-[1fr_650px_1fr] bg-white dark:bg-dark-user">
          <BoardMenu />
          <div className="w-full relative">
            <main className="border-x-[1px] dark:border-gray-500">{children}</main>
            <ReloadBoard />
          </div>
          <div className="w-full h-screen flex justify-start">
            <div className="fixed w-60 h-full">
              <p>text</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardLayout;