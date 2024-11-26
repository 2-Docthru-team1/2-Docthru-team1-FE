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
  calories: number;
  carbs: number;
  fat: number;
  fiber: number;
  protein: number;
  sodium: number;
  sugars: number;
  title: string;
}
