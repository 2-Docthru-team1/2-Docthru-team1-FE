'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ChallengeRequestClient() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState(false);

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(false);

  const handleBlur = (value: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!value.trim()) {
      setter(true);
    } else {
      setter(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    errorSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(e.target.value);
    errorSetter(false);
  };

  const handleSubmit = () => {
    if (!title.trim() || !url.trim() || !content.trim()) {
      if (!title.trim()) setTitleError(true);
      if (!url.trim()) setUrlError(true);
      if (!content.trim()) setContentError(true);
      return;
    }
    alert('Form submitted successfully!');
    router.push('/challengeList');
  };

  const isFormValid = title.trim() && url.trim() && content.trim();

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[59rem]">
        <h2 className="mt-[2rem] mb-[2.4rem] text-[2rem] font-semibold text-gray-700">Request a challenge</h2>

        <div className="mb-[2.4rem]">
          <p className="text-gray-700 font-medium mb-[0.8rem] text-[1.4rem] leading-[1.7rem]">*Title</p>
          <input
            type="text"
            value={title}
            onChange={e => handleChange(e, setTitle, setTitleError)}
            onBlur={() => handleBlur(title, setTitleError)}
            placeholder="Please write your title"
            className={`w-full bg-primary-white border ${
              titleError ? 'border-error-red' : 'border-gray-200'
            } rounded-[1.2rem] focus:outline-none focus:border-primary-beige py-[1.1rem] px-[2rem] text-[1.6rem] text-left placeholder:text-[1.6rem] placeholder-gray-400 text-gray-700`}
          />
          {titleError && <p className="text-error-red text-[1.2rem] ml-[0.5rem] mt-[0.5rem]">This field is required.</p>}
        </div>

        <div className="mb-[2.4rem]">
          <p className="text-gray-700 font-medium mb-[0.8rem] text-[1.4rem] leading-[1.7rem]">*Recipe Link</p>
          <input
            type="url"
            value={url}
            onChange={e => handleChange(e, setUrl, setUrlError)}
            onBlur={() => handleBlur(url, setUrlError)}
            placeholder="Please attach the url of the recipe"
            className={`w-full bg-primary-white border ${
              urlError ? 'border-error-red' : 'border-gray-200'
            } rounded-[1.2rem] focus:outline-none focus:border-primary-beige py-[1.1rem] px-[2rem] text-[1.6rem] text-left placeholder:text-[1.6rem] placeholder-gray-400 text-gray-700`}
          />
          {urlError && <p className="text-error-red text-[1.2rem] ml-[0.5rem] mt-[0.5rem]">This field is required.</p>}
        </div>

        <div className="mb-[2.4rem]">
          <p className="text-gray-700 font-medium mb-[0.8rem] text-[1.4rem] leading-[1.7rem]">*Content</p>
          <textarea
            value={content}
            onChange={e => handleChange(e, setContent, setContentError)}
            onBlur={() => handleBlur(content, setContentError)}
            placeholder="Please write your content of a challenge"
            className={`w-full h-[21.9rem] bg-primary-white border ${
              contentError ? 'border-error-red' : 'border-gray-200'
            } rounded-[0.6rem] focus:outline-none focus:border-primary-beige py-[1.1rem] px-[2rem] text-[1.6rem] text-left placeholder:text-[1.6rem] placeholder-gray-400 text-gray-700 resize-none`}
          />
          {contentError && <p className="text-error-red text-[1.2rem] ml-[0.5rem] mt-[0.5rem]">This field is required.</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-[1.45rem] text-[1.6rem] font-semibold rounded-[0.8rem] ${
            isFormValid
              ? 'bg-primary-beige text-primary-white cursor-pointer'
              : 'bg-gray-200 text-primary-white cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
