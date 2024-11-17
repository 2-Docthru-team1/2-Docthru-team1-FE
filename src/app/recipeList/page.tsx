'use client';

import { useEffect, useState } from 'react';
import { fetchMenu } from '@/api/recipeService';
import RecipeCard from '@/components/Card/RecipeCard';
import type { RecipeData } from '@/interfaces/cardInterface';

// TODO: 주석처리 된 부분은 머지가 되지 않았거나, 제작이 완료되지 않은 페이지입니다.
// TODO: 페이지네이션은 머지 바로 될 수 있는 상황이 아니므로, 임시 페이지네이션입니다.
// TODO: 페이지네이션은 컴포넌트로 다시 제작할 예정입니다.

export default function recipeList() {
  const [medium, setMedium] = useState<RecipeData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const getMenu = async () => {
      const data: RecipeData[] = await fetchMenu();
      setMedium(data);
    };
    getMenu();
  }, []);

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
          <p>
            This is ChallengeCard Component Seat
            {/* <Challenge /> */}
          </p>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between items-center">
            <p className="font-bold text-[2rem] leading-[3.2rem] text-gray-700">Recipe</p>
            <p>
              This is FilterBar Component Seat
              {/* <FilterBar /> */}
            </p>
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
