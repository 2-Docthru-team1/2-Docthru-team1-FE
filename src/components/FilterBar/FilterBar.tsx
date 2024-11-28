'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import filter from '@/../public/assets/ic_filter.png';
import activeFilter from '@/../public/assets/icon_filter_active.png';
import search from '@/../public/assets/icon_search.png';
import type { ChallengeOption, FilterBarProps, Option } from '@/interfaces/filterBarInterface';
import useStore from '@/store/store';
import ChallengeApplicationDropdown from '../Dropdown/ChallengeApplicationDropdown';
import Dropdown from '../Dropdown/Dropdown';

const filterBarWidths = {
  challenge: 'w-[69.6rem]',
  admin: 'w-[99.2rem]'
};

const sortBarWidths = {
  challenge: 'w-[14rem]',
  admin: 'w-[18.1rem]'
};

const searchBarWidths = {
  challenge: 'w-[53.5rem]',
  admin: 'w-[80.1rem]'
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
    { label: 'Earliest First', value: 'earliest first' },
    { label: 'Latest First', value: 'latest first' },
    { label: 'Deadline Earliest', value: 'deadline earliest' },
    { label: 'Deadline Latest', value: 'deadline latest' }
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
      return `Filtered (${selectedCount})`;
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
        window.location.reload();
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
    setSelectedSort(option); // 선택된 옵션 저장
    onFilterApply(option, selectedMedia, selectedStatus); // 필터 적용
  };

  return (
    <div className="z-20">
      <div className={`h-[4rem] justify-between items-center flex ${filterBarType}`}>
        <div
          className={`flex justify-between items-center h-full rounded-[0.8rem] border border-gray-200 px-[1.2rem] py-[0.8rem] gap-[1rem] ${sortBarType}
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
          className={`h-full border border-gray-200 rounded-[2rem] flex items-center gap-[0.4rem] p-[0.4rem] bg-primary-white ${searchBarType}`}
        >
          <Image src={search} alt="돋보기" />
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
