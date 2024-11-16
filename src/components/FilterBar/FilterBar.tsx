import Image from 'next/image';
import filter from '@/../public/assets/ic_filter.png';
import search from '@/../public/assets/icon_search.png';
import type { FilterBarProps } from '@/interfaces/filterBarInterface';
import Dropdown from '../Dropdown/Dropdown';

const filterBarWidths = {
  recipe: 'w-[69.6rem]',
  admin: 'w-[99.2rem]'
};

const searchBarWidths = {
  recipe: 'w-[55.5rem]',
  admin: 'w-[85.1rem]'
};

export default function FilterBar({ type }: FilterBarProps) {
  const filterBarType = filterBarWidths[type] || '';
  const searchBarType = searchBarWidths[type] || '';

  return (
    <div className={`h-[4rem] justify-between items-center flex ${filterBarType}`}>
      <div className="flex justify-between items-center w-[12.1rem] h-full rounded-[0.8rem] border border-gray-200 px-[1.2rem] py-[0.8rem] gap-[1rem]">
        <p className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-400">Sort</p>
        <Image src={filter} alt="깔때기" />
      </div>
      <div className={`h-full border border-gray-200 rounded-[2rem] flex items-center gap-[0.4rem] p-[0.4rem] ${searchBarType}`}>
        <Image src={search} alt="돋보기" />
        <input
          className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-700 placeholder:text-gray-400 flex items-center w-full focus:outline-none"
          placeholder="Search recipe"
        />
      </div>
    </div>
  );
}
