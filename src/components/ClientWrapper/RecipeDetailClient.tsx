'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchRecipe } from '@/api/recipeService';
import type { RecipeDetailData } from '@/interfaces/recipelistInterface';

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
    <div className="flex flex-col items-center mt-[2rem]">
      <div className="relative w-[120rem] h-[33rem] overflow-hidden">
        {recipe?.images.length > 0 && (
          <Image src={recipe.images[0]} alt="음식 이미지" layout="fill" objectFit="cover" objectPosition="center" />
        )}
      </div>
    </div>
  );
}
