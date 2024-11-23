import { fetchAdminChallenge, fetchChallenge, fetchRanker } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

export default async function ChallengeListPage() {
  const adminchallengeData = await fetchAdminChallenge();
  const { list, totalCount } = await fetchChallenge();
  const rankerData = await fetchRanker();
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
