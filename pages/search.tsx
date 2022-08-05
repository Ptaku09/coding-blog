import { NextPageWithLayout } from './_app';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import DefaultMobileLayout from '../components/templates/DefaultMobileLayout';

type SearchResultPost = {
  _id: string;
  image: string;
  username: string;
  language: string;
  comment: string;
  likes: number;
  createdAt: string;
};

type SearchResultUser = {
  _id: string;
  image: string;
  username: string;
  bio: string;
};

enum SelectedSearchingArea {
  posts = 'posts',
  users = 'users',
}

const Search: NextPageWithLayout = () => {
  const [selectedSearchingArea, setSelectedSearchingArea] = useState<SelectedSearchingArea>(SelectedSearchingArea.posts);
  const [searchResults, setSearchResults] = useState<SearchResultPost[] | SearchResultUser[]>([]);
  const [queryInput, setQueryInput] = useState<string>('');
  const [isSearchingDisabled, setIsSearchingDisabled] = useState<boolean>(true);

  const handleQueryInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e.target.value);

    if (e.target.value.length >= 3) {
      setIsSearchingDisabled(false);
      const response = await fetch(`/api/search/${selectedSearchingArea}?query=${e.target.value}&limit=5`);
      const { status, data } = await response.json();

      if (status === 200) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } else {
      setIsSearchingDisabled(true);
      setSearchResults([]);
    }
  };

  const handleSearchingAreaChange = async (area: SelectedSearchingArea) => {
    setSelectedSearchingArea(area);

    if (queryInput.length >= 3) {
      setIsSearchingDisabled(false);
      const response = await fetch(`/api/search/${area}?query=${queryInput}&limit=5`);
      const { status, data } = await response.json();

      if (status === 200) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } else {
      setIsSearchingDisabled(true);
      setSearchResults([]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`/api/search/${selectedSearchingArea}?query=${queryInput}&limit=20`);
    const { status, data } = await response.json();

    if (status === 200) {
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="relative w-screen h-auto min-h-screen py-16 px-8 bg-white dark:bg-dark-user overflow-y-scroll scroll-smooth flex items-center justify-start flex-col">
      <form onSubmit={handleSubmit} className="pb-3 mb-4 w-full flex flex-col items-center border-b-[1px]">
        <input
          type="text"
          className="w-full h-8 border-2 dark:border-gray-700 px-2 font-raleway font-thin rounded-lg focus:outline-purple-600"
          value={queryInput}
          onChange={handleQueryInputChange}
          minLength={3}
          maxLength={20}
          required
        />
        <div className="w-full flex flex-row items-center justify-center gap-2 text-xs font-albert">
          {selectedSearchingArea === SelectedSearchingArea.posts ? (
            <>
              <button type="button" className="text-purple-600">
                POSTS
              </button>
              <span className="text-2xl text-gray-500">&#183;</span>
              <button type="button" onClick={() => handleSearchingAreaChange(SelectedSearchingArea.users)} className="text-gray-500">
                USERS
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => handleSearchingAreaChange(SelectedSearchingArea.posts)} className="text-gray-500">
                POSTS
              </button>
              <span className="text-2xl text-gray-500">&#183;</span>
              <button type="button" className="text-purple-600">
                USERS
              </button>
            </>
          )}
        </div>
        <button
          type="submit"
          disabled={isSearchingDisabled}
          className="my-2 py-1 px-5 text-white bg-purple-600 disabled:bg-gray-500 font-albert rounded-lg shadow-xl"
        >
          Search
        </button>
      </form>
      <div>
        {searchResults.length === 0 && <p>No results</p>}
        {searchResults.length > 0 && selectedSearchingArea === SelectedSearchingArea.posts
          ? searchResults.map((result: SearchResultPost | SearchResultUser) => <p key={result._id}>{result.username}</p>)
          : searchResults.map((result: SearchResultPost | SearchResultUser) => <p key={result._id}>user: {result.username}</p>)}
      </div>
    </div>
  );
};

Search.getLayout = (page: ReactElement) => {
  return <DefaultMobileLayout>{page}</DefaultMobileLayout>;
};

export default Search;
