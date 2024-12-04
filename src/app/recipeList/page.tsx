import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import Image from 'next/image';
import { fetchAdminChallenge } from '@/api/challengeService';
import { fetchMenu } from '@/api/recipeService';
import RecipeListClient from '@/components/ClientWrapper/RecipeListClient';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

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
          <div className="flex w-full justify-center items-center min-h-screen">
            <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
          </div>
        )}
      </div>
    </HydrationBoundary>
  );
}
