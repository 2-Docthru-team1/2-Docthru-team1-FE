import RecipeListClient from '@/components/ClientWrapper/RecipeListClient';

export default function RecipePage() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Recipe List</h1>
      <RecipeListClient />
    </div>
  );
}
