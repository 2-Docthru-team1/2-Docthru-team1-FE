import Image from 'next/image';
import { useState } from 'react';
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
    { label: 'Like Highest', value: '좋아요 높은순' },
    { label: 'Like Lowest', value: '좋아요 낮은순' },
    { label: 'School Food', value: '스쿨푸드' },
    { label: 'Traditional', value: '전통음식' },
    { label: 'Noodle', value: '면' },
    { label: 'Dessert', value: '디저트' },
    { label: 'BanChan', value: '반찬' }
  ],
  challenge: [
    {
      view: [
        { label: 'Like Highest', value: '좋아요 높은순' },
        { label: 'Like Lowest', value: '좋아요 낮은순' },
        { label: 'Earliest First', value: '신청 시간 빠른순' },
        { label: 'Latest First', value: '신청 시간 느린순' },
        { label: 'Deadline Earliest', value: '마감 기한 빠른순' },
        { label: 'Deadline Latest', value: '마감 기한 느린순' }
      ],
      media: [
        { label: 'Youtube', value: '유튜브' },
        { label: 'Blog', value: '블로그' },
        { label: 'Recipe Web', value: '레시피 웹' },
        { label: 'Social Media', value: '소셜미디어' }
      ],
      status: [
        { label: 'On going', value: '진행중' },
        { label: 'Closed', value: '종료' }
      ]
    }
  ],
  admin: [
    { label: 'Pending', value: '승인 대기' },
    { label: 'Approved', value: '신청 승인' },
    { label: 'Denied', value: '신청 거절' },
    { label: 'Earliest First', value: '신청 시간 빠른순' },
    { label: 'Latest First', value: '신청 시간 느린순' },
    { label: 'Deadline Earliest', value: '마감 기한 빠른순' },
    { label: 'Deadline Latest', value: '마감 기한 느린순' }
  ]
};

export default function FilterBar({ type, onFilterApply }: FilterBarProps) {
  const { keyword, category, setKeyword, setCategory } = useStore();

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

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
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
  };

  const handleApply = (view: string, media: string[], status: string) => {
    const count = (view ? 1 : 0) + media.length + (status ? 1 : 0);
    setSelectedCount(count);
    setIsFilterApplied(count > 0);
    handleCloseDropdown();
  };

  return (
    <div>
      <div className={`h-[4rem] justify-between items-center flex ${filterBarType}`}>
        <div
          className={`flex justify-between items-center h-full rounded-[0.8rem] border border-gray-200 px-[1.2rem] py-[0.8rem] gap-[1rem] ${sortBarType}
            ${isFilterApplied ? 'bg-gray-700' : 'bg-primary-white'}`}
          onClick={toggleDropdown}
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
          />
        </div>
      </div>
      {isDropdownOpen && <Dropdown isOpen={isDropdownOpen} items={options} onSelect={handleSelect} type={type} />}
    </div>
  );
}
