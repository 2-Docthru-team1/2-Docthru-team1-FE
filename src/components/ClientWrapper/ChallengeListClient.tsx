'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ChallengeCard from '@/components/Card/ChallengeCard';
import type { ChallengeData } from '@/interfaces/cardInterface';
import type { ChallengeListClientProps } from '@/interfaces/challengelistInterface';
import FilterBar from '../FilterBar/FilterBar';
import Pagination from '../Pagination/Pagination';

export default function RecipeListClient({ initialData, userId, role }: ChallengeListClientProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [medium, setMedium] = useState<ChallengeData[]>(initialData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medium.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(medium.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRecipeClick = (id: string) => {
    router.push(`/challenges/${id}`);
  };

  return (
    <div className="flex flex-col mt-[2rem] w-full items-center justify-center">
      <div className="flex flex-col w-[120rem] gap-[4rem] mb-[4rem]">
        <div className="flex flex-col gap-[1.6rem] justify-center">
          <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">This Month's Challenge</p>
          <p>This is ChallengeCard Component Seat</p>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between items-center">
            <p className="font-bold text-[2rem] leading-[3.2rem] text-gray-700">Challenge List</p>
            <FilterBar type="recipe" /> {/* challenge FilterBar 설계한 후 수정 */}
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-[2.4rem]">
            {currentItems.map((data, index) => (
              <div key={index} onClick={() => handleRecipeClick(data.id)} className="cursor-pointer">
                <ChallengeCard data={data} userId={userId} role={role} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasNext={currentPage < totalPages}
        type="default"
      />
    </div>
  );
}
