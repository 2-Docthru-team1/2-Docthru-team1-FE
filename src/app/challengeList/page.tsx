import { fetchAdminChallenge, fetchChallenge, fetchRanker, getFilteredChallenges } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

export default async function ChallengeListPage() {
  const DUMMY: any[] = [];

  if (process.env.NODE_ENV === 'production') {
    return DUMMY;
  }

  const adminchallengeData = [
    {
      id: '1',
      title: 'Mastering Kimchi Making',
      mediaType: 'youtube' as 'youtube',
      status: 'onGoing' as 'onGoing',
      deadline: '2024-12-10T23:59:59.000Z'
    },
    {
      id: '2',
      title: '5 Days of Korean Vegan Recipes',
      mediaType: 'blog' as 'blog',
      status: 'finished' as 'finished',
      deadline: '2024-11-18T23:59:59.000Z'
    },
    {
      id: '3',
      title: 'Quick Korean BBQ Tips',
      mediaType: 'socialMedia' as 'socialMedia',
      status: 'onGoing' as 'onGoing',
      deadline: '2024-11-28T23:59:59.000Z'
    }
  ];

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

  // const adminchallengeData = await fetchAdminChallenge();
  const { list, totalCount } = await getFilteredChallenges();
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
