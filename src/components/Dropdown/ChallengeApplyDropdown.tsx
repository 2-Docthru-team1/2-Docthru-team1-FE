import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import arrowDown from '@/../public/assets/chevron_down.png';
import arrowUp from '@/../public/assets/chevron_up.png';

interface ChallengeApplyDropdownProps {
  setSelectedOption: (option: string) => void;
  selectedOption: string;
  setTypeError: (error: boolean) => void;
}

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
        className={`h-[5.6rem] rounded-[0.4rem] gap-[1rem] py-[0.4rem] px-[1.6rem] flex justify-between items-center bg-primary-white cursor-pointer border
          ${isDropdownOpen ? 'border-primary-beige' : selectedOption ? 'border-gray-200' : isErrorTriggered ? 'border-error-red' : 'border-gray-200'}
        `}
        onClick={handleClickDropdown}
      >
        <p className={`font-normal text-[1.6rem] leading-[1.909rem] ${selectedOption ? 'text-gray-900' : 'text-gray-400'}`}>
          {selectedOption || 'Choose a category'}
        </p>
        <Image src={isDropdownOpen ? arrowUp : arrowDown} alt="arrow" />
      </div>
      {isErrorTriggered && !selectedOption && (
        <div className="absolute text-error-red text-[1.2rem] mt-[6rem] ml-[0.5rem]">This field is required.</div>
      )}
      {isDropdownOpen && (
        <div className="relative">
          <div className="absolute w-full border border-gray-200 rounded-[0.4rem] bg-primary-white overflow-hidden">
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