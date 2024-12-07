import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import Image from 'next/image';
import { fetchAdminChallenge, fetchChallenge, fetchRanker } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default async function ChallengeListPage() {
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const monthParams = `?monthly=${currentMonth}`;

  const adminchallengeData = await fetchAdminChallenge(monthParams);

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['challenges'],
    queryFn: () => fetchChallenge(1, 4, '')
  });
  queryClient.prefetchQuery({
    queryKey: ['rankers', currentMonth],
    queryFn: () => fetchRanker(currentMonth)
  });

  const dehydratedState = dehydrate(queryClient);

  // const rankerData = await fetchRanker(currentMonth);

  const Data = {
    adminchallengeData
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        {Object.values(Data).every(value => !!value) ? (
          <ChallengeListClient adminchallengeData={adminchallengeData} />
        ) : (
          <div className="flex w-full justify-center items-center min-h-screen">
            <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
          </div>
        )}
      </div>
    </HydrationBoundary>
  );
}
