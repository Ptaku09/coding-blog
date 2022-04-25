import Image from 'next/image';
import defaultAvatar from '../public/images/defaultAvatar.jpg';

type Props = {
  avatar?: StaticImageData;
  nickname: string;
  role: string;
  comment: string;
};

export const Post = ({ avatar = defaultAvatar, nickname, role, comment }: Props) => {
  return (
    <div className="w-[32rem] h-[22rem] bg-gradient-to-b from-blue-500 to-purple-600 p-1 font-jakarta">
      <div className="w-full h-full bg-white p-1">
        <div className="w-full h-full px-10 py-5 bg-hero-pattern relative">
          <div className="flex items-center justify-start gap-5">
            <Image className="rounded-full" objectFit="cover" src={avatar} width={70} height={70} alt="avatar" />
            <div>
              <p className="font-bold">{nickname}</p>
              <p className="text-sm">{role}</p>
            </div>
          </div>
          <p className="absolute pt-5 pr-10 whitespace-normal">{comment}</p>
        </div>
      </div>
    </div>
  );
};
