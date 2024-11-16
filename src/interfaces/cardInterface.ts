export interface RecipeCardProps {
  data: RecipeData;
}

export interface RecipeData {
  title: string;
  likeCount: number;
  category: string;
  images: string[];
}
