'use client';

import Image from 'next/image';
import { useState } from 'react';
import filter from '@/../public/assets/ic_filter.png';

interface SortDropdownProps {
  type: string;
  sortOption: string;
  onSortSelect: (option: string) => void;
}

export default function ChallengeApplicationDropdown({ type, sortOption, onSortSelect }: SortDropdownProps) {
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleOptionClick = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortSelect = (option: string) => {
    onSortSelect(option);
    setShowSortOptions(false);
  };

  const isDropdownOpen = type === 'admin' || showSortOptions;
  const options = ['Pending', 'Approved', 'Denied', 'Earliest First', 'Latest First', 'Deadline Earliest', 'Deadline Latest'];

  return (
    <div>
      {type === 'me' ? (
        <div
          className="flex items-center h-[4rem] border border-gray-200 rounded-[0.8rem] py-[0.8rem] px-[1.2rem] gap-[1rem] justify-between w-[16.5rem] cursor-pointer"
          onClick={handleOptionClick}
        >
          <p
            className={`font-normal text-[1.6rem] leading-[1.909rem] ${sortOption === 'Sort' ? 'text-gray-400' : 'text-gray-700'}`}
          >
            {sortOption}
          </p>
          <Image src={filter} alt="Filter" />
        </div>
      ) : null}
      {isDropdownOpen && (
        <div className="absolute bg-primary-white border border-gray-200 mt-[0.8rem] rounded-[0.8rem] w-[16.3rem]">
          {options.map((option, index) => (
            <div
              key={option}
              className={`py-[1.2rem] px-[1.6rem] font-normal text-[1.6rem] leading-[1.909rem] cursor-pointer ${
                index !== options.length - 1 ? 'border-b border-gray-200' : ''
              }`}
              onClick={() => handleSortSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
