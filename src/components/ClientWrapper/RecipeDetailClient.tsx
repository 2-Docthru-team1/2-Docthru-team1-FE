'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { fetchLikePost, fetchRecipe, fetchUnlikePost } from '@/api/recipeService';
import type { RecipeDetailData } from '@/interfaces/recipelistInterface';
import DetailTextCard from '../Card/DetailTextCard';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function RecipeDetailClient() {
  const { id } = useParams();
  if (!id) return null;

  const [userId, setUserId] = useState<string | null>(null);

  const {
    data: recipeDetail,
    isLoading: recipeDetailLoading,
    error: recipeDetailError
  } = useQuery<RecipeDetailData>({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipe(String(id))
  });

  const [liked, setLiked] = useState(recipeDetail?.likeUsers?.some(likeUser => likeUser.id === userId));

  const useLikeMutation = (id: string) => {
    const queryClient = useQueryClient();

    return {
      likeMutate: useMutation({
        mutationFn: async () => await fetchLikePost(String(id)),
        onMutate: async () => {
          const previousRecipe = queryClient.getQueryData(['recipe', id]);
          queryClient.setQueryData(['recipe', id], (oldData: any) => ({
            ...oldData,
            likeCount: oldData.likeCount + 1,
            likeUsers: [...oldData.likeUsers, { id: userId }]
          }));
          return { previousRecipe };
        },

        onError: (context: any) => {
          const previousRecipe = context.previousRecipe;
          if (previousRecipe) {
            queryClient.setQueryData(['recipe', id], previousRecipe);
          }
        },

        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['recipe', id] });
        }
      }),

      unLikeMutate: useMutation({
        mutationFn: () => fetchUnlikePost(String(id)),

        onMutate: async () => {
          const previousRecipe = queryClient.getQueryData(['recipe', id]);

          queryClient.setQueryData(['recipe', id], (oldData: any) => ({
            ...oldData,
            likeCount: oldData.likeCount - 1,
            likeUsers: oldData.likeUsers.filter((data: any) => data.id !== userId)
          }));

          return { previousRecipe };
        },

        onError: (context: any) => {
          queryClient.setQueryData(['recipe', id], context.previousRecipe);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['recipe', id] });
        }
      })
    };
  };

  const { likeMutate, unLikeMutate } = useLikeMutation(String(id));

  const toggleLike = () => {
    if (liked) {
      unLikeMutate.mutate();
    } else {
      likeMutate.mutate();
    }
    setLiked(prevLiked => !prevLiked);
  };

  if (recipeDetailLoading || !recipeDetail) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="로딩" width={200} height={200} />
      </div>
    );
  }

  if (recipeDetailError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-[1.5rem]">Failed to load data. Please try again later.</p>
      </div>
    );
  }

  const NutritionData = {
    calories: recipeDetail.calories,
    carbs: recipeDetail.carbs,
    fat: recipeDetail.fat,
    fiber: recipeDetail.fiber,
    protein: recipeDetail.protein,
    sodium: recipeDetail.sodium,
    sugars: recipeDetail.sugars
  };

  return (
    <div
      className="flex flex-col pt-[2rem] w-full items-center
    lg:px-0
    md:px-[2.4rem]
    sm:px-[1.6rem]"
    >
      <div
        className="relative overflow-hidden
      lg:w-[120rem] lg:h-[33rem]
      md:max-w-[120rem] md:min-w-[69.6rem] md:w-full md:h-[33rem]
      sm:max-w-[69.6rem] sm:min-w-[34.3rem] sm:w-full sm:h-[29.4rem]"
      >
        <Image src={recipeDetail.images[0]} alt="음식 이미지" layout="fill" objectFit="cover" objectPosition="center" />
      </div>
      <div
        className="mt-[2rem] flex flex-col gap-[1rem]
      lg:w-[120rem]
      md:w-full
      sm:w-full"
      >
        <p
          className="font-semibold leading-[2.387rem] text-gray-800
        lg:text-[2rem]
        md:text-[2rem]
        sm:text-[1.4rem]"
        >
          {recipeDetail.category}
        </p>
        <div className="flex w-full gap-[2rem] items-center">
          <p
            className="font-semibold leading-[3.819rem] text-gray-700
          lg:text-[3.2rem]
          md:text-[3.2rem]
          sm:text-[2.4rem]"
          >
            {recipeDetail.title}
          </p>
          <div className="flex gap-[0.4rem] items-center">
            <Image
              src={liked ? `${S3_BASE_URL}/icon_heart_active_large.svg` : `${S3_BASE_URL}/icon_heart_inactive_large.svg`}
              alt={liked ? '활성 하트' : '비활성 하트'}
              width={24}
              height={24}
              onClick={toggleLike}
              className="cursor-pointer"
            />
            <p
              className="font-medium leading-[1.671rem] text-gray-700
            lg:text-[1.4rem]
            md:text-[1.4rem]
            sm:text-[1.3rem]"
            >
              {recipeDetail.likeCount}
            </p>
          </div>
        </div>
      </div>
      <div
        className="border border-gray-200 mt-[2rem]
      lg:w-[120rem]
      md:w-full
      sm:w-full"
      ></div>
      <div
        className="flex flex-col mt-[2rem]
      lg:w-[120rem] 
      md:w-full 
      sm:w-full"
      >
        <div
          className="flex 
        lg:flex-row lg:justify-between lg:gap-0 lg:mb-10rem
        md:flex-col md:gap-[4rem] md:mb-[4rem]
        sm:flex-col sm:gap-[2.8rem] sm:mb-[2.8rem]"
        >
          <DetailTextCard type="ingredient" content={recipeDetail.ingredients} className="lg:order-1 md:order-2 sm:order-2" />
          <DetailTextCard type="nutrition" content={NutritionData} className="lg:order-2 md:order-1 sm:order-1" />
        </div>
        <div
          className="flex 
        lg:flex-row lg:justify-between lg:mb-10rem
        md:flex-col md:gap-[4rem] md:mb-[4rem]
        sm:flex-col sm:gap-[2.8rem] sm:mb-[2.8rem]"
        >
          <DetailTextCard type="direction" content={recipeDetail.direction} className="lg:order-1 md:order-2 sm:order-2" />
          <DetailTextCard type="benefit" content={recipeDetail.benefits} className="lg:order-2 md:order-1 sm:order-1" />
        </div>
      </div>
    </div>
  );
}
