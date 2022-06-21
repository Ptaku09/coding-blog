import Link from 'next/link';

type Props = {
  text: string;
  direction: string;
};

const MyLink = ({ text, direction }: Props) => {
  return (
    <Link href={direction}>
      <a className="px-12 py-2 bg-white text-black font-bold font-raleway">{text}</a>
    </Link>
  );
};

export default MyLink;
