import { NextPageWithLayout } from './_app';
import { ReactElement, useState } from 'react';
import DefaultMobileLayout from '../components/templates/DefaultMobileLayout';

type SearchResult = {
  _id: string;
  image: string;
  username: string;
  language: string;
  comment: string;
  likes: number;
  createdAt: string;
};

const Search: NextPageWithLayout = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    const response = await fetch('/api/search/posts?query=hook');
    const { status, data } = await response.json();

    if (status === 200) {
      setSearchResults(data);
    }
  };

  return (
    <div className="relative w-screen h-auto min-h-screen py-12 bg-white dark:bg-dark-user text-white overflow-y-scroll scroll-smooth flex items-center justify-start flex-col">
      <h1>Search for posts</h1>
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResults.map((result: SearchResult) => (
          <p key={result._id}>{result.username}</p>
        ))}
      </div>
    </div>
  );
};

Search.getLayout = (page: ReactElement) => {
  return <DefaultMobileLayout>{page}</DefaultMobileLayout>;
};

export default Search;
