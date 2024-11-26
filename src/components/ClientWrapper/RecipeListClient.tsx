'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchAdminChallenge, getFilteredChallenges } from '@/api/challengeService';
import RecipeCard from '@/components/Card/RecipeCard';
import type { RecipeData } from '@/interfaces/cardInterface';
import type { AdminData, RecipeListClientProps } from '@/interfaces/recipelistInterface';
import useStore from '@/store/store';
import MonthlyChallengeCard from '../Card/MonthlyChallengeCard';
import FilterBar from '../FilterBar/FilterBar';
import Pagination from '../Pagination/Pagination';

export default function RecipeListClient({ initialData }: RecipeListClientProps) {
  const router = useRouter();
  const { keyword, category, setKeyword, setCategory } = useStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [medium, setMedium] = useState<RecipeData[]>(initialData.list);
  const [adminData, setAdminData] = useState<AdminData[]>();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medium.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(initialData.totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRecipeClick = (id: string) => {
    router.push(`/recipeList/${id}`);
  };

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (category) params.set('category', category);

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    setMedium(initialData.list);
    setCurrentPage(1);
  }, [initialData]);

  useEffect(() => {
    const getAdminChallengeData = async () => {
      const data = await fetchAdminChallenge();
      setAdminData(data);
    };
    getAdminChallengeData();
  }, []);

  return (
    <div className="flex flex-col pt-[2rem] w-full items-center justify-center">
      <div className="flex flex-col w-[120rem] gap-[4rem] mb-[4rem]">
        <div className="flex flex-col gap-[2.4rem] justify-center">
          <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">This Month's Challenge</p>
          <div className="flex justify-between">
            {Array.isArray(adminData) &&
              adminData.map(items => <MonthlyChallengeCard key={items.id} data={items} role="normal" />)}
          </div>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between items-center">
            <p className="font-bold text-[2rem] leading-[3.2rem] text-gray-700">Recipe</p>
            <FilterBar
              type="recipe"
              onKeywordChange={setKeyword}
              onCategoryChange={setCategory}
              onFilterApply={handleFilterChange}
            />
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-[2.4rem]">
            {currentItems.map((data, index) => (
              <div key={index} onClick={() => handleRecipeClick(data.id)} className="cursor-pointer">
                <RecipeCard data={data} />
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
