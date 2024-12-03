'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import plus from '@/../public/assets/icon_plus_medium.png';
import { fetchChallenge } from '@/api/challengeService';
import ChallengeCard from '@/components/Card/ChallengeCard';
import type { ChallengeData, ChallengePaginationProps, MonthlyChallengeData } from '@/interfaces/cardInterface';
import type { ChallengeListClientProps } from '@/interfaces/challengelistInterface';
import useStore from '@/store/store';
import MonthlyChallengeCard from '../Card/MonthlyChallengeCard';
import MonthlyRankerCard from '../Card/MonthlyRankerCard';
import FilterBar from '../FilterBar/FilterBar';
import Pagination from '../Pagination/Pagination';

export default function ChallengeListClient({ adminchallengeData, rankerData }: ChallengeListClientProps) {
  const router = useRouter();
  const { id, role, keyword, setKeyword } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setItemsPerPage(4);
      } else if (width >= 375) {
        setItemsPerPage(2);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  });

  const [orderBy, setOrderBy] = useState<string>('');
  const [mediaType, setMediaType] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');

  const queryClient = useQueryClient();

  const createQueryParams = (orderBy: string, mediaType: string[], status: string, keyword: string): string => {
    const params: string[] = [];
    if (orderBy) params.push(`orderBy=${orderBy}`);
    if (status) params.push(`status=${status}`);
    if (keyword) params.push(`keyword=${keyword}`);
    mediaType.forEach(type => params.push(`mediaType=${type}`));
    return `&${params.join('&')}`;
  };

  const queryParams = createQueryParams(orderBy, mediaType, status, keyword);

  const {
    data: challenges,
    isPlaceholderData,
    isLoading,
    isError
  } = useQuery<ChallengePaginationProps>({
    queryKey: ['challenges', currentPage, itemsPerPage, queryParams],
    queryFn: () => fetchChallenge(currentPage, itemsPerPage, queryParams),
    placeholderData: keepPreviousData
  });
  const totalPages = challenges ? Math.ceil(challenges.totalCount / itemsPerPage) : 1;
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    if (!isPlaceholderData && hasMore) {
      const pagesToPrefetch = 5;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['challenges', i, queryParams, itemsPerPage],
          queryFn: () => fetchChallenge(i, itemsPerPage, queryParams)
        });
      }
    }
  }, [currentPage, hasMore, isPlaceholderData, queryParams, itemsPerPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChallengeClick = (id: string) => {
    router.push(`/challengeList/${id}`);
  };

  const handleRequestClick = () => {
    router.push('/challengeList/request');
  };

  const handleFilterChange = (orderBy: string, mediaType: string[], status: string) => {
    setOrderBy(orderBy);
    setMediaType(mediaType);
    setStatus(status);

    if (!orderBy && mediaType.length === 0 && !status) {
      window.location.reload();
      return;
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-800 pt-[2rem] lg:pb-[2.4rem] md:pb-[2rem] sm:pb-[1.6rem]">
            This Month's Challenge
          </p>
          {adminchallengeData.length > 0 ? (
            <div className="flex gap-[2.55rem] lg:w-full lg:pb-[0] md:pb-[3rem] sm:pb-[1.2rem] md:w-[calc(100vw-2.6rem)] sm:w-[calc(100vw-1.8rem)] overflow-x-auto">
              {adminchallengeData.map((data, index) => (
                <div key={index} onClick={() => handleChallengeClick(data.id)} className="inline-block cursor-pointer">
                  <MonthlyChallengeCard data={data} role={role} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[18rem]">
              <p className="font-normal text-[1.6rem] leading-[2.387rem] text-gray-500">There’s no challenge in running ...</p>
            </div>
          )}
        </div>
        <div className="md:mt-[4rem] sm:mt-[2.4rem] md:mb-[2.4rem] sm:mb-[1.6rem]">
          <div className="grid gap-[1.6rem] lg:grid-cols-[1fr_auto_auto] lg:grid-rows-1 sm:grid-cols-[1fr_auto] sm:grid-rows-2 items-center">
            <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-800 lg:col-start-1 lg:col-end-2">
              Challenge List
            </p>
            <div className="lg:col-start-2 lg:col-end-3 md:col-span-2 sm:col-span-2 sm:hidden lg:block">
              <FilterBar type="challenge" onKeywordChange={setKeyword} onFilterApply={handleFilterChange} />
            </div>
            <div className="lg:col-start-4 lg:col-end-5">
              {role === 'normal' && (
                <button
                  onClick={handleRequestClick}
                  className="md:w-[20.5rem] sm:h-[3.7rem] sm:w-[18.1rem] bg-primary-beige text-primary-white border rounded-[1.95rem] flex items-center gap-[0.8rem] lg:col-start-3 lg:col-end-4 sm:col-start-2 sm:col-end-3"
                >
                  <span className="md:text-[1.6rem] sm:text-[1.4rem] ml-[1.3rem]">Request a Challenge</span>
                  <Image src={plus} alt="plus" className="md:mr-[1.6rem] sm:mr-[1.1rem]" />
                </button>
              )}
            </div>

            <div className="lg:col-start-2 lg:col-end-3 md:col-span-2 sm:col-span-2 lg:hidden">
              <FilterBar type="challenge" onKeywordChange={setKeyword} onFilterApply={handleFilterChange} />
            </div>
          </div>
        </div>
        {challenges?.list.length ? (
          <div className="flex justify-between items-center grid lg:grid-cols-2 sm:grid-cols-1 grid-rows-2 md:gap-[2.4rem] sm:gap-[1.4rem]">
            {challenges.list.map((data: ChallengeData) => (
              <div key={data.id} onClick={() => handleChallengeClick(data.id)} className="cursor-pointer">
                <ChallengeCard data={data} userId={id} role={role} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[35rem]">
            <p className="font-normal text-[1.6rem] leading-[2.387rem] text-gray-500">There’s no challenge in running,</p>
            <p className="font-normal text-[1.6rem] leading-[2.387rem] text-gray-500">Let’s get it started!</p>
          </div>
        )}
      </div>
      <div className="md:mt-[4rem] sm:mt-[1.4rem] mb-[2.4rem]">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
          type="default"
        />
      </div>
      <div className="lg:mb-[2.4rem] md:mb-[3.2rem] sm:mb-[1.6rem]">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-800 mb-[2.4rem]">This Month's Ranker</p>
        <MonthlyRankerCard data={rankerData} />
      </div>
    </div>
  );
}
