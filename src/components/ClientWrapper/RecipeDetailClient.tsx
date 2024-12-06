'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import inactiveHeart from '@/../public/assets/icon_heart_inact_small.png';
import { fetchRecipe } from '@/api/recipeService';
import type { RecipeDetailData } from '@/interfaces/recipelistInterface';
import DetailTextCard from '../Card/DetailTextCard';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function RecipeDetailClient() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState<RecipeDetailData | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      const getRecipe = async () => {
        const data = await fetchRecipe(id);
        setRecipe(data);
      };
      getRecipe();
    }
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
      </div>
    );
  }

  const NutritionData = {
    calories: recipe.calories,
    carbs: recipe.carbs,
    fat: recipe.fat,
    fiber: recipe.fiber,
    protein: recipe.protein,
    sodium: recipe.sodium,
    sugars: recipe.sugars
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
        <Image src={recipe.images[0]} alt="음식 이미지" layout="fill" objectFit="cover" objectPosition="center" />
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
          {recipe.category}
        </p>
        <div className="flex w-full gap-[2rem] items-center">
          <p
            className="font-semibold leading-[3.819rem] text-gray-700
          lg:text-[3.2rem]
          md:text-[3.2rem]
          sm:text-[2.4rem]"
          >
            {recipe.title}
          </p>
          <div className="flex gap-[0.4rem] items-center">
            <Image src={`${S3_BASE_URL}/icon_heart_inactive_large.svg`} alt="하트" width={24} height={24} />
            <p
              className="font-medium leading-[1.671rem] text-gray-700
            lg:text-[1.4rem]
            md:text-[1.4rem]
            sm:text-[1.3rem]"
            >
              {recipe.likeCount}
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
          <DetailTextCard type="ingredient" content={recipe.ingredients} className="lg:order-1 md:order-2 sm:order-2" />
          <DetailTextCard type="nutrition" content={NutritionData} className="lg:order-2 md:order-1 sm:order-1" />
        </div>
        <div
          className="flex 
        lg:flex-row lg:justify-between lg:mb-10rem
        md:flex-col md:gap-[4rem] md:mb-[4rem]
        sm:flex-col sm:gap-[2.8rem] sm:mb-[2.8rem]"
        >
          <DetailTextCard type="direction" content={recipe.direction} className="lg:order-1 md:order-2 sm:order-2" />
          <DetailTextCard type="benefit" content={recipe.benefits} className="lg:order-2 md:order-1 sm:order-1" />
        </div>
      </div>
    </div>
  );
}
