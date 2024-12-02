'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import filter from '@/../public/assets/ic_filter.png';
import useStore from '@/store/store';

interface SortDropdownProps {
  type: string;
  sortOption: string;
  onSortSelect: (apiValue: string) => void;
}

const optionsMap: { [key: string]: string } = {
  Pending: 'pending',
  Approved: 'approved',
  Denied: 'denied',
  'Earliest First': 'earliestFirst',
  'Latest First': 'latestFirst',
  'Deadline Earliest': 'deadlineEarliest',
  'Deadline Latest': 'deadlineLatest'
};

export default function ChallengeApplicationDropdown({ type, sortOption, onSortSelect }: SortDropdownProps) {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedUIOption, setSelectedUIOption] = useState(sortOption || 'Sort');

  const handleOptionClick = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortSelect = (uiOption: string) => {
    const apiValue = optionsMap[uiOption];
    setSelectedUIOption(uiOption);
    onSortSelect(apiValue);
    setShowSortOptions(false);
  };

  const isDropdownOpen = type === 'admin' || showSortOptions;
  const options = Object.keys(optionsMap);

  return (
    <div>
      {type === 'me' ? (
        <div
          className="flex items-center h-[4rem] border border-gray-200 rounded-[0.8rem] py-[0.8rem] px-[1.2rem] gap-[1rem] justify-between w-[16.5rem] cursor-pointer bg-primary-white"
          onClick={handleOptionClick}
        >
          <p
            className={`font-normal text-[1.6rem] leading-[1.909rem] ${
              selectedUIOption === 'Sort' ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            {selectedUIOption}
          </p>
          <Image src={filter} alt="Filter" />
        </div>
      ) : null}
      {isDropdownOpen && (
        <div className="absolute bg-primary-white border border-gray-200 mt-[0.8rem] rounded-[0.8rem]">
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
