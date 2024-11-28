'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FilterBar from '@/components/FilterBar/FilterBar';
import type { ChallengeApplicationBodyProps } from '@/interfaces/bodyInterface';
import useStore from '@/store/store';
import ChallengeApplicationBody from '../Body/ChallengeApplicationBody';
import Pagination from '../Pagination/Pagination';

export default function ChallengeMgmtClient({ data }: ChallengeApplicationBodyProps) {
  const router = useRouter();

  const { keyword, category, setKeyword, setCategory } = useStore();

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (category) params.set('category', category);

    router.push(`?${params.toString()}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const mediumItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-[2.4rem] flex flex-col w-full items-center">
      <div className="w-[99.6rem]">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">Manage Challenge Application</p>
        <div className="mt-[4rem]">
          <FilterBar
            type="admin"
            onKeywordChange={setKeyword}
            onCategoryChange={setCategory}
            onFilterApply={handleFilterChange}
          />
        </div>
        <div className="mt-[2.4rem]">
          <ChallengeApplicationBody data={mediumItems} />
        </div>
      </div>
      <div className="flex mt-[3.8rem]">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
          type="default"
        />
      </div>
    </div>
  );
}