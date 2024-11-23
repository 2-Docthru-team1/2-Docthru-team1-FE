import type { NutritionContent, RecipeData } from './cardInterface';

export interface RecipeListClientProps {
  initialData: RecipeData[];
  initialKeyword: string;
  initialCategory: string;
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
