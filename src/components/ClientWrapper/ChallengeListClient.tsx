'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import plus from '@/../public/assets/icon_plus_medium.png';
import { fetchChallenge } from '@/api/challengeService';
import ChallengeCard from '@/components/Card/ChallengeCard';
import type { ChallengeData, MonthlyChallengeData } from '@/interfaces/cardInterface';
import type { ChallengeListClientProps } from '@/interfaces/challengelistInterface';
import useStore from '@/store/store';
import MonthlyChallengeCard from '../Card/MonthlyChallengeCard';
import MonthlyRankerCard from '../Card/MonthlyRankerCard';
import FilterBar from '../FilterBar/FilterBar';
import Pagination from '../Pagination/Pagination';

export default function ChallengeListClient({ adminchallengeData, challengeData, rankerData }: ChallengeListClientProps) {
  const router = useRouter();
  const { id, role, category, setCategory, keyword, setKeyword } = useStore();

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

  const totalPages = Math.ceil(medium.length / itemsPerPage);

  useEffect(() => {
    if (isFilterApplied) {
      const fetchFilteredData = async () => {
        try {
          const queryParams = createQueryParams(orderBy, mediaType, status);
          const filteredData = await fetchChallenge(queryParams);
          setMedium(filteredData.list);
        } catch (error) {
          console.error('Error fetching filtered challenges:', error);
        }
      };

      fetchFilteredData();
    }
  }, [isFilterApplied, orderBy, mediaType, status]);

  const createQueryParams = (orderBy: string, mediaType: string[], status: string): string => {
    const params: string[] = [];
    if (orderBy) params.push(`orderBy=${orderBy}`);
    if (status) params.push(`status=${status}`);
    mediaType.forEach(type => params.push(`mediaType=${type}`));
    return `?${params.join('&')}`;
  };

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
                <div
                  key={index}
                  // onClick={() => handleChallengeClick(data.id)}
                  // className="cursor-pointer"
                >
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
            <FilterBar
              type="challenge"
              onKeywordChange={setKeyword}
              onCategoryChange={setCategory}
              onFilterApply={handleFilterChange}
            />
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
        {mediumItems.length > 0 ? (
          <div className="flex justify-between grid grid-cols-2 grid-rows-2 gap-[2.4rem]">
            {mediumItems.map((data, index) => (
              <div key={index} onClick={() => handleChallengeClick(data.id)} className="cursor-pointer">
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
