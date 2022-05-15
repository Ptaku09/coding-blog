import Image from 'next/image';
import Heart from '../../assets/heart.svg';
import Share from '../../assets/share.svg';
import Copy from '../../assets/copy.svg';

const SampleUserPost = () => {
  return (
    <div className="w-full h-auto p-2 flex items-start justify-start flex-col border-[1px] border-gray-300 shadow-lg rounded-md">
      <div className="w-full h-auto flex items-start justify-start flex-col border-b-[1px] border-gray-300 mb-3">
        <div className="w-full h-auto flex items-center justify-start">
          <span className="w-12 h-12 rounded-full bg-gray-300 border-white border-2" />
          <span className="w-1/2 h-5 ml-4 bg-gray-300" />
        </div>
        <span className="w-full h-2 my-3 bg-gray-300 rounded-full" />
        <span className="w-3/5 h-2 mb-3 bg-gray-300 rounded-full" />
        <span className="w-4/5 h-2 mb-3 bg-gray-300 rounded-full" />
        <span className="w-11/12 h-2 mb-3 bg-gray-300 rounded-full" />
        <span className="w-1/4 h-2 mb-4 bg-gray-300 rounded-full" />
      </div>
      <div className="w-full mb-2 grid grid-cols-2">
        <div className="flex items-center justify-center gap-2">
          <Image src={Heart} width={20} height={20} className="scale-90 hover:scale-100 animate-scale" alt="heart" />
          <p>23k</p>
        </div>
        <div className="flex items-center justify-around">
          <Image src={Share} width={18} height={18} alt="share" />
          <Image src={Copy} width={18} height={18} alt="copy" />
        </div>
      </div>
    </div>
  );
};

export default SampleUserPost;
