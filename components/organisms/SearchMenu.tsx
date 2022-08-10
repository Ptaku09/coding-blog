import SearchBar from '../molecules/SearchBar';

const SearchMenu = () => {
  return (
    <div className="w-full h-screen flex justify-start">
      <div
        id="search-menu"
        className="fixed w-72 h-full p-4 pb-24 flex items-center flex-col font-raleway font-[500] text-gray-500 dark:text-gray-300 overflow-y-scroll"
      >
        <p className="text-center">Did not found what are you looking for?</p>
        <p className="mt-5 mb-2 font-albert">Try our search engine</p>
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchMenu;
