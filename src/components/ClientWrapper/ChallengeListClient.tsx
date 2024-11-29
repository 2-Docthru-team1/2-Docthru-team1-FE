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

export default function ChallengeListClient({ adminchallengeData, challengeData, rankerData }: ChallengeListClientProps) {
  const router = useRouter();
  const { id, role, keyword, setKeyword } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [medium, setMedium] = useState<ChallengeData[]>(challengeData);
  const [orderBy, setOrderBy] = useState<string>('');
  const [mediaType, setMediaType] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const mediumItems = medium.slice(indexOfFirstItem, indexOfLastItem);
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
    queryKey: ['challenges', currentPage, queryParams],
    queryFn: () => fetchChallenge(currentPage, itemsPerPage, queryParams),
    placeholderData: keepPreviousData
  });
  console.log(challenges);
  const totalPages = challenges ? Math.ceil(challenges.totalCount / itemsPerPage) : 1;
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    if (!isPlaceholderData && hasMore) {
      const pagesToPrefetch = 1;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['challenges', i, queryParams],
          queryFn: () => fetchChallenge(i, itemsPerPage, queryParams)
        });
      }
    }
  }, [currentPage, hasMore, isPlaceholderData, queryParams]);

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

    const count = (orderBy ? 1 : 0) + mediaType.length + (status ? 1 : 0);
    setSelectedCount(count);
    setIsFilterApplied(count > 0);

    if (!orderBy && mediaType.length === 0 && !status) {
      window.location.reload();
      return;
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-800 pt-[2rem] pb-[2.4rem]">
            This Month's Challenge
          </p>
          {adminchallengeData.length > 0 ? (
            <div className="flex gap-[2.55rem]">
              {adminchallengeData.map((data, index) => (
                <div key={index} onClick={() => handleChallengeClick(data.id)} className="cursor-pointer">
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
        <div className="flex justify-between items-center mt-[4rem] mb-[2.4rem]">
          <p className="font-semibold text-[2rem] leading-[2.387rem text-gray-800">Challenge List</p>
          <div className="flex gap-[2rem]">
            <FilterBar type="challenge" onKeywordChange={setKeyword} onFilterApply={handleFilterChange} />
            {role === 'normal' ? (
              <button
                onClick={handleRequestClick}
                className="bg-primary-beige text-primary-white border rounded-[1.95rem] flex items-center gap-[0.8rem]"
              >
                <span className="text-[1.6rem] ml-[1.6rem]">Request a Challenge</span>
                <Image src={plus} alt="plus" className="mr-[1.6rem]" />
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        {challenges?.list.length ? (
          <div className="justify-between grid grid-cols-2 grid-rows-2 gap-[2.4rem]">
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
      <div className="mt-[4rem] mb-[2.4rem]">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
          type="default"
        />
      </div>
      <div className="mb-[2.4rem]">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-800 mb-[2.4rem]">This Month's Ranker</p>
        <MonthlyRankerCard data={rankerData} />
      </div>
    </div>
  );
}
