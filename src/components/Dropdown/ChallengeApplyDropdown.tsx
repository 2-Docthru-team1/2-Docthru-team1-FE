import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ChallengeApplyDropdownProps } from '@/interfaces/challengeInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ChallengeApplyDropdown({ setSelectedOption, selectedOption, setTypeError }: ChallengeApplyDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isErrorTriggered, setIsErrorTriggered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickDropdown = () => {
    setTypeError(false);
    setIsDropdownOpen(prev => !prev);
    setIsErrorTriggered(false);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setTypeError(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (!selectedOption && isDropdownOpen) {
          setIsErrorTriggered(true);
          setTypeError(true);
        }
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedOption, isDropdownOpen, setTypeError]);

  return (
    <div className="flex flex-col" ref={dropdownRef}>
      <div
        className={`h-[5.6rem] rounded-[0.4rem] gap-[1rem] py-[0.4rem] px-[2rem] flex justify-between items-center bg-primary-white cursor-pointer border
          ${isDropdownOpen ? 'border-primary-beige' : selectedOption ? 'border-gray-200' : isErrorTriggered ? 'border-error-red' : 'border-gray-200'}
        `}
        onClick={handleClickDropdown}
      >
        <p className={`font-normal text-[1.6rem] leading-[1.909rem] ${selectedOption ? 'text-gray-900' : 'text-gray-400'}`}>
          {selectedOption || 'Choose a category'}
        </p>
        <Image
          src={isDropdownOpen ? `${S3_BASE_URL}/chevron_up.svg` : `${S3_BASE_URL}/chevron_down.svg`}
          alt="arrow"
          width={24}
          height={24}
        />
      </div>
      {isErrorTriggered && !selectedOption && (
        <div className="absolute text-error-red text-[1.2rem] mt-[6rem] ml-[0.5rem]">This field is required.</div>
      )}
      {isDropdownOpen && (
        <div className="relative">
          <div className="absolute z-20 mt-[0.3rem] w-full border border-gray-200 rounded-[0.4rem] bg-primary-white overflow-hidden shadow-lg">
            <div
              className="flex h-[4rem] justify-center items-center border-b border-gray-200 cursor-pointer"
              onClick={() => handleOptionSelect('Youtube')}
            >
              <p className="font-normal text-[1.6rem] leading-[1.909rem]">Youtube</p>
            </div>
            <div
              className="flex h-[4rem] justify-center items-center border-b border-gray-200 cursor-pointer"
              onClick={() => handleOptionSelect('Blog')}
            >
              <p className="font-normal text-[1.6rem] leading-[1.909rem]">Blog</p>
            </div>
            <div
              className="flex h-[4rem] justify-center items-center border-b border-gray-200 cursor-pointer"
              onClick={() => handleOptionSelect('Social Media')}
            >
              <p className="font-normal text-[1.6rem] leading-[1.909rem]">Social Media</p>
            </div>
            <div
              className="flex h-[4rem] justify-center items-center cursor-pointer"
              onClick={() => handleOptionSelect('Recipe Web')}
            >
              <p className="font-normal text-[1.6rem] leading-[1.909rem]">Recipe Web</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
