'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchMenu } from '@/api/recipeService';
import RecipeCard from '@/components/Card/RecipeCard';
import type { RecipeData } from '@/interfaces/cardInterface';
import type { AdminListClientProps, RecipeListClientProps } from '@/interfaces/recipelistInterface';
import useStore from '@/store/store';
import MonthlyChallengeCard from '../Card/MonthlyChallengeCard';
import RecipeFilterBar from '../FilterBar/RecipeFilterBar';
import Pagination from '../Pagination/Pagination';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function RecipeListClient({ adminchallengeData }: AdminListClientProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { role, keyword, category, setKeyword, setCategory } = useStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setItemsPerPage(8);
      } else if (width >= 744) {
        setItemsPerPage(4);
      } else if (width >= 375) {
        setItemsPerPage(2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const {
    data: recipes,
    isLoading,
    isError,
    isPlaceholderData
  } = useQuery<RecipeListClientProps>({
    queryKey: ['recipies', currentPage, itemsPerPage, keyword, category],
    queryFn: async () => await fetchMenu(currentPage, itemsPerPage, keyword, category),
    placeholderData: keepPreviousData
  });
  const totalPages = recipes ? Math.ceil(recipes.totalCount / itemsPerPage) : 1;
  const hasMore = currentPage < totalPages;

  useEffect(() => {
    if (!isPlaceholderData && hasMore) {
      const pagesToPrefetch = 5;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['recipies', i, keyword, category, itemsPerPage],
          queryFn: async () => await fetchMenu(i, itemsPerPage, keyword, category)
        });
      }
    }
  }, [currentPage, hasMore, isPlaceholderData, keyword, category, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRecipeClick = (id: string) => {
    router.push(`/recipeList/${id}`);
  };

  const handleFilterChange = (category: string) => {
    setCategory(category);
  };

  const handleChallengeClick = (id: string) => {
    router.push(`/challengeList/${id}`);
  };

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

  return (
    <div className="flex flex-col pt-[2rem] w-full items-center justify-center pb-[7rem]">
      <div
        className="flex flex-col gap-[4rem] mb-[4rem]
      lg:w-[124rem]
      md:w-full md:px-[2.6rem]
      sm:w-full sm:px-[1.8rem]"
      >
        <div className="flex flex-col gap-[2.4rem] justify-center w-full">
          <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700">This Month's Challenge</p>
          <div
            className="flex  w-full
          lg:justify-between lg:overflow-hidden lg:max-w-full
          md:gap-[1rem] md:overflow-x-auto
          sm:gap-[1.5rem] sm:overflow-x-auto"
          >
            {adminchallengeData.map((data, index) => (
              <div
                key={index}
                onClick={() => handleChallengeClick(data.id)}
                className="cursor-pointer lg:mb-0 md:mb-[1rem] sm:mb-[1rem]"
              >
                <MonthlyChallengeCard data={data} role={role} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[1.6rem] justify-center items-center w-full">
          <div
            className="flex z-[20] w-full
          lg:flex-row lg:justify-between lg:items-center 
          md:flex-col
          sm:flex-col "
          >
            <p
              className="font-bold text-[2rem] leading-[3.2rem] text-gray-700
            lg:self-start
            md:self-start md:pb-[2rem]
            sm:self-start sm:pb=[1rem]"
            >
              Recipe
            </p>
            <div>
              <RecipeFilterBar onFilterApply={handleFilterChange} />
            </div>
          </div>
          <div
            className="grid gap-[2.4rem] 
          lg:grid-cols-4 lg:grid-rows-2 
          md:grid-cols-2 md: grid-row-2  
          sm:grind-cols-1 grid-row-2"
          >
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
