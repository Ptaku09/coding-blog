import SampleUserPost from '../atoms/SampleUserPost';

const HowItWorksSection = () => {
  return (
    <section className="flex items-center flex-col">
      <h3 className="relative text-black text-4xl font-raleway mt-16 mb-5">HOW IT WORKS?</h3>
      <div className="w-72 h-auto p-3 bg-gray-100 rounded-xl shadow-2xl flex items-start justify-start flex-col">
        <p className="w-full text-center font-raleway text-xl mb-3">Collect reactions</p>
        <SampleUserPost />
      </div>
    </section>
  );
};

export default HowItWorksSection;
