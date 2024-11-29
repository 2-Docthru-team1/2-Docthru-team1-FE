import { fetchAdminChallenge, fetchChallenge, fetchRanker } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

export default async function ChallengeListPage() {
  const DUMMY: any[] = [];

  if (process.env.NODE_ENV === 'production') {
    return DUMMY;
  }

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
  const { list, totalCount } = await fetchChallenge(1, 4);
  // const rankerData = await fetchRanker();

  const Data = {
    adminchallengeData,
    list,
    rankerData
  };

  return (
    <div>
      {Object.values(Data).every(value => !!value) ? (
        <ChallengeListClient adminchallengeData={adminchallengeData} challengeData={list} rankerData={rankerData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
