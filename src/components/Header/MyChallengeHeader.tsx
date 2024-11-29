'use client';

import Image from 'next/image';
import { useState } from 'react';
import plus from '@/../public/assets/icon_plus_medium.png';
import search from '@/../public/assets/icon_search.png';
import ChallengeApplicationDropdown from '../Dropdown/ChallengeApplicationDropdown';

export default function MyChallengeHeader() {
  const [activeTab, setActiveTab] = useState('participating');
  const [sortOption, setSortOption] = useState('Sort');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSortSelect = (option: string) => {
    setSortOption(option);
  };

  return (
    <div className="pt-[2.4rem] w-[120rem] flex flex-col">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">My Challenge</p>
        <button className="w-[21rem] h-[3.7rem] bg-primary-beige rounded-[1.95rem] flex items-center justify-center gap-[0.8rem] font-semibold text-[1.6rem] leading-[1.909rem] text-primary-white">
          Request a Challenge
          <Image src={plus} alt="plus" />
        </button>
      </div>
      <div className="w-full flex items-center border-b border-gray-400">
        <div
          className="w-[16.2rem] flex flex-col gap-[1rem] items-center h-[5.3rem] pt-[1.6rem] cursor-pointer"
          onClick={() => handleTabClick('participating')}
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
          onClick={() => handleTabClick('finished')}
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
          onClick={() => handleTabClick('applied')}
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
            <Image src={search} alt="search" />
            <input placeholder="Search Challenge" className="font-normal text-[1.6rem] leading-[1.909rem]" />
          </div>
        ) : (
          <div>
            <div className="flex gap-[2rem]">
              <ChallengeApplicationDropdown type="me" sortOption={sortOption} onSortSelect={handleSortSelect} />
              <div className="flex h-[4rem] items-center w-full border border-gray-200 rounded-[2rem] bg-primary-white p-[0.8rem] box-border gap-[0.4rem]">
                <Image src={search} alt="search" />
                <input placeholder="Search Challenge" className="font-normal text-[1.6rem] leading-[1.909rem]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
