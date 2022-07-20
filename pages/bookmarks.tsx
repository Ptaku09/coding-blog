import { getSession, GetSessionParams, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import DefaultMobileLayout from '../components/templates/DefaultMobileLayout';
import Link from 'next/link';
import { Post } from './board';
import { OperationType, SortDirection, SortOptions } from '../lib/enums';
import StatusMessage, { StatusMessageOrientation, StatusMessageType } from '../components/atoms/StatusMessage';
import BookmarkPost from '../components/molecules/BookmarkPost';
import Image from 'next/image';
import ReturnWhite from '../public/icons/return-white.svg';
import { useRouter } from 'next/router';
import GoToTopLayout from '../components/templates/GoToTopLayout';
import { NextPageWithLayout } from './_app';

export type BookmarkedPostData = {
  bookmarkedPostId: string;
  addedAt: string;
};

type FormValuesProps = {
  sort: SortOptions;
  direction: SortDirection;
};

const sortOptions: { [key in SortOptions]: string } = {
  addedAt: 'Adding time',
  createdAt: 'Creation time',
  likes: 'Likes',
  author: 'Author nickname',
  language: 'Language',
};

const sortOptionMenuData: { label: string; value: SortOptions }[] = [
  { label: 'Adding time', value: SortOptions.addedAt },
  { label: 'Creation time', value: SortOptions.createdAt },
  { label: 'Likes', value: SortOptions.likes },
  { label: 'Author nickname', value: SortOptions.author },
  { label: 'Language', value: SortOptions.language },
];

const sortDirectionMenuData: { label: string; value: SortDirection }[] = [
  { label: 'Ascending', value: SortDirection.asc },
  { label: 'Descending', value: SortDirection.desc },
];

const Bookmarks: NextPageWithLayout = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSomethingWrong, setIsSomethingWrong] = useState<boolean>(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValuesProps>({
    sort: SortOptions.addedAt,
    direction: SortDirection.desc,
  });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    session?.user.id &&
      fetch(
        `/api/bookmarks/${session?.user.id}?sort=${router.query.sort || SortOptions.addedAt}&direction=${
          router.query.direction || SortDirection.desc
        }`
      )
        .then((r: Response) => r.json())
        .then(({ data: posts }) => setPosts(posts));
  }, [router.query.direction, router.query.sort, session?.user.id]);

  const handleRemoveBookmark = (postId: string) => {
    fetch(`/api/users/${session?.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookmarkedPostId: postId,
        type: OperationType.REMOVE,
      }),
    })
      .then((r: Response) => r.json())
      .then(({ status }) => {
        if (status === 204) {
          setIsSomethingWrong(true);

          setTimeout(() => {
            setIsSomethingWrong(false);
          }, 2000);
        } else {
          setPosts((prevState: Post[]) => prevState.filter((post: Post) => post._id !== postId));
        }
      });
  };

  const handleOpenSortMenu = () => {
    // Provide that form values match the current state and query params
    setFormValues({
      sort: (router.query.sort as SortOptions) || SortOptions.addedAt,
      direction: (router.query.direction as SortDirection) || SortDirection.desc,
    });
    setIsSortMenuOpen(true);
  };

  const handleCloseSortMenu = () => {
    // Reset form values, when user cancels sorting
    setFormValues({
      sort: (router.query.sort as SortOptions) || SortOptions.addedAt,
      direction: (router.query.direction as SortDirection) || SortDirection.desc,
    });
    setIsSortMenuOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Update query params with form values
    router.push(`bookmarks/?sort=${formValues.sort}&direction=${formValues.direction}`, undefined, { shallow: true }).then(() => {
      setIsSortMenuOpen(false);
    });
  };

  return posts.length === 0 ? (
    <div className="w-screen min-h-screen h-auto py-12 bg-white dark:bg-dark font-raleway flex items-center justify-center flex-col">
      <div className="w-full flex items-center justify-center flex-col gap-1">
        <p className="text-xl font-raleway">You have no bookmarked posts</p>
        <p>
          go to{' '}
          <span>
            <Link href="/board">
              <a className="text-purple-600 dark:text-purple-500">board</a>
            </Link>
          </span>{' '}
          and find some
        </p>
      </div>
    </div>
  ) : (
    <div
      className={`w-screen min-h-screen h-auto py-12 bg-white dark:bg-dark font-raleway flex items-center justify-start flex-col gap-2 
      ${isSortMenuOpen && 'h-screen overflow-hidden fixed z-30'}`}
    >
      <h1 className="text-4xl font-edu-sa mt-6 underline">Your bookmarks</h1>
      <p>Total: {posts.length}</p>
      <Link href="/board">
        <a className="bg-purple-600 flex items-center justify-center px-6 py-0.5 shadow-lg rounded-xl">
          <Image src={ReturnWhite} width={26} height={26} alt="avatar" />
        </a>
      </Link>
      <button onClick={handleOpenSortMenu} className="font-bebas text-xl border-[1px] dark:border-dark w-48 py-3 rounded-lg mt-2">
        <p>
          sort by: <span className="text-purple-600">{sortOptions[(router.query.sort as SortOptions) || SortOptions.addedAt]}</span>
        </p>
        <p>
          direction: <span className="text-purple-600">{(router.query.direction as SortDirection) === SortDirection.asc ? 'asc' : 'desc'}</span>
        </p>
      </button>
      {isSortMenuOpen && (
        <div className="w-screen h-full pt-6 fixed top-0 z-30 bg-white bg-opacity-95 dark:bg-gray-500 dark:bg-opacity-95 animate-appearing overflow-y-scroll">
          <form className="flex items-center justify-start flex-col font-bebas pb-20">
            <fieldset className="flex items-center justify-center flex-col gap-5 pb-8">
              <legend className="mb-4 text-center text-3xl font-edu-sa">Sort by:</legend>
              {sortOptionMenuData.map(({ label, value }: { label: string; value: SortOptions }) => (
                <div key={value} className="w-auto h-auto">
                  <input
                    className="hidden peer"
                    id={value}
                    name="sorting"
                    type="radio"
                    checked={formValues.sort === value}
                    onChange={() => setFormValues((prevState: FormValuesProps) => ({ ...prevState, sort: value }))}
                  />
                  <label
                    htmlFor={value}
                    className="w-52 py-4 rounded-xl shadow-xl flex flex-col items-center justify-center text-xl text-white bg-purple-300 peer-checked:bg-purple-600"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </fieldset>
            <fieldset className="flex flex-row gap-4 py-4 px-4 border-y-[1px]">
              {sortDirectionMenuData.map(({ label, value }: { label: string; value: SortDirection }) => (
                <div key={value}>
                  <input
                    className="hidden peer"
                    id={value}
                    name="direction"
                    type="radio"
                    checked={formValues.direction === value}
                    onChange={() => setFormValues((prevState: FormValuesProps) => ({ ...prevState, direction: value }))}
                  />
                  <label
                    htmlFor={value}
                    className="w-28 py-2 rounded-xl shadow-xl flex flex-col items-center justify-center text-white bg-purple-300 peer-checked:bg-purple-600"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </fieldset>
            <div className="flex items-center justify-center gap-4">
              <button type="button" onClick={handleCloseSortMenu} className="mt-8 w-28 py-2 bg-red-400 text-white shadow-xl font-edu-sa">
                Cancel
              </button>
              <button type="submit" onClick={handleSubmit} className="mt-8 w-28 py-2 bg-black text-white shadow-xl font-edu-sa">
                Sort
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="w-11/12">
        {posts.map((post: Post) => (
          <BookmarkPost key={post._id} post={post} handleRemoveBookmark={handleRemoveBookmark} />
        ))}
      </div>
      <StatusMessage
        isShown={isSomethingWrong}
        orientation={StatusMessageOrientation.VERTICAL}
        type={StatusMessageType.ERROR}
        message="Something went wrong"
      />
    </div>
  );
};

Bookmarks.getLayout = (page: ReactElement) => {
  return (
    <DefaultMobileLayout>
      <GoToTopLayout>{page}</GoToTopLayout>
    </DefaultMobileLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetSessionParams) => {
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

export default Bookmarks;
