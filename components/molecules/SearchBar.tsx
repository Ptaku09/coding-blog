import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchResultPost } from '../../pages/search';
import SearchPost from './SearchPost';

const SearchBar = () => {
  const [foundedPosts, setFoundedPosts] = useState<SearchResultPost[]>([]);
  const [queryInput, setQueryInput] = useState<string>('');
  const [isSearchingDisabled, setIsSearchingDisabled] = useState<boolean>(true);
  const router = useRouter();

  const handleQueryInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e.target.value);
    await searchPosts(e.target.value);
  };

  const searchPosts = async (query: string) => {
    if (query.length >= 3) {
      setIsSearchingDisabled(false);

      const response = await fetch(`/api/search/posts?query=${query}&limit=10`);
      const { status, data } = await response.json();

      status === 200 ? setFoundedPosts(data) : setFoundedPosts([]);
    } else {
      setIsSearchingDisabled(true);
      setFoundedPosts([]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await router.push(`/search?query=${queryInput}`);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-center flex-col">
        <input
          type="text"
          placeholder="Search"
          value={queryInput}
          onChange={handleQueryInputChange}
          minLength={3}
          maxLength={30}
          className="w-full h-8 border-2 dark:border-gray-700 px-2 font-raleway font-[500] rounded-full focus:outline-purple-600"
          required
        />
        <button
          type="submit"
          disabled={isSearchingDisabled}
          className="my-3 py-1 px-5 text-white bg-purple-600 disabled:bg-gray-500 transition-all duration-500 hover:bg-purple-500 font-albert rounded-lg shadow-xl disabled:cursor-not-allowed"
        >
          See details
        </button>
      </form>
      <div className="my-5">
        {foundedPosts.length === 0 && queryInput.length >= 3 && (
          <p className="pb-3 border-b-[1px] dark:border-gray-500">No posts were found with phrase &apos;{queryInput}&apos;</p>
        )}
        {foundedPosts.length > 0 && foundedPosts.length < 10 && (
          <p className="pb-3 border-b-[1px] dark:border-gray-500">
            <span className="text-xl font-bold">{foundedPosts.length}</span> {foundedPosts.length === 1 ? 'post was' : 'posts were'} found with phrase
            &apos;{queryInput}&apos;
          </p>
        )}
        {foundedPosts.length === 10 && (
          <p className="pb-3 border-b-[1px] dark:border-gray-500">
            At least <span className="text-xl font-bold">10</span> posts were found with phrase &apos;{queryInput}&apos;
          </p>
        )}
      </div>
      <div>
        {foundedPosts.map((post: SearchResultPost, index: number) => (
          <SearchPost key={index} data={post} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
