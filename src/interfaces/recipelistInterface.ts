import type { RecipeData } from './cardInterface';

export interface RecipeListClientProps {
  initialData: RecipeData[];
}

export interface RecipeDetailData {
  benefits: string[];
  category: string;
  direction: string[];
  id: number;
  images: string[];
  ingredients: string[];
  likeCount: number;
  nutrition: string[];
  title: string;
}
