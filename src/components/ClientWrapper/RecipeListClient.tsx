'use client';

import { useState } from 'react';
import RecipeCard from '@/components/Card/RecipeCard';
import type { RecipeData } from '@/interfaces/cardInterface';
import FilterBar from '../FilterBar/FilterBar';

interface RecipeListClientProps {
  initialData: RecipeData[];
}

export default function RecipeListClient({ initialData }: RecipeListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [medium, setMedium] = useState<RecipeData[]>(initialData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medium.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(medium.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col mt-[2rem] w-full items-center justify-center">
      <div className="flex flex-col w-[120rem] gap-[4rem]">
        <div className="flex flex-col gap-[1.6rem] justify-center">
          <p className="font-semibold text-[2rem] leading-[2.387rem]">This Month's Challenge</p>
          <p>This is ChallengeCard Component Seat</p>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between items-center">
            <p className="font-bold text-[2rem] leading-[3.2rem] text-gray-700">Recipe</p>
            <FilterBar type="recipe" />
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-[2.4rem]">
            {currentItems.map((data, index) => (
              <RecipeCard key={index} data={data} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
