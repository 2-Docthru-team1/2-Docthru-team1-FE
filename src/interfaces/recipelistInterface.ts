import type { NutritionContent, RecipeData } from './cardInterface';

export interface RecipeListClientProps {
  initialData: {
    list: RecipeData[];
    totalCount: number;
  };
}

export interface RecipeDetailData {
  benefits: string[];
  category: string;
  direction: string[];
  id: number;
  images: string[];
  ingredients: string[];
  likeCount: number;
  nutrition: NutritionContent;
  title: string;
}
