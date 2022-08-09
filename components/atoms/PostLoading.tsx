import ShiningSlide from './ShiningSlide';

const PostLoading = () => {
  return (
    <div className="w-screen md:w-full h-auto bg-white dark:bg-dark-user dark:text-white dark:border-gray-500 border-b-[1px] text-black flex flex-col items-start justify-between px-4 pt-4 animate-appearing-short overflow-hidden">
      <div className="w-full border-b-[1px] dark:border-dark z-[1] bg-inherit outline-none">
        <div className="flex flex-row items-center justify-between font-raleway font-bold">
          <div className="flex flex-row items-center gap-3">
            <div className="overflow-hidden w-9 h-9 rounded-full border-[1px] border-white bg-gray-300 dark:bg-gray-600">
              <ShiningSlide />
            </div>
            <div className="overflow-hidden w-16 h-5 bg-gray-300 dark:bg-gray-600 rounded-xl">
              <ShiningSlide />
            </div>
            <div className="w-12 h-5 bg-purple-300 rounded-xl" />
          </div>
          <div className="overflow-hidden w-16 h-5 bg-gray-300 dark:bg-gray-600 rounded-xl">
            <ShiningSlide />
          </div>
        </div>
        <div className="py-2 font-raleway border-b-[1px] dark:border-dark mb-2">
          <div className="overflow-hidden w-full h-24 bg-gray-300 dark:bg-gray-600 rounded-xl">
            <ShiningSlide />
          </div>
        </div>
        <div className="w-full h-44 bg-gray-400 dark:bg-gray-900 p-2 mb-2 flex flex-col gap-3 animate-pulse">
          <div className="w-11/12 h-2 bg-gray-300 dark:bg-gray-600 rounded-xl" />
          <div className="w-1/2 h-2 bg-gray-300 dark:bg-gray-600 rounded-xl" />
          <div className="w-2/3 h-2 bg-gray-300 dark:bg-gray-600 rounded-xl" />
          <div className="w-3/5 h-2 bg-gray-300 dark:bg-gray-600 rounded-xl" />
          <div className="w-10/12 h-2 bg-gray-300 dark:bg-gray-600 rounded-xl" />
          <div className="w-2/3 h-2 bg-gray-300 dark:bg-gray-600 rounded-xl" />
          <div className="w-3/5 h-2 bg-gray-300 dark:bg-gray-600 rounded-xl" />
        </div>
      </div>
      <div className="w-full my-6 grid grid-cols-[1fr_2fr] animate-bounce">
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>
        <div className="flex flex-row justify-around items-center">
          <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default PostLoading;
