'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchAdminChallenge } from '@/api/challengeService';
import { fetchMenu } from '@/api/recipeService';
import RecipeCard from '@/components/Card/RecipeCard';
import type { RecipeData } from '@/interfaces/cardInterface';
import type { AdminData, RecipeListClientProps } from '@/interfaces/recipelistInterface';
import useStore from '@/store/store';
import MonthlyChallengeCard from '../Card/MonthlyChallengeCard';
import RecipeFilterBar from '../FilterBar/RecipeFilterBar';
import Pagination from '../Pagination/Pagination';

export default function RecipeListClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { keyword, category, setKeyword, setCategory } = useStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {
    data: recipes,
    isLoading,
    isError,
    isPlaceholderData
  } = useQuery<RecipeListClientProps>({
    queryKey: ['recipies', currentPage, keyword, category],
    queryFn: async () => await fetchMenu(currentPage, itemsPerPage, keyword, category),
    placeholderData: keepPreviousData
  });
  const totalPages = recipes ? Math.ceil(recipes.totalCount / itemsPerPage) : 1;
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    if (!isPlaceholderData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['recipies', currentPage + 1, keyword, category],
        queryFn: () => fetchMenu(currentPage + 1, itemsPerPage, keyword, category)
      });
    }
  }, [currentPage, hasMore, isPlaceholderData, keyword, category]);

  const [adminData, setAdminData] = useState<AdminData[]>();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRecipeClick = (id: string) => {
    router.push(`/recipeList/${id}`);
  };

  const handleFilterChange = (category: string) => {
    setCategory(category);
  };

  useEffect(() => {
    const getAdminChallengeData = async () => {
      const data = await fetchAdminChallenge();
      setAdminData(data);
    };
    getAdminChallengeData();
  }, []);

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
          <div className="flex justify-between items-center z-[1000] ">
            <p className="font-bold text-[2rem] leading-[3.2rem] text-gray-700">Recipe</p>
            <RecipeFilterBar onFilterApply={handleFilterChange} />
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-[2.4rem]">
            {!isLoading &&
              recipes?.list.map((recipe: RecipeData) => (
                <div key={recipe.id} onClick={() => handleRecipeClick(recipe.id)} className="cursor-pointer">
                  <RecipeCard data={recipe} />
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
