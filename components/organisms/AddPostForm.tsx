import Image from 'next/image';
import DropWhite from '../../public/icons/drop-white.svg';
import DropBlack from '../../public/icons/drop-black.svg';
import React, { useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import StatusMessage, { StatusMessageType } from '../atoms/StatusMessage';
import { ACCEPTED_EXTENSIONS } from '../../lib/extensions';
import { hashtagData } from '../../lib/hashtags';

const AddPostForm = () => {
  const [charsCount, setCharsCount] = useState(0);
  const [fileTitle, setFileTitle] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [formattedFile, setFormattedFile] = useState('');
  const [comment, setComment] = useState('');
  const [isWrongExtension, setIsWrongExtension] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isTooBig, setIsTooBig] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(hashtagData.length).fill(false));
  const [currentlyChecked, setCurrentlyChecked] = useState(0);
  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { theme } = useTheme();
  const { data: session } = useSession();

  const handleDrag = (e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) dealWithFile(e.dataTransfer.files[0]);
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) dealWithFile(e.target.files[0]);
  };

  const dealWithFile = (file: File) => {
    if (file.size > 100000) {
      handleFileTooBig();
      return;
    }

    if (!ACCEPTED_EXTENSIONS.includes(file.name.split('.').pop() as string)) {
      handleWrongExtension();
      return;
    }

    setFileTitle(file.name);
    readAndFormatFile(file);
  };

  const handleFileTooBig = () => {
    fileInputRef.current.value = '';
    setIsTooBig(true);
    setFileTitle('');

    setTimeout(() => {
      setIsTooBig(false);
    }, 2000);
  };

  const handleWrongExtension = () => {
    fileInputRef.current.value = '';
    setIsWrongExtension(true);
    setFileTitle('');

    setTimeout(() => {
      setIsWrongExtension(false);
    }, 2000);
  };

  const readAndFormatFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = (event: any) => {
      setFormattedFile(event.target.result);
    };
  };

  const onCheckboxChange = (position: number) => {
    const updatedCheckedState = checkedState.map((state: boolean, index: number) => {
      if (index === position && state) {
        setCurrentlyChecked((prevState: number) => prevState - 1);
        return false;
        // 4 is the max number of hashtags
      } else if (index === position && currentlyChecked < 4) {
        setCurrentlyChecked((prevState: number) => prevState + 1);
        return true;
      }

      return state;
    });

    setCheckedState(updatedCheckedState);
  };

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setCharsCount(e.target.value.length);
  };

  const handleEmptyForm = () => {
    setIsEmpty(true);

    setTimeout(() => {
      setIsEmpty(false);
    }, 2000);
  };

  const handleFormReset = () => {
    setCharsCount(0);
    setFileTitle('');
    setCheckedState(new Array(hashtagData.length).fill(false));
    setCurrentlyChecked(0);
    setComment('');
    setIsWrongExtension(false);
    fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fileTitle.length > 0 && comment.length > 0) {
      fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          backgroundImage: Math.floor(Math.random() * 9 + 1),
          username: session?.user?.username,
          userId: session?.user?.id,
          image: session?.user?.image,
          comment,
          code: formattedFile,
          extension: fileTitle.split('.').pop() as string,
          hashtags: hashtagData.filter((text: string, index: number) => checkedState[index]),
          createdAt: new Date().toUTCString(),
        }),
      }).then(() => {
        handleFormReset();

        // clear session storage to fetch new posts
        sessionStorage.removeItem('iterator');
        sessionStorage.removeItem('posts');

        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      });
    } else {
      handleEmptyForm();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onDragEnter={handleDrag}
      className="relative w-full flex flex-col items-center font-raleway animate-appearing-short"
    >
      <input ref={fileInputRef} onChange={handleChange} className="hidden" type="file" id="file" multiple={false} onInvalid={handleEmptyForm} />
      <label className="relative my-4 p-10 h-32 w-full rounded-xl border-[1px] flex flex-col items-center justify-center" htmlFor="file">
        {fileTitle ? (
          <>
            <p>{fileTitle}</p>
            <p className="absolute bottom-1 text-xs">
              drag another or click{' '}
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                <strong className="text-blue-500">here</strong>
              </button>{' '}
              to change selected file
            </p>
          </>
        ) : (
          <>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
            >
              <strong className="text-lg">Choose a file</strong>
            </button>
            <span> or drag it here</span>
            <p className="absolute bottom-1 text-xs text-gray-600 dark:text-gray-400">
              {ACCEPTED_EXTENSIONS.map((ext: string, i: number) => '.' + ext + (i !== ACCEPTED_EXTENSIONS.length - 1 ? ', ' : ''))}
            </p>
          </>
        )}
      </label>
      {isDragActive && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="absolute z-[2] bg-gray-200 border-[1px] dark:bg-gray-800 rounded-lg shadow-xl animate-appearing-opacity opacity-90 transition-all transform duration-200 w-full h-full top-0 left-0"
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="animate-bounce">
              {theme === 'dark' ? (
                <Image src={DropWhite} width={60} height={60} alt="drop white" priority />
              ) : (
                <Image src={DropBlack} width={60} height={60} alt="drop black" priority />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row flex-wrap justify-center items-center border-[1px] rounded-xl p-2 mb-4">
        <p className="text-center text-sm mb-1">Select up to 4 hashtags describing your code</p>
        {hashtagData.map((category: string, index: number) => (
          <div key={index} className="w-auto h-auto">
            <input className="hidden peer" id={category} type="checkbox" checked={checkedState[index]} onChange={() => onCheckboxChange(index)} />
            <label
              htmlFor={category}
              className="w-auto h-full px-5 py-0.5 m-1 rounded-xl shadow-xl flex flex-col items-center justify-center text-sm text-white bg-purple-300 peer-checked:bg-purple-600"
            >
              {category}
            </label>
          </div>
        ))}
      </div>

      <textarea
        className="peer relative dark:bg-dark w-full min-h-56 rounded-xl border-[1px] mb-2 dark:text-white font-raleway p-2 outline-purple-600"
        maxLength={250}
        onChange={onTextChange}
        placeholder="Add comment..."
        value={comment}
      />
      <p
        className={`peer-focus:bg-purple-600 peer-focus:translate-x-0 ${
          charsCount > 0 ? 'translate-x-0' : '-translate-x-64'
        } bg-gray-300 transform duration-200 text-white w-24 text-center py-1 px-3 mb-6 rounded-xl shadow-xl`}
      >
        {charsCount} / 250
      </p>
      <div className="w-full flex items-center justify-center gap-8 font-bebas text-xl">
        <button className="bg-gray-500 px-5 py-2 rounded-xl shadow-xl border-white border-[1px] text-white" onClick={handleFormReset} type="reset">
          Reset
        </button>
        <button className="bg-purple-600 px-5 py-2 rounded-xl shadow-xl border-white border-[1px] text-white" type="submit">
          Add post
        </button>
      </div>
      <StatusMessage isShown={isWrongExtension} type={StatusMessageType.ERROR} message="Wrong file type" />
      <StatusMessage isShown={isTooBig} type={StatusMessageType.ERROR} message="Max file size: 100KB" />
      <StatusMessage isShown={isSuccess} type={StatusMessageType.SUCCESS} message="Post added correctly" />
      <StatusMessage isShown={isEmpty} type={StatusMessageType.INFORMATION} message="Provide file and comment" />
    </form>
  );
};

export default AddPostForm;
