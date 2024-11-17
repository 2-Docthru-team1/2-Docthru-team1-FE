'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import inactiveHeart from '@/../public/assets/icon_heart_inact_small.png';
import { fetchRecipe } from '@/api/recipeService';
import type { RecipeDetailData } from '@/interfaces/recipelistInterface';
import DetailTextCard from '../Card/DetailTextCard';

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col mt-[2rem] w-full items-center">
      <div className="relative w-[120rem] h-[33rem] overflow-hidden">
        {recipe?.images.length > 0 && (
          <Image src={recipe.images[0]} alt="음식 이미지" layout="fill" objectFit="cover" objectPosition="center" />
        )}
      </div>
      <div className="mt-[2rem] flex flex-col w-[120rem] gap-[1rem]">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-800">{recipe.category}</p>
        <div className="flex w-full gap-[2rem] items-center">
          <p className="font-semibold text-[3.2rem] leading-[3.819rem] text-gray-700">{recipe.title}</p>
          <div className="flex gap-[0.4rem] items-center">
            <Image src={inactiveHeart} alt="하트" width={24} height={24} />
            <p className="font-medium text-[1.4rem] leading-[1.671rem] text-gray-700">{recipe.likeCount}</p>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 w-[120rem] mt-[2rem]"></div>
      <div className="flex flex-col w-[120rem] mt-[2rem]">
        <div className="flex justify-between">
          <DetailTextCard type="ingredient" content={recipe.ingredients} />
          <DetailTextCard type="nutrition" content={recipe.nutrition} />
        </div>
        <div className="flex justify-between mt-[4rem]">
          <DetailTextCard type="direction" content={recipe.direction} />
          <DetailTextCard type="benefit" content={recipe.benefits} />
        </div>
      </div>
    </div>
  );
}
