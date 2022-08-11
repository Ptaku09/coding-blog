import Image from 'next/image';
import EditBlack from '../../public/icons/edit-black.svg';
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import User from '../../pages/users/[id]';
import { UpdateUserEndpoint } from '../../lib/enums';
import { useRouter } from 'next/router';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Github from '../../public/icons/github-gray.svg';
import Twitter from '../../public/icons/twitter-gray.svg';
import Instagram from '../../public/icons/instagram-gray.svg';

type Props = {
  isOpen: boolean;
  toggleState: Dispatch<SetStateAction<boolean>>;
  userData: User;
};

const EditUserMenu = ({ isOpen, toggleState, userData }: Props) => {
  const [formValuesBackground, setFormValuesBackground] = useState<number>(userData.backgroundImage);
  const [formValuesUsername, setFormValuesUsername] = useState<string>(userData.username);
  const [formValuesMotto, setFormValuesMotto] = useState<string>(userData.motto);
  const [formValuesBio, setFormValuesBio] = useState<string>(userData.bio);
  const [formValuesSocialMedia, setFormValuesSocialMedia] = useState<{ github: string; twitter: string; instagram: string }>({
    github: userData.github,
    twitter: userData.twitter,
    instagram: userData.instagram,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useOnClickOutside(ref, () => {
    setTimeout(() => toggleState(false), 100); // wait to prevent miss click
    setFormValuesBackground(userData.backgroundImage);
    setFormValuesUsername(userData.username);
    setFormValuesMotto(userData.motto);
    setFormValuesBio(userData.bio);
    setFormValuesSocialMedia({
      github: userData.github,
      twitter: userData.twitter,
      instagram: userData.instagram,
    });
  });

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValuesUsername(e.target.value);
  };

  const handleMottoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValuesMotto(e.target.value);
  };

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValuesBio(e.target.value);
  };

  const handleSocialMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValuesSocialMedia({
      ...formValuesSocialMedia,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Initialize the loading state
    setIsLoading(true);

    // Update background image if changed
    formValuesBackground !== userData.backgroundImage &&
      (await fetch(`/api/users/${userData._id}/${UpdateUserEndpoint.backgroundImage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ backgroundImage: formValuesBackground }),
      }));

    // Update username if changed
    formValuesUsername !== userData.username &&
      (await fetch(`/api/users/${userData._id}/${UpdateUserEndpoint.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formValuesUsername }),
      }));

    // Update motto if changed
    formValuesMotto !== userData.motto &&
      (await fetch(`/api/users/${userData._id}/${UpdateUserEndpoint.motto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ motto: formValuesMotto }),
      }));

    // Update bio if changed
    formValuesBio !== userData.bio &&
      (await fetch(`/api/users/${userData._id}/${UpdateUserEndpoint.bio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: formValuesBio }),
      }));

    // Update social media if changed
    formValuesSocialMedia.github !== userData.github &&
      (await fetch(`/api/users/${userData._id}/${UpdateUserEndpoint.github}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ github: formValuesSocialMedia.github }),
      }));

    formValuesSocialMedia.twitter !== userData.twitter &&
      (await fetch(`/api/users/${userData._id}/${UpdateUserEndpoint.twitter}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ twitter: formValuesSocialMedia.twitter }),
      }));

    formValuesSocialMedia.instagram !== userData.instagram &&
      (await fetch(`/api/users/${userData._id}/${UpdateUserEndpoint.instagram}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instagram: formValuesSocialMedia.instagram }),
      }));

    // Finish loading and close modal
    setIsLoading(false);
    toggleState(false);

    // Reload session to see changes
    router.reload();
  };

  return (
    <>
      <button
        onClick={() => toggleState(true)}
        className="absolute z-[1] right-2 top-14 md:top-2 w-8 h-8 bg-white flex items-center justify-center shadow-lg rounded-xl"
      >
        <Image src={EditBlack} width={19} height={19} alt="edit" />
      </button>
      {isOpen && (
        <div className="fixed z-30 left-0 w-full h-full bg-white dark:bg-dark-user bg-opacity-90 dark:bg-opacity-80 flex items-center justify-center animate-appearing-short">
          <form
            ref={ref}
            onSubmit={handleSubmit}
            className="w-11/12 md:w-96 h-5/6 px-3 py-5 bg-white dark:bg-dark-user rounded-xl shadow-xl overflow-y-scroll font-raleway font-[500] border-4 border-white dark:border-gray-700"
          >
            <fieldset className="flex items-start justify-center h-auto gap-3 flex-wrap border-t-[1px] dark:border-gray-500">
              <legend className="text-xl mb-2 px-4 text-center font-mukta">Choose background</legend>
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
            <fieldset className="my-8 border-t-[1px] dark:border-gray-500">
              <legend className="text-xl mb-2 px-4 text-center font-mukta">Change username</legend>
              <input
                type="text"
                className="w-full h-12 border-2 dark:border-gray-700 px-2 text-xl font-raleway font-thin rounded-lg focus:outline-purple-600"
                value={formValuesUsername}
                onChange={handleUsernameChange}
                minLength={2}
                maxLength={16}
                required
              />
            </fieldset>
            <fieldset className="mb-8 border-t-[1px] dark:border-gray-500">
              <legend className="text-xl mb-2 px-4 text-center font-mukta">Change motto</legend>
              <textarea
                className="w-full h-32 border-2 dark:border-gray-700 p-2 text-xl font-raleway font-thin overflow-y-scroll rounded-lg focus:outline-purple-600"
                placeholder={formValuesMotto || 'Write your motto here'}
                value={formValuesMotto}
                onChange={handleMottoChange}
                maxLength={60}
              />
            </fieldset>
            <fieldset className="mb-8 border-t-[1px] dark:border-gray-500">
              <legend className="text-xl mb-2 px-4 text-center font-mukta">Change bio</legend>
              <textarea
                className="w-full h-44 border-2 dark:border-gray-700 p-2 text-xl font-raleway font-thin overflow-y-scroll rounded-lg focus:outline-purple-600"
                placeholder={formValuesBio || 'Tell us about yourself'}
                value={formValuesBio}
                onChange={handleBioChange}
                maxLength={120}
              />
            </fieldset>
            <fieldset className="border-t-[1px] dark:border-gray-500">
              <legend className="text-xl mb-2 px-4 text-center font-mukta">Social media</legend>
              <div className="w-full flex flex-col gap-5">
                <div className="flex flex-row-reverse items-center gap-3">
                  <input
                    type="text"
                    name="github"
                    className="w-full h-8 border-2 dark:border-gray-700 p-2 text-xl font-raleway font-thin rounded-lg focus:outline-purple-600"
                    value={formValuesSocialMedia.github}
                    onChange={handleSocialMediaChange}
                  />
                  <label htmlFor="github" className="flex items-center">
                    <Image src={Github} width={40} height={40} alt="github" />
                  </label>
                </div>
                <div className="flex flex-row-reverse items-center gap-3">
                  <input
                    type="text"
                    name="twitter"
                    className="w-full h-8 border-2 dark:border-gray-700 p-2 text-xl font-raleway font-thin rounded-lg focus:outline-purple-600"
                    value={formValuesSocialMedia.twitter}
                    onChange={handleSocialMediaChange}
                  />
                  <label htmlFor="twitter" className="flex items-center">
                    <Image src={Twitter} width={40} height={40} alt="twitter" />
                  </label>
                </div>
                <div className="flex flex-row-reverse items-center gap-3">
                  <input
                    type="text"
                    name="instagram"
                    className="w-full h-8 border-2 dark:border-gray-700 p-2 text-xl font-raleway font-thin rounded-lg focus:outline-purple-600"
                    value={formValuesSocialMedia.instagram}
                    onChange={handleSocialMediaChange}
                  />
                  <label htmlFor="instagram" className="flex items-center">
                    <Image src={Instagram} width={40} height={40} alt="instagram" />
                  </label>
                </div>
              </div>
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

export default EditUserMenu;
