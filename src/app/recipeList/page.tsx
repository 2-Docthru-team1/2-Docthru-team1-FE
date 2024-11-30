import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchAdminChallenge } from '@/api/challengeService';
import { fetchMenu } from '@/api/recipeService';
import RecipeListClient from '@/components/ClientWrapper/RecipeListClient';

export default async function RecipePage() {
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const queryParams = `?monthly=${currentMonth}`;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['recipes'],
    queryFn: () => fetchMenu(1, 8, '', '')
  });

  const dehydratedState = dehydrate(queryClient);

  const adminchallengeData = await fetchAdminChallenge(queryParams);

  const Data = {
    adminchallengeData
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        {Object.values(Data).every(value => !!value) ? (
          <RecipeListClient adminchallengeData={adminchallengeData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </HydrationBoundary>
  );
}
