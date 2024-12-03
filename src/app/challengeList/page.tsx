import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchAdminChallenge, fetchChallenge, fetchRanker } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

export default async function ChallengeListPage() {
  const rankerData = [
    {
      id: '1',
      name: 'Alice Kim',
      profileImage: '/assets/img_profile_member.png',
      totalLikes: 3288,
      role: 'koo-koo'
    },
    {
      id: '2',
      name: 'Bob Lee',
      profileImage: '/assets/img_profile_member.png',
      totalLikes: 2145,
      role: 'koo-koo'
    },
    {
      id: '3',
      name: 'Charlie Park',
      profileImage: '/assets/img_profile_member.png',
      totalLikes: 1209,
      role: 'koo-koo'
    }
  ];

  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const monthParams = `?monthly=${currentMonth}`;

  const adminchallengeData = await fetchAdminChallenge(monthParams);

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ['challenges'],
    queryFn: () => fetchChallenge(1, 4, '')
  });
  const dehydratedState = dehydrate(queryClient);

  // const rankerData = await fetchRanker();

  const Data = {
    adminchallengeData,
    rankerData
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        {Object.values(Data).every(value => !!value) ? (
          <ChallengeListClient adminchallengeData={adminchallengeData} rankerData={rankerData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </HydrationBoundary>
  );
}
