'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import btn_request from '@/../public/assets/btn_request_icon.png';
import ChallengeCard from '@/components/Card/ChallengeCard';
import type { ChallengeData, MonthlyChallengeData } from '@/interfaces/cardInterface';
import type { ChallengeListClientProps } from '@/interfaces/challengelistInterface';
import MonthlyChallengeCard from '../Card/MonthlyChallengeCard';
import MonthlyRankerCard from '../Card/MonthlyRankerCard';
import FilterBar from '../FilterBar/FilterBar';
import Pagination from '../Pagination/Pagination';

export default function ChallengeListClient({
  adminchallengeData,
  challengeData,
  userId,
  role,
  rankerData
}: ChallengeListClientProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [top, setTop] = useState<MonthlyChallengeData[]>(adminchallengeData);
  const [medium, setMedium] = useState<ChallengeData[]>(challengeData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const topItems = top.slice(indexOfFirstItem, indexOfLastItem);
  const mediumItems = medium.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(medium.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChallengeClick = (id: string) => {
    router.push(`/challengeList/${id}`);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-800 pt-[2rem] pb-[2.4rem]">
            This Month's Challenge
          </p>
          <div className="flex gap-[2.55rem]">
            {topItems.map((data, index) => (
              <div key={index} onClick={() => handleChallengeClick(data.id)} className="cursor-pointer">
                <MonthlyChallengeCard data={data} role={role} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-[4rem] mb-[2.4rem]">
          <p className="font-semibold text-[2rem] leading-[2.387rem text-gray-800">Challenge List</p>

          <div className="flex gap-[2rem]">
            <FilterBar type="recipe" /> {/* challenge FilterBar 설계한 후 수정 */}
            <Image src={btn_request} alt="Request" /> {/* 리퀘스트 버튼 구현 후 수정 */}
          </div>
        </div>
        <div className="flex justify-between grid grid-cols-2 grid-rows-2 gap-[2.4rem]">
          {mediumItems.map((data, index) => (
            <div key={index} onClick={() => handleChallengeClick(data.id)} className="cursor-pointer">
              <ChallengeCard data={data} userId={userId} role={role} />
            </div>
          ))}
        </div>
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
