import Image from 'next/image';
import { hashtagData } from '../../../lib/hashtags';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Post } from '../../../pages/board';
import useLimitedCheckboxes from '../../../hooks/useLimitedCheckboxes';
import { useRouter } from 'next/router';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { UpdatePostEndpoint } from '../../../lib/enums';
import { PostMenuContext, PostMenuContextProps } from '../../../providers/PostMenuProvider';

const EditPost = ({ postData }: { postData: Post }) => {
  const [formValuesBackground, setFormValuesBackground] = useState<number>(postData.backgroundImage || 1);
  const [formValuesComment, setFormValuesComment] = useState<string>(postData.comment);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isEditOpen, toggleEditState, toggleState } = useContext<PostMenuContextProps>(PostMenuContext);
  const { checkedState, setCheckedState, setCurrentlyChecked, onCheckboxChange } = useLimitedCheckboxes(hashtagData.length, 4);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useOnClickOutside(ref, () => {
    setTimeout(() => toggleEditState(false), 100); // wait to prevent miss click
    toggleState(false);
    setFormValuesBackground(postData.backgroundImage || 1);
    setFormValuesComment(postData.comment);
    setCheckedState(hashtagData.map((hashtag: string) => postData.hashtags.includes(hashtag)));
    setCurrentlyChecked(postData.hashtags.length);
  });

  useEffect(() => {
    setCheckedState(hashtagData.map((hashtag: string) => postData.hashtags.includes(hashtag)));
    setCurrentlyChecked(postData.hashtags.length);
  }, [postData.hashtags, setCheckedState, setCurrentlyChecked]);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValuesComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Initialize the loading state
    setIsLoading(true);

    // Update background image if changed
    formValuesBackground !== postData.backgroundImage &&
      (await fetch(`/api/posts/${postData._id}/${UpdatePostEndpoint.backgroundImage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ backgroundImage: formValuesBackground }),
      }));

    // Update comment if changed
    formValuesComment !== postData.comment &&
      (await fetch(`/api/posts/${postData._id}/${UpdatePostEndpoint.comment}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: formValuesComment }),
      }));

    // Update hashtags if changed
    if (checkedState.some((isChecked: boolean, index: number) => isChecked !== postData.hashtags.includes(hashtagData[index]))) {
      await fetch(`/api/posts/${postData._id}/${UpdatePostEndpoint.hashtags}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hashtags: hashtagData.filter((text: string, index: number) => checkedState[index]) }),
      });
    }

    // Finish loading and close modal
    setIsLoading(false);
    toggleEditState(false);
    toggleState(false);

    // Reload session to see changes
    router.reload();
  };

  return (
    <>
      <button onClick={() => toggleEditState(true)} className="px-6 py-1 flex items-center justify-center text-black">
        Edit
      </button>
      {isEditOpen && (
        <div className="fixed left-0 top-0 z-30 w-full h-full bg-white dark:bg-dark-user bg-opacity-90 dark:bg-opacity-80 flex items-center justify-center animate-appearing-short">
          <form
            ref={ref}
            onSubmit={handleSubmit}
            className="w-11/12 h-5/6 px-3 py-5 bg-white dark:bg-dark-user rounded-xl shadow-xl overflow-y-scroll font-raleway font-[500] border-4 dark:border-gray-700"
          >
            <fieldset className="flex items-start justify-center h-auto gap-3 mb-7 flex-wrap border-t-[1px] dark:border-gray-500">
              <legend className="text-center text-xl mb-2 px-4 font-mukta">Choose background</legend>
              {new Array(9).fill(false).map((_, index: number) => (
                <div key={index} className="w-auto h-auto">
                  <input
                    className="hidden peer"
                    id={`${index}`}
                    name="sorting"
                    type="radio"
                    checked={formValuesBackground === index + 1}
                    onChange={() => setFormValuesBackground(index + 1)}
                  />
                  <label
                    htmlFor={`${index}`}
                    className="w-24 h-24 flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-lg peer-checked:bg-purple-600"
                  >
                    <div className="relative w-[5.65rem] h-[5.65rem] rounded-lg overflow-hidden border-gray-300">
                      <Image src={`/images/background${index + 1}.jpg`} layout="fill" objectFit="cover" alt={`background${index + 1}`} />
                    </div>
                  </label>
                </div>
              ))}
            </fieldset>
            <fieldset className="mb-7 border-t-[1px] dark:border-gray-500">
              <legend className="text-center text-xl mb-2 px-4 font-mukta">Change comment</legend>
              <textarea
                className="w-full h-56 border-2 dark:border-gray-700 p-2 text-xl font-raleway font-thin overflow-y-scroll rounded-lg focus:outline-purple-600"
                placeholder={formValuesComment || 'Add a comment...'}
                value={formValuesComment}
                onChange={handleCommentChange}
                maxLength={250}
                required
              />
            </fieldset>
            <fieldset className="flex flex-row flex-wrap justify-center items-center border-t-[1px] dark:border-gray-500 mb-4 font-raleway">
              <legend className="text-center text-xl mb-2 px-4 font-mukta">Change hashtags (up to 4)</legend>
              {hashtagData.map((category: string, index: number) => (
                <div key={index} className="w-auto h-auto">
                  <input
                    className="hidden peer"
                    id={category}
                    type="checkbox"
                    checked={checkedState[index]}
                    onChange={() => onCheckboxChange(index)}
                  />
                  <label
                    htmlFor={category}
                    className="w-auto h-full px-5 py-0.5 m-1 rounded-xl shadow-xl flex flex-col items-center justify-center font-[500] text-sm text-white bg-purple-300 dark:bg-gray-500 peer-checked:bg-purple-600"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </fieldset>
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-1/2 h-12 mt-5 font-[500] text-xl bg-purple-600 rounded-lg text-white disabled:bg-gray-300 flex items-center justify-center"
              >
                {isLoading ? <span className="inline-block w-6 h-6 bg-transparent border-4 border-t-purple-600 rounded-full animate-spin" /> : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPost;
