import Image from 'next/image';
import { useState } from 'react';
import filter from '@/../public/assets/ic_filter.png';
import plus from '@/../public/assets/icon_plus_medium.png';
import search from '@/../public/assets/icon_search.png';

export default function MyChallengeHeader() {
  const [activeTab, setActiveTab] = useState('participating');
  const [sortOption, setSortOption] = useState('Sort');
  const [showSortOptions, setShowSortOptions] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleOptionClick = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortSelect = (option: string) => {
    setSortOption(option);
    setShowSortOptions(false);
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
              <div
                className="flex items-center h-[4rem] border border-gray-200 rounded-[0.8rem] py-[0.8rem] px-[1.2rem] gap-[1rem] justify-between w-[19rem] cursor-pointer"
                onClick={handleOptionClick}
              >
                <p
                  className={`font-normal text-[1.6rem] leading-[1.909rem] ${sortOption === 'Sort' ? 'text-gray-400' : 'text-gray-700'}`}
                >
                  {sortOption}
                </p>
                <Image src={filter} alt="깔때기" />
              </div>
              <div className="flex h-[4rem] items-center w-full border border-gray-200 rounded-[2rem] bg-primary-white p-[0.8rem] box-border gap-[0.4rem]">
                <Image src={search} alt="search" />
                <input placeholder="Search Challenge" className="font-normal text-[1.6rem] leading-[1.909rem]" />
              </div>
            </div>
            {showSortOptions && (
              <div className="absolute bg-primary-white border border-gray-200 mt-[0.8rem] rounded-[0.8rem] w-[16.3rem]">
                <div
                  className="py-[1.2rem] px-[1.6rem] border-b border-gray-200 font-normal text-[1.6rem] leading-[1.909rem] cursor-pointer"
                  onClick={() => handleSortSelect('Pending')}
                >
                  Pending
                </div>
                <div
                  className="py-[1.2rem] px-[1.6rem] border-b border-gray-200 font-normal text-[1.6rem] leading-[1.909rem] cursor-pointer"
                  onClick={() => handleSortSelect('Approved')}
                >
                  Approved
                </div>
                <div
                  className="py-[1.2rem] px-[1.6rem] border-b border-gray-200 font-normal text-[1.6rem] leading-[1.909rem] cursor-pointer"
                  onClick={() => handleSortSelect('Denied')}
                >
                  Denied
                </div>
                <div
                  className="py-[1.2rem] px-[1.6rem] border-b border-gray-200 font-normal text-[1.6rem] leading-[1.909rem] cursor-pointer"
                  onClick={() => handleSortSelect('Earliest First')}
                >
                  Earliest First
                </div>
                <div
                  className="py-[1.2rem] px-[1.6rem] border-b border-gray-200 font-normal text-[1.6rem] leading-[1.909rem] cursor-pointer"
                  onClick={() => handleSortSelect('Latest First')}
                >
                  Latest First
                </div>
                <div
                  className="py-[1.2rem] px-[1.6rem] border-b border-gray-200 font-normal text-[1.6rem] leading-[1.909rem] cursor-pointer"
                  onClick={() => handleSortSelect('Deadline Earliest')}
                >
                  Deadline Earliest
                </div>
                <div
                  className="py-[1.2rem] px-[1.6rem] font-normal text-[1.6rem] leading-[1.909rem] cursor-pointer"
                  onClick={() => handleSortSelect('Deadline Latest')}
                >
                  Deadline Latest
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
