import Image from 'next/image';
import { useState } from 'react';
import arrowDown from '@/../public/assets/chevron_down.png';
import arrowUp from '@/../public/assets/chevron_up.png';

export default function ChallengeApplyDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Youtube');

  const handleClickDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-[0.8rem] w-[59rem]">
      <div
        className="h-[5.6rem] rounded-[0.4rem] border border-gray-200 gap-[1rem] py-[0.4rem] px-[1.6rem] flex justify-between items-center"
        onClick={handleClickDropdown}
      >
        <p className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-900">{selectedOption}</p>
        <Image src={isDropdownOpen ? arrowUp : arrowDown} alt="arrow" className="cursor-pointer" />
      </div>
      {isDropdownOpen ? (
        <div className="flex flex-col border border-gray-300 rounded-[1.2rem]">
          <div
            className="flex h-[4rem] justify-center items-center border-b border-gray-300 cursor-pointer"
            onClick={() => handleOptionSelect('Youtube')}
          >
            <p className="font-normal text-[1.6rem] leading-[1.909rem] items-center">Youtube</p>
          </div>
          <div
            className="flex h-[4rem] justify-center items-center border-b border-gray-300 cursor-pointer"
            onClick={() => handleOptionSelect('Blog')}
          >
            <p className="font-normal text-[1.6rem] leading-[1.909rem] items-center">Blog</p>
          </div>
          <div
            className="flex h-[4rem] justify-center items-center border-b border-gray-300 cursor-pointer"
            onClick={() => handleOptionSelect('Social Media')}
          >
            <p className="font-normal text-[1.6rem] leading-[1.909rem] items-center">Social Media</p>
          </div>
          <div
            className="flex h-[4rem] justify-center items-center cursor-pointer"
            onClick={() => handleOptionSelect('Recipe Web')}
          >
            <p className="font-normal text-[1.6rem] leading-[1.909rem] items-center">Recipe Web</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
