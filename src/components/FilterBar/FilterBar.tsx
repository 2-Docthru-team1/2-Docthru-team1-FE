import Image from 'next/image';
import { useState } from 'react';
import filter from '@/../public/assets/ic_filter.png';
import search from '@/../public/assets/icon_search.png';
import type { FilterBarProps } from '@/interfaces/filterBarInterface';
import Dropdown from '../Dropdown/Dropdown';

const filterBarWidths = {
  recipe: 'w-[69.6rem]',
  admin: 'w-[99.2rem]'
};

const searchBarWidths = {
  recipe: 'w-[52.5rem]',
  admin: 'w-[82.1rem]'
};

export default function FilterBar({ type }: FilterBarProps) {
  const filterBarType = filterBarWidths[type] || '';
  const searchBarType = searchBarWidths[type] || '';

  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { label: 'Like Highest', value: '좋아요 높은순' },
    { label: 'Like Lowest', value: '좋아요 낮은순' },
    { label: 'School Food', value: '스쿨푸드' },
    { label: 'Traditional', value: '전통음식' },
    { label: 'Noodle', value: '면' },
    { label: 'Dessert', value: '디저트' },
    { label: 'BanChan', value: '반찬' }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleSelectSort = (value: string) => {
    setSelectedSort(value);
    setIsDropdownOpen(false);
  };

  const getSelectedSortLabel = () => {
    const selectedOption = options.find(option => option.value === selectedSort);
    return selectedOption ? selectedOption.label : 'Sort';
  };

  return (
    <>
      <div className={`h-[4rem] justify-between items-center flex ${filterBarType}`}>
        <div
          className="flex justify-between items-center w-[15.1rem] h-full rounded-[0.8rem] border border-gray-200 px-[1.2rem] py-[0.8rem] gap-[1rem]"
          onClick={toggleDropdown}
        >
          <p className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-400">{getSelectedSortLabel()}</p>
          <Image src={filter} alt="깔때기" />
        </div>
        <div
          className={`h-full border border-gray-200 rounded-[2rem] flex items-center gap-[0.4rem] p-[0.4rem] ${searchBarType}`}
        >
          <Image src={search} alt="돋보기" />
          <input
            className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 placeholder:text-gray-400 flex items-center w-full focus:outline-none"
            placeholder="Search recipe"
          />
        </div>
      </div>
      {isDropdownOpen && <Dropdown isOpen={isDropdownOpen} items={options} onSelect={handleSelectSort} type={type} />}
    </>
  );
}
