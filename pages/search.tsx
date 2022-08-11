import { NextPageWithLayout } from './_app';
import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react';
import SearchPost from '../components/molecules/SearchPost';
import SearchUser from '../components/molecules/SearchUser';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SearchLayout from '../components/templates/SearchLayout';

export type SearchResultPost = {
  _id: string;
  image: string;
  username: string;
  language: string;
  comment: string;
  likes: number;
  createdAt: string;
};

export type SearchResultUser = {
  _id: string;
  image: string;
  name: string;
  username: string;
  backgroundImage: number;
  bio: string;
};

enum SelectedSearchingArea {
  posts = 'posts',
  users = 'users',
}

const Search: NextPageWithLayout = () => {
  const [selectedSearchingArea, setSelectedSearchingArea] = useState<SelectedSearchingArea>(SelectedSearchingArea.posts);
  const [foundedPosts, setFoundedPosts] = useState<SearchResultPost[]>([]);
  const [foundedUsers, setFoundedUsers] = useState<SearchResultUser[]>([]);
  const [queryInput, setQueryInput] = useState<string>('');
  const [isSearchingDisabled, setIsSearchingDisabled] = useState<boolean>(true);
  const router = useRouter();

  const handleQueryInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e.target.value);
    await handleSearch(selectedSearchingArea, e.target.value, 5);
  };

  const handleSearchingAreaChange = async (area: SelectedSearchingArea) => {
    setSelectedSearchingArea(area);
    await handleSearch(area, queryInput, 5);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await router.push(`/search?query=${queryInput}`, undefined, { shallow: true });
    await handleSearch(selectedSearchingArea, queryInput, 20);
  };

  const handleSearch = async (area: SelectedSearchingArea, query: string, limit: number) => {
    switch (area) {
      case SelectedSearchingArea.posts:
        await searchPosts(query, limit);
        break;

      case SelectedSearchingArea.users:
        await searchUsers(query, limit);
        break;
    }
  };

  const searchPosts = async (query: string, limit: number) => {
    if (query.length >= 3) {
      setIsSearchingDisabled(false);

      const response = await fetch(`/api/search/posts?query=${query}&limit=${limit}`);
      const { status, data } = await response.json();

      status === 200 ? setFoundedPosts(data) : setFoundedPosts([]);

      setFoundedUsers([]);
    } else {
      setIsSearchingDisabled(true);
      setFoundedPosts([]);
      setFoundedUsers([]);
    }
  };

  const searchUsers = async (query: string, limit: number) => {
    if (query.length >= 3) {
      setIsSearchingDisabled(false);

      const response = await fetch(`/api/search/users?query=${query}&limit=${limit}`);
      const { status, data } = await response.json();

      status === 200 ? setFoundedUsers(data) : setFoundedUsers([]);

      setFoundedPosts([]);
    } else {
      setIsSearchingDisabled(true);
      setFoundedPosts([]);
      setFoundedUsers([]);
    }
  };

  useEffect(() => {
    const searchQuery = async (query: string) => {
      setQueryInput(query);
      await searchPosts(query, 10);
    };

    if (router.query.query) {
      searchQuery(router.query.query as string).catch(console.error);
    }
  }, [router.query.query]);

  return (
    <div className="relative w-full h-auto min-h-screen py-16 md:py-4 px-8 bg-white dark:bg-dark-user font-raleway flex items-center justify-start flex-col">
      <form onSubmit={handleSubmit} className="pb-3 mb-4 w-full flex flex-col items-center border-b-[1px]">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-8 border-2 dark:border-gray-700 px-2 font-raleway font-[500] rounded-lg focus:outline-purple-600"
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
          className="mb-2 mt-4 py-1 px-5 text-white bg-purple-600 disabled:bg-gray-500 font-albert rounded-lg shadow-xl"
        >
          Search
        </button>
      </form>
      <div className="w-full h-auto flex flex-col overflow-hidden">
        {foundedPosts.length === 0 && foundedUsers.length === 0 && <p className="text-center">No results</p>}
        {selectedSearchingArea === SelectedSearchingArea.posts
          ? foundedPosts.map((result: SearchResultPost) => <SearchPost key={result._id} data={result} />)
          : foundedUsers.map((result: SearchResultUser) => <SearchUser key={result._id} data={result} />)}
      </div>
    </div>
  );
};

Search.getLayout = (page: ReactElement) => {
  return <SearchLayout>{page}</SearchLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Search;
