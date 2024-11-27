'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import filter from '@/../public/assets/ic_filter.png';
import activeFilter from '@/../public/assets/icon_filter_active.png';
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
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setIsFilterApplied(false);
        setSelectedOption(null);
        onFilterApply('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [dropdownRef]);

  // 레시피 검색
  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(selectedOption?.value || '');
    }
  };

  // 레시피 정렬
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

  return (
    <div className="relative">
      <div className={`h-[4rem] justify-between items-center flex w-[69.6rem]`}>
        <div
          className={`flex justify-between items-center h-full rounded-[0.8rem] border border-gray-200 px-[1.2rem] py-[0.8rem] gap-[1rem] w-[15.1rem]
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
        <div
          className={`h-full border border-gray-200 rounded-[2rem] flex items-center gap-[0.4rem] p-[0.4rem] bg-primary-white w-[52.5rem]`}
        >
          <Image src={search} alt="돋보기" />
          <input
            className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 placeholder:text-gray-400 flex items-center w-full focus:outline-none"
            placeholder="Search recipe"
            value={keyword}
            onChange={handleChnage}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div ref={dropdownRef} className="absolute top-100% left-0 z-1000">
        {isDropdownOpen && <RecipeDropdown items={options} onApply={handleOptionClick} />}
      </div>
    </div>
  );
}