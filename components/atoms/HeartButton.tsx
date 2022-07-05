import Image from 'next/image';
import Heart from '../../public/icons/heart.svg';

const HeartButton = ({ likes }: { likes: number }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image src={Heart} width={20} height={20} className="scale-90 md:hover:scale-100 animate-scale" alt="heart" />
      <p>{likes}</p>
    </div>
  );
};

export default HeartButton;
