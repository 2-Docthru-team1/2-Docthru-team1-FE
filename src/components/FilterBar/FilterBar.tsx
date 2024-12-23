'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ChallengeOption, FilterBarProps, Option } from '@/interfaces/filterBarInterface';
import useStore from '@/store/store';
import ChallengeApplicationDropdown from '../Dropdown/ChallengeApplicationDropdown';
import Dropdown from '../Dropdown/Dropdown';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

const filterBarWidths = {
  challenge: 'lg:w-[69.6rem]',
  admin: 'lg:w-[99.2rem]'
};

const sortBarWidths = {
  challenge: 'lg:w-[14rem] md:w-[12.1rem] sm:w-[10.9rem]',
  admin: 'w-[18.1rem]'
};

const searchBarWidths = {
  challenge: 'lg:w-[53.5rem] md:w-[calc(100vw-18.9rem)] sm:w-[calc(100vw-13.8rem)]',
  admin: 'lg:w-[80.1rem] md:w-[calc(100vw-24rem)] sm:w-[calc(100vw-22.5rem)]'
};

const optionsByType: Record<string, Option[] | ChallengeOption[]> = {
  challenge: [
    {
      orderBy: [
        { label: 'Earliest First', value: 'earliestFirst' },
        { label: 'Latest First', value: 'latestFirst' },
        { label: 'Deadline Earliest', value: 'deadlineEarliest' },
        { label: 'Deadline Latest', value: 'deadlineLatest' }
      ],
      mediaType: [
        { label: 'Youtube', value: 'youtube' },
        { label: 'Blog', value: 'blog' },
        { label: 'Recipe Web', value: 'recipeWeb' },
        { label: 'Social Media', value: 'socialMedia' }
      ],
      status: [
        { label: 'On going', value: 'onGoing' },
        { label: 'Closed', value: 'finished' }
      ]
    }
  ],
  admin: [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Denied', value: 'denied' },
    { label: 'Earliest First', value: 'earliestFirst' },
    { label: 'Latest First', value: 'latestFirst' },
    { label: 'Deadline Earliest', value: 'deadlineEarliest' },
    { label: 'Deadline Latest', value: 'deadlineLatest' }
  ]
};

export default function FilterBar({ type, onFilterApply }: FilterBarProps) {
  const { keyword, setKeyword, toggleDropdown } = useStore();

  const filterBarType = filterBarWidths[type] || '';
  const sortBarType = sortBarWidths[type] || '';
  const searchBarType = searchBarWidths[type] || '';
  const options = optionsByType[type] || [];

  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedView, setSelectedView] = useState<string>('');
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    toggleDropdown(!isDropdownOpen);
  };

  const getSelectedSortLabel = () => {
    if (isFilterApplied) {
      return `Filtered(${selectedCount})`;
    }
    if (type === 'admin' && selectedSort) {
      const adminOptions = optionsByType.admin;
      const selectedOption = (adminOptions as { label: string; value: string }[]).find(option => option.value === selectedSort);

      if (selectedOption) {
        return selectedOption.label;
      }
    }
    return selectedSort || 'Sort';
  };

  const handleSelect = (value: string, category?: 'orderBy' | 'mediaType' | 'status') => {
    if (category === 'orderBy') {
      setSelectedView(value);
    } else if (category === 'mediaType') {
      if (selectedMedia?.includes(value)) {
        setSelectedMedia(selectedMedia.filter(item => item !== value));
      } else {
        setSelectedMedia([...(selectedMedia || []), value]);
      }
    } else if (category === 'status') {
      setSelectedStatus(value);
    }
    toggleDropdown(!isDropdownOpen);
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

  useEffect(() => {
    setKeyword('');
  }, []);

  const handleApply = (orderBy: string, mediaType: string[], status: string) => {
    const count = (orderBy ? 1 : 0) + mediaType.length + (status ? 1 : 0);
    setSelectedCount(count);
    setIsFilterApplied(count > 0);

    onFilterApply(orderBy, mediaType, status);
    toggleDropdown(false);
  };

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    onFilterApply(option, selectedMedia, selectedStatus);
    setIsDropdownOpen(false);
  };

  return (
    <div className="z-20">
      <div className={`h-[4rem] md:gap-[2rem] sm:gap-[0.6rem] justify-between items-center flex ${filterBarType}`}>
        <div
          className={`flex justify-between items-center rounded-[0.8rem] border border-gray-200 px-[1.2rem] py-[0.8rem] cursor-pointer ${sortBarType}
            ${isFilterApplied ? 'bg-gray-700' : 'bg-primary-white'}`}
          onClick={handleToggleDropdown}
        >
          <p
            className={`font-normal lg:text-[1.6rem] sm:text-[1.4rem] leading-[1.909rem] 
            ${isFilterApplied ? 'text-primary-white' : 'text-gray-400'} ${type === 'admin' && getSelectedSortLabel() === 'Sort' ? 'text-gray-400' : 'text-gray-400'}`}
          >
            {getSelectedSortLabel()}
          </p>
          <Image
            src={isFilterApplied ? `${S3_BASE_URL}/icon_filter_active.svg` : `${S3_BASE_URL}/ic_filter.svg`}
            alt="깔때기"
            width={16}
            height={16}
            layout="fixed"
          />
        </div>
        <div
          className={`h-full border border-gray-200 rounded-[2rem] flex items-center gap-[0.4rem] p-[0.4rem] bg-primary-white ${searchBarType}`}
        >
          <Image src={`${S3_BASE_URL}/icon_search.svg`} alt="돋보기" width={24} height={24} />
          <input
            className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 placeholder:text-gray-400 flex items-center w-full focus:outline-none"
            placeholder="Search recipe"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div>
        {isDropdownOpen && type === 'challenge' && (
          <Dropdown
            isOpen={isDropdownOpen}
            items={options}
            onSelect={handleSelect}
            type={type}
            onApply={handleApply}
            onClose={handleToggleDropdown}
          />
        )}
        {isDropdownOpen && type === 'admin' && (
          <ChallengeApplicationDropdown type="admin" sortOption={selectedSort || 'Sort'} onSortSelect={handleSortSelect} />
        )}
      </div>
    </div>
  );
}
