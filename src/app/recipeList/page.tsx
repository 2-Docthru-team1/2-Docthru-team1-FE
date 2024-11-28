import RecipeListClient from '@/components/ClientWrapper/RecipeListClient';

export default async function RecipePage() {
  const DUMMY: any[] = [];

  if (process.env.NODE_ENV === 'production') {
    return DUMMY;
  }

  return (
    <div>
      <RecipeListClient />
    </div>
  );
}
