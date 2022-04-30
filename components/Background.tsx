export const Background = () => {
  return (
    <>
      <div className="w-96 h-96 md:w-[32rem] md:h-[32rem] fixed -top-20 lg:top-20 -left-24 bg-blue-700 rounded-full blur-2xl" />
      <div className="w-72 h-72 md:w-[36rem] md:h-[36rem] lg:w-96 lg:h-96 fixed -bottom-32 lg:-top-20 lg:-right-24 bg-blue-700 rounded-full blur-2xl" />
      <div className="w-80 h-80 md:w-[40rem] md:h-[40rem] fixed -right-32 top-72 lg:-bottom-56 md:left-[35rem] bg-purple-700 rounded-full blur-2xl" />
      <div className="w-full min-h-screen bg-white z-[2] fixed opacity-80" />
    </>
  );
};
