'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import filter from '@/../public/assets/ic_filter.png';
import activeFilter from '@/../public/assets/icon_filter_active.png';
import reset from '@/../public/assets/icon_reset.png';
import search from '@/../public/assets/icon_search.png';
import type { Option, RecipeFilterBarProps } from '@/interfaces/filterBarInterface';
import useStore from '@/store/store';
import RecipeDropdown from '../Dropdown/RecipeDropdown';

const options: Option[] = [
  { label: 'Like Highest', value: 'like highest' },
  { label: 'Like Lowest', value: 'like lowest' },
  { label: 'School Food', value: 'bunsik' },
  { label: 'Traditional', value: 'traditional' },
  { label: 'Noodle', value: 'noodle' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'BanChan', value: 'banchan' }
];

export default function FilterBar({ onFilterApply }: RecipeFilterBarProps) {
  const { keyword, setKeyword } = useStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setKeyword('');
  }, []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onFilterApply(option.value);
    setIsDropdownOpen(false);
    setIsFilterApplied(true);
  };

  const getSelectedSortLabel = () => {
    return selectedOption ? selectedOption.label : 'Sort';
  };

  const handleReset = () => {
    setIsFilterApplied(false);
    setSelectedOption(null);
    onFilterApply('');
    setKeyword('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const currentKeyword = e.currentTarget.value.trim();
      setKeyword(currentKeyword || '');
      if (!currentKeyword) {
        setKeyword('');
        return;
      }
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`h-[4rem] justify-between items-center flex gap-0
        lg:w-[74.6rem] 
        md:w-full
        sm:w-full sm:gap-[1rem] `}
      >
        <div className="flex gap-[1rem] items-center">
          <div
            className=" border border-gray-200  px-[1.2rem] py-[0.8rem] rounded-[0.8rem] bg-primary-white cursor-pointer"
            onClick={handleReset}
          >
            <Image src={reset} alt="리셋 이미지" width={20} height={20} />
          </div>
          <div
            className={`flex justify-between items-center h-full rounded-[0.8rem] border border-gray-200 px-[1.2rem] py-[0.8rem] gap-[1rem] w-[15.1rem] cursor-pointer whitespace-nowrap
            ${isFilterApplied ? 'bg-gray-700' : 'bg-primary-white'}`}
            onClick={handleToggleDropdown}
          >
            <p
              className={`font-normal text-[1.6rem] leading-[1.909rem]
          ${isFilterApplied ? 'text-primary-white' : 'text-gray-400'}`}
            >
              {getSelectedSortLabel()}
            </p>
            <Image src={isFilterApplied ? activeFilter : filter} alt="깔때기" />
          </div>
        </div>

        <div
          className={`h-full border border-gray-200 rounded-[2rem] flex items-center gap-[0.4rem] p-[0.4rem] bg-primary-white w-[52.5rem]`}
        >
          <Image src={search} alt="돋보기" />
          <input
            className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 placeholder:text-gray-400 flex items-center w-full focus:outline-none"
            placeholder="Search recipe"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div ref={dropdownRef} className="absolute top-100% left-[5.4rem] z-20">
        {isDropdownOpen && <RecipeDropdown items={options} onApply={handleOptionClick} />}
      </div>
    </div>
  );
}
