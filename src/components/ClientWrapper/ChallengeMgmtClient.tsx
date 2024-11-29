'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchChallengeApplication } from '@/api/challengeService';
import FilterBar from '@/components/FilterBar/FilterBar';
import type { ChallengeApplicationClientProps } from '@/interfaces/bodyInterface';
import useStore from '@/store/store';
import ChallengeApplicationBody from '../Body/ChallengeApplicationBody';
import Pagination from '../Pagination/Pagination';

export default function ChallengeMgmtClient() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { keyword, category, setKeyword, setCategory } = useStore();

  const {
    data: challengeApply,
    isLoading,
    isError,
    isPlaceholderData
  } = useQuery<ChallengeApplicationClientProps>({
    queryKey: ['challengeApply', currentPage, keyword, category],
    queryFn: async () => await fetchChallengeApplication(String(currentPage), itemsPerPage, keyword, category),
    placeholderData: keepPreviousData
  });

  const totalPages = Math.ceil((challengeApply?.totalCount || 0) / itemsPerPage);
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    if (!isPlaceholderData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['challengeApply', currentPage + 1, keyword, category],
        queryFn: () => fetchChallengeApplication(String(currentPage + 1), itemsPerPage, keyword, category)
      });
    }
  }, [currentPage, hasMore, isPlaceholderData, keyword, category]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        <Image src={loading} alt="loading" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-[1.5rem]">Failed to load data. Please try again later.</p>
      </div>
    );
  }

  const handleFilterChange = (category: string) => {
    setCurrentPage(1);
    setCategory(category);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-[2.4rem] flex flex-col w-full items-center">
      <div className="w-[99.6rem]">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">Manage Challenge Application</p>
        <div className="mt-[4rem]">
          <FilterBar type="admin" onKeywordChange={setKeyword} onFilterApply={handleFilterChange} />
        </div>
        <div className="mt-[2.4rem]">
          <ChallengeApplicationBody data={challengeApply?.list || []} />
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
