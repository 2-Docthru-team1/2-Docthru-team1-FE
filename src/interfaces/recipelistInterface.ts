import type { NutritionContent, RecipeData } from './cardInterface';

export interface RecipeListClientProps {
  list: RecipeData[];
  totalCount: number;
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

export interface AdminData {
  id: string;
  title: string;
  mediaType: 'youtube' | 'blog' | 'socialMedia' | 'recipeWeb';
  status: 'onGoing' | 'finished';
  deadline: string;
}

export interface AdminListClientProps {
  adminchallengeData: AdminData[];
}
