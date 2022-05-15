import Image from 'next/image';
import SubmitBlack from '../../assets/submit-black.svg';
import XmarkBlack from '../../assets/xmark-black.svg';

const SamplePostCreator = () => {
  return (
    <div className="w-full h-auto p-2 font-raleway flex items-center justify-start flex-col border-[1px] border-gray-300 shadow-lg rounded-md">
      <span className="bg-gray-300 w-3/5 h-6 mb-2" />
      <div className="w-full h-auto border-y-[1px] border-gray-300 py-3">
        <div className="w-full h-auto flex flex-row items-center gap-2">
          <p className="text-sm text-gray-400">1</p>
          <span className="w-4/5 h-2 bg-gray-300 rounded-full" />
        </div>
        <div className="w-full h-auto flex flex-row items-center gap-2">
          <p className="text-sm text-gray-400">2</p>
          <span className="w-3/5 h-2 bg-gray-300 rounded-full" />
        </div>
        <div className="w-full h-auto flex flex-row items-center gap-2">
          <p className="text-sm text-gray-400">3</p>
          <span className="w-3/4 h-2 bg-gray-300 rounded-full" />
        </div>
        <div className="w-full h-auto flex flex-row items-center gap-2">
          <p className="text-sm text-gray-400">4</p>
          <span className="w-1/2 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
      <div className="w-full h-auto flex justify-center items-start flex-col border-b-[1px] border-gray-300">
        <span className="w-11/12 h-2 my-3 bg-gray-300 rounded-full" />
        <span className="w-3/5 h-2 mb-3 bg-gray-300 rounded-full" />
        <span className="w-4/5 h-2 mb-3 bg-gray-300 rounded-full" />
      </div>
      <div className="w-full h-auto flex items-center justify-center flex-row mt-2">
        <div className="w-1/2 h-10 flex items-center justify-center border-r-[1px] border-gray-300">
          <Image src={SubmitBlack} width={25} height={25} alt="submit" />
        </div>
        <div className="w-1/2 h-10 flex items-center justify-center">
          <Image src={XmarkBlack} width={25} height={25} alt="submit" />
        </div>
      </div>
    </div>
  );
};

export default SamplePostCreator;
