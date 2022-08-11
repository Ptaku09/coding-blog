const SearchMenuMessage = () => {
  return (
    <div className="w-full h-screen flex justify-start">
      <div className="fixed w-72 h-full p-4 py-8 pb-24 flex items-center flex-col font-raleway font-[500] text-gray-500 dark:text-gray-300 overflow-y-hidden">
        <p className="text-center">
          <a href="https://www.mongodb.com/docs/atlas/atlas-search/" target="_blank" rel="noreferrer">
            Our search engine is powered by <span className="font-bold">MongoDB Atlas Search</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default SearchMenuMessage;
