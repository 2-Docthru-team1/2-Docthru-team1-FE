'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchChallengeApplication } from '@/api/challengeService';
import FilterBar from '@/components/FilterBar/FilterBar';
import type { ChallengeApplicationClientProps } from '@/interfaces/bodyInterface';
import useStore from '@/store/store';
import ChallengeApplicationBody from '../Body/ChallengeApplicationBody';
import Pagination from '../Pagination/Pagination';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ChallengeMgmtClient() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    if (!accessToken || role !== 'admin') {
      router.push('/');
    }
  }, []);

  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { keyword, category, setKeyword, setCategory, setChallengeMgmtTotalCount } = useStore();

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
      const pagesToPrefetch = 5;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['challengeApply', i, keyword, category],
          queryFn: async () => await fetchChallengeApplication(String(i), itemsPerPage, keyword, category)
        });
      }
    }
  }, [currentPage, hasMore, isPlaceholderData, keyword, category]);

  useEffect(() => {
    if (challengeApply) {
      setChallengeMgmtTotalCount(challengeApply?.totalCount || 0);
    }
  }, [challengeApply]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
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
    <div className="pt-[2.4rem] flex flex-col w-full items-center md:p-[2.4rem] sm:p-[1.6rem]">
      <div className="lg:w-[99.6rem] sm:w-full">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">Manage Challenge Application</p>
        <div className="mt-[2.4rem] flex w-full">
          <FilterBar type="admin" onKeywordChange={setKeyword} onFilterApply={handleFilterChange} />
        </div>
        <div className="mt-[2.4rem] max-w-full lg:justify-center sm:justify-start flex sm:overflow-x-auto sm:overflow-y-hidden">
          <ChallengeApplicationBody type="admin" data={challengeApply?.list || []} />
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
