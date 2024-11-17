import { fetchMenu } from '@/api/recipeService';
import RecipeListClient from '@/components/ClientWrapper/RecipeListClient';

export default async function RecipePage() {
  const initialData = await fetchMenu();

  return <div>{initialData.length > 0 ? <RecipeListClient initialData={initialData} /> : <p>Loading...</p>}</div>;
}
