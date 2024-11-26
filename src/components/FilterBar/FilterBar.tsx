'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import filter from '@/../public/assets/ic_filter.png';
import activeFilter from '@/../public/assets/icon_filter_active.png';
import search from '@/../public/assets/icon_search.png';
import type { ChallengeOption, FilterBarProps, Option } from '@/interfaces/filterBarInterface';
import useStore from '@/store/store';
import Dropdown from '../Dropdown/Dropdown';

const filterBarWidths = {
  recipe: 'w-[69.6rem]',
  challenge: 'w-[69.6rem]',
  admin: 'w-[99.2rem]'
};

const sortBarWidths = {
  recipe: 'w-[15.1rem]',
  challenge: 'w-[14rem]',
  admin: 'w-[18.1rem]'
};

const searchBarWidths = {
  recipe: 'w-[52.5rem]',
  challenge: 'w-[53.5rem]',
  admin: 'w-[80.1rem]'
};

const optionsByType: Record<string, Option[] | ChallengeOption[]> = {
  recipe: [
    { label: 'Like Highest', value: 'highest' },
    { label: 'Like Lowest', value: 'lowest' },
    { label: 'School Food', value: 'Boonsik' },
    { label: 'Traditional', value: 'Traditional' },
    { label: 'Noodle', value: 'Noodle' },
    { label: 'Dessert', value: 'Dessert' },
    { label: 'BanChan', value: 'BanChan' }
  ],
  challenge: [
    {
      view: [
        { label: 'Like Highest', value: 'like highest' },
        { label: 'Like Lowest', value: 'like lowest' },
        { label: 'Earliest First', value: 'earliest first' },
        { label: 'Latest First', value: 'latest first' },
        { label: 'Deadline Earliest', value: 'deadline earliest' },
        { label: 'Deadline Latest', value: 'deadline latest' }
      ],
      media: [
        { label: 'Youtube', value: 'youtube' },
        { label: 'Blog', value: 'blog' },
        { label: 'Recipe Web', value: 'recipe web' },
        { label: 'Social Media', value: 'social media' }
      ],
      status: [
        { label: 'On going', value: 'ongoing' },
        { label: 'Closed', value: 'closed' }
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
  const router = useRouter();
  const { keyword, category, setKeyword, setCategory, toggleDropdown } = useStore();

  const filterBarType = filterBarWidths[type] || '';
  const sortBarType = sortBarWidths[type] || '';
  const searchBarType = searchBarWidths[type] || '';
  const options = optionsByType[type] || [];

  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedView, setSelectedView] = useState<string>('');
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    toggleDropdown(!isDropdownOpen);
  };

  const getSelectedSortLabel = () => {
    if (isFilterApplied) {
      return `Filtered (${selectedCount})`;
    }

    if (type === 'challenge') {
      const flattenedOptions = Object.values(options[0]).flat();
      const selectedOption = flattenedOptions.find((option: Option) => option.value === selectedSort);
      return selectedOption ? selectedOption.label : 'Sort';
    } else {
      const selectedOption = (options as Option[]).find(option => option.value === selectedSort);
      return selectedOption ? selectedOption.label : 'Sort';
    }
  };

  const handleSelect = (value: string, category?: 'view' | 'media' | 'status') => {
    if (category === 'view') {
      setSelectedView(value);
    } else if (category === 'media') {
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
      const currentKeyword = e.currentTarget.value;
      setKeyword(currentKeyword);
      const queryString = new URLSearchParams({ keyword: currentKeyword }).toString();

      router.push(`?${queryString}`);
    }
  };

  useEffect(() => {
    setKeyword('');

    const query = new URLSearchParams(window.location.search);
    query.delete('keyword');
    query.delete('category');
    router.push(`${window.location.pathname}?${query.toString()}`);
  }, []);

  return (
    <div>
      <div className={`h-[4rem] justify-between items-center flex ${filterBarType}`}>
        <div
          className={`flex justify-between items-center h-full rounded-[0.8rem] border border-gray-200 px-[1.2rem] py-[0.8rem] gap-[1rem] ${sortBarType}
            ${isFilterApplied ? 'bg-gray-700' : 'bg-primary-white'}`}
          onClick={handleToggleDropdown}
        >
          <p
            className={`font-normal text-[1.6rem] leading-[1.909rem]
          ${isFilterApplied ? 'text-[#ffffff]' : 'text-gray-400'}`}
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
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {isDropdownOpen && <Dropdown isOpen={isDropdownOpen} items={options} onSelect={handleSelect} type={type} />}
    </div>
  );
}
