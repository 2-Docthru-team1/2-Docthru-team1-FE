'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import plus from '@/../public/assets/icon_add_photo_plus.png';
import close from '@/../public/assets/icon_out_circle_small.png';
import ChallengeApplyDropdown from '../Dropdown/ChallengeApplyDropdown';

export default function ChallengeRequestClient() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState(false);

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [mediaTypeError, setMediaTypeError] = useState(false);

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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (images.length + newFiles.length <= 2) {
        setImages(prevImages => [...prevImages, ...newFiles]);
      } else {
        alert('최대 2개의 이미지만 업로드할 수 있습니다.');
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim() || !url.trim() || !content.trim() || images.length === 0 || !selectedMediaType) {
      if (!title.trim()) setTitleError(true);
      if (!url.trim()) setUrlError(true);
      if (!content.trim()) setContentError(true);
      if (!selectedMediaType) setMediaTypeError(true);
      return;
    }
    alert('Form submitted successfully!');
    router.push('/challengeList');
  };

  const isFormValid = title.trim() && url.trim() && content.trim() && images.length > 0 && selectedMediaType;

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[59rem]">
        <h2 className="mt-[2rem] mb-[2.4rem] text-[2rem] font-semibold text-gray-700">Request a challenge</h2>

        <div>
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
          <div className="text-error-red text-[1.2rem] ml-[0.5rem] mt-[0.4rem] h-[2rem]">
            {titleError && 'This field is required.'}
          </div>
        </div>

        <div>
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
          <div className="text-error-red text-[1.2rem] mt-[0.4rem] ml-[0.5rem] h-[2.0rem]">
            {urlError && 'This field is required.'}
          </div>
        </div>

        <div className="mb-[2.4rem]">
          <p className="text-gray-700 font-medium mb-[0.8rem] text-[1.4rem] leading-[1.7rem]">*Recipe Media Type</p>
          <ChallengeApplyDropdown
            setSelectedOption={setSelectedMediaType}
            selectedOption={selectedMediaType}
            setTypeError={setMediaTypeError}
          />
        </div>

        <div>
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
          <div className="text-error-red text-[1.2rem] ml-[0.5rem] h-[2.4rem]">{contentError && 'This field is required.'}</div>
        </div>

        <div>
          <p className="text-gray-700 font-medium mb-[0.8rem] text-[1.4rem] leading-[1.7rem]">*Photo (maximum 2)</p>
          <div className="flex gap-[0.8rem]">
            {images.map((file, index) => (
              <div
                key={index}
                className="relative w-[17.1rem] h-[17.1rem] border border-[#E3E0DC] flex items-center justify-center"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded image ${index + 1}`}
                  width={170}
                  height={170}
                  className="w-full h-full object-cover"
                />
                <Image
                  src={close}
                  alt="Remove"
                  onClick={() => handleRemoveImage(index)}
                  className="mt-[0.7rem] mr-[0.7rem] absolute top-0 right-0 cursor-pointer"
                />
              </div>
            ))}
            {images.length < 2 && (
              <div
                className="w-[17.1rem] h-[17.1rem] border border-[#E3E0DC] flex items-center justify-center cursor-pointer bg-primary-white rounded-[0.5rem]"
                onClick={handleImageClick}
              >
                <Image src={plus} alt="Add" width={40} height={40} />
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`mt-[2.4rem] w-full py-[1.2rem] rounded-[0.8rem] text-[1.6rem] font-semibold text-primary-white ${
            isFormValid ? 'bg-primary-beige' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}