'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import plus from '@/../public/assets/icon_plus_medium.png';
import search from '@/../public/assets/icon_search.png';
import useStore from '@/store/store';
import ChallengeApplicationDropdown from '../Dropdown/ChallengeApplicationDropdown';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function MyChallengeHeader({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const router = useRouter();

  const { setKeyword, setCategory } = useStore();

  const [sortOption, setSortOption] = useState('Sort');

  useEffect(() => {
    setKeyword('');
  }, []);

  const handleRequestClick = () => {
    router.push('/challengeList/request');
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

  const handleFilterChange = (category: string) => {
    setSortOption(category);
    setCategory(category);
  };

  return (
    <div className="lg:pt-[2.4rem] lg:max-w-[120rem] sm:w-full flex flex-col">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">My Challenge</p>
        <button
          className="w-[21rem] h-[3.7rem] bg-primary-beige rounded-[1.95rem] flex items-center justify-center gap-[0.8rem] font-semibold text-[1.6rem] leading-[1.909rem] text-primary-white"
          onClick={handleRequestClick}
        >
          Request a Challenge
          <Image src={`${S3_BASE_URL}/icon_plus.svg`} alt="plus" width={16} height={16} />
        </button>
      </div>
      <div className="w-full flex items-center border-b border-gray-400">
        <div
          className="w-[16.2rem] flex flex-col gap-[1rem] items-center h-[5.3rem] pt-[1.6rem] cursor-pointer"
          onClick={() => onTabChange('participating')}
        >
          <p
            className={`font-semibold text-[1.8rem] leading-[2.148rem] hover:text-gray-500 ${activeTab === 'participating' ? 'text-gray-700' : 'text-gray-400'}`}
          >
            Participating in
          </p>
          {activeTab === 'participating' ? <div className="border-[3px] border-gray-700 w-full" /> : null}
        </div>
        <div
          className="w-[11.9rem] flex flex-col gap-[1rem] items-center h-[5.3rem] pt-[1.6rem] cursor-pointer"
          onClick={() => onTabChange('finished')}
        >
          <p
            className={`font-semibold text-[1.8rem] leading-[2.148rem] hover:text-gray-500 ${activeTab === 'finished' ? 'text-gray-700' : 'text-gray-400'}`}
          >
            Finished
          </p>
          {activeTab === 'finished' ? <div className="border-[3px] border-gray-700 w-full" /> : null}
        </div>
        <div
          className="w-[11.2rem] flex flex-col gap-[1rem] items-center h-[5.3rem] pt-[1.6rem] cursor-pointer"
          onClick={() => onTabChange('applied')}
        >
          <p
            className={`font-semibold text-[1.8rem] leading-[2.148rem] hover:text-gray-500 ${activeTab === 'applied' ? 'text-gray-700' : 'text-gray-400'}`}
          >
            Applied
          </p>
          {activeTab === 'applied' ? <div className="border-[3px] border-gray-700 w-full" /> : null}
        </div>
      </div>
      <div className="mt-[2.4rem]">
        {activeTab === 'participating' || activeTab === 'finished' ? (
          <div className="flex h-[4rem] items-center w-full border border-gray-200 rounded-[2rem] bg-primary-white p-[0.8rem] box-border gap-[0.4rem]">
            <Image src={`${S3_BASE_URL}/icon_search.svg`} alt="search" width={24} height={24} />
            <input
              placeholder="Search Challenge"
              className="font-normal text-[1.6rem] leading-[1.909rem] w-full focus:outline-none"
              onKeyDown={handleKeyDown}
            />
          </div>
        ) : (
          <div>
            <div className="flex gap-[2rem] justify-center">
              <ChallengeApplicationDropdown type="me" sortOption={sortOption} onSortSelect={handleFilterChange} />
              <div className="flex h-[4rem] items-center w-[81.1rem] border border-gray-200 rounded-[2rem] bg-primary-white p-[0.8rem] box-border gap-[0.4rem]">
                <Image src={`${S3_BASE_URL}/icon_search.svg`} alt="search" width={24} height={24} />
                <input
                  placeholder="Search Challenge"
                  className="font-normal text-[1.6rem] leading-[1.909rem] w-full focus:outline-none"
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
