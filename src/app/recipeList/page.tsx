import { fetchMenu } from '@/api/recipeService';
import RecipeListClient from '@/components/ClientWrapper/RecipeListClient';

type SearchParams = {
  keyword?: string;
  category?: string;
};

export default async function RecipePage({ searchParams }: { searchParams: SearchParams }) {
  const { keyword = '', category = '' } = await searchParams;
  const initialData = await fetchMenu(keyword, category);

  return (
    <div>
      <RecipeListClient initialData={initialData.data} />
    </div>
  );
}
