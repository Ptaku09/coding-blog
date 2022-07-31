import React, { FormEvent, useContext, useRef, useState } from 'react';
import { PostMenuContext, PostMenuContextProps } from '../../../providers/PostMenuProvider';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useRouter } from 'next/router';

const DeletePost = () => {
  const { isDeleteOpen, toggleDeleteState, toggleState } = useContext<PostMenuContextProps>(PostMenuContext);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useOnClickOutside(ref, () => {
    setTimeout(() => toggleDeleteState(false), 100); // wait to prevent miss click
    toggleState(false);
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Initialize the loading state
    setIsLoading(true);

    await fetch(`/api/posts/${router.query.id}`, {
      method: 'DELETE',
    });

    // Finish loading and close modal
    setIsLoading(false);
    toggleDeleteState(false);
    toggleState(false);

    // Redirect to home page and reload
    router.push('/board').then(() => router.reload());
  };

  return (
    <>
      <button onClick={() => toggleDeleteState(true)} className="px-3 py-1 flex items-center justify-center text-red-500">
        Delete
      </button>
      {isDeleteOpen && (
        <div className="fixed left-0 top-0 z-30 w-full h-full bg-white dark:bg-dark-user bg-opacity-90 dark:bg-opacity-80 flex items-center justify-center animate-appearing-short">
          <form
            ref={ref}
            onSubmit={handleSubmit}
            className="w-11/12 h-auto px-3 py-5 bg-white dark:bg-dark-user rounded-xl shadow-xl overflow-y-scroll font-mukta text-xl text-center border-4 dark:border-gray-700"
          >
            <p className="text-2xl font-raleway font-bold">Are you sure you want to delete this post?</p>
            <label className="flex justify-center items-center flex-wrap gap-2 mt-5 text-lg">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 bg-gray-300 checked:bg-red-500 rounded-md"
                onChange={() => setIsChecked((prevState: boolean) => !prevState)}
              />
              I understand that this action
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
                <span className="relative text-white font-bold">cannot be</span>
              </span>{' '}
              undone.
            </label>
            <button
              type="submit"
              disabled={!isChecked}
              className="mt-8 disabled:bg-gray-500 disabled:text-gray-600 bg-red-500 px-5 py-1 rounded-lg shadow-xl"
            >
              {isLoading ? (
                <span className="inline-block w-6 h-6 bg-transparent border-4 border-t-purple-600 rounded-full animate-spin" />
              ) : (
                'Delete post'
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default DeletePost;
