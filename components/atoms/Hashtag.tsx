const Hashtag = ({ text }: { text: string }) => {
  return <p className="bg-purple-300 px-3 py-0.5 rounded-xl shadow-md text-sm dark:text-[#0e172a]">#{text}</p>;
};

export default Hashtag;
