export interface RecipeCardProps {
  data: RecipeData | null;
}

export interface RecipeData {
  id: string;
  title: string;
  likeCount: number;
  category: string;
  images: string[];
}

export interface DetailTextCardProps {
  type: 'ingredient' | 'direction' | 'nutrition' | 'benefit';
  content: string[] | NutritionContent;
}

export interface NutritionContent {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sugars: number;
  sodium: number;
  fiber: number;
}

export interface BenefitContent {
  intro: string;
  content: string[];
}

export interface MonthlyChallengeCardProps {
  data: MonthlyChallengeCard | null;
}

export interface MonthlyChallengeCard {
  id: string;
  title: string;
  category: string;
  mediaType: string;
  status: 'ongoing' | 'closed';
  closingDate: string; // 마감 날짜 (ISO 형식)
}
