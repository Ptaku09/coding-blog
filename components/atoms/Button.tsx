type Props = {
  text: string;
  onClickFunc: () => void;
};

const Button = ({ text, onClickFunc }: Props) => {
  return (
    <button onClick={onClickFunc} className="px-12 py-2 bg-white text-black font-bold font-raleway">
      {text}
    </button>
  );
};

export default Button;
