import Image from 'next/image';
import DropWhite from '../../public/icons/drop-white.svg';
import DropBlack from '../../public/icons/drop-black.svg';
import React, { useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';

const AddPostForm = () => {
  const [charsCount, setCharsCount] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [formattedFile, setFormattedFile] = useState('');
  const [comment, setComment] = useState('');
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const validation = validateExtension(file.name);
      setFileName(validation ? file.name : 'Wrong file type');

      if (validation) {
        setFileName(file.name);
        readFile(file);
      } else {
        setFileName('Wrong file type');
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const file: File = e.target.files[0];
      const validation = validateExtension(file.name);

      if (validation) {
        setFileName(file.name);
        readFile(file);
      } else {
        setFileName('Wrong file type');
        e.target.value = '';
      }
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setCharsCount(e.target.value.length);
  };

  const validateExtension = (fileName: string) => {
    const extension = fileName.split('.').pop() as string;

    return ['java', 'js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'sass', 'less', 'json', 'py', 'c', 'cpp', 'go', 'php', 'cs', 'cake'].includes(
      extension
    );
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = (event: any) => {
      setFormattedFile(event.target.result.split('\n'));
    };
  };

  const handleFormReset = () => {
    setCharsCount(0);
    setFileName('');
    setComment('');
    fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formattedFile &&
      fetch('/api/storePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: session?.user?.name,
          avatar: session?.user?.image,
          comment,
          code: formattedFile,
        }),
      }).then(() => handleFormReset());
  };

  return (
    <form onSubmit={handleSubmit} onDragEnter={handleDrag} className="relative w-full flex flex-col items-center font-raleway">
      <input ref={fileInputRef} onChange={handleChange} className="hidden" type="file" id="file" multiple={false} required />
      <label className="my-4 p-10 h-32 w-full rounded-xl border-[1px] flex flex-col items-center justify-center" htmlFor="file">
        {fileName ? (
          <p>{fileName}</p>
        ) : (
          <>
            <button className="" onClick={() => fileInputRef.current.click()}>
              <strong className="text-lg">Choose a file</strong>
            </button>
            <span className=""> or drag it here</span>
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
                <Image src={DropWhite} width={60} height={60} alt="drop white" />
              ) : (
                <Image src={DropBlack} width={60} height={60} alt="drop black" />
              )}
            </div>
          </div>
        </div>
      )}
      <textarea
        className="peer relative dark:bg-dark w-full min-h-56 rounded-xl border-[1px] my-2 dark:text-white font-raleway p-2 outline-purple-600"
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
      <div className="w-full flex items-center justify-center gap-8">
        <button className="bg-gray-500 px-5 py-2 rounded-xl shadow-xl border-white border-[1px] text-white" onClick={handleFormReset} type="reset">
          Reset
        </button>
        <button className="bg-purple-600 px-5 py-2 rounded-xl shadow-xl border-white border-[1px] text-white" type="submit">
          Add post
        </button>
      </div>
    </form>
  );
};

export default AddPostForm;
