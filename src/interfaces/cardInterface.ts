export interface RecipeCardProps {
  data: RecipeData | null;
}

export interface RecipeData {
  title: string;
  likeCount: number;
  category: string;
  images: string[];
}
