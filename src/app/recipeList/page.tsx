import { fetchMenu } from '@/api/recipeService';
import RecipeListClient from '@/components/ClientWrapper/RecipeListClient';

export default async function RecipePage() {
  const DUMMY: any[] = [];

  if (process.env.NODE_ENV === 'production') {
    return DUMMY;
  }

  const initialData = await fetchMenu();

  return (
    <div>
      <RecipeListClient initialData={initialData.data} />
    </div>
  );
}
