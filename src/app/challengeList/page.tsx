import { fetchAdminChallenge, fetchChallenge, fetchRanker } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

export default async function ChallengeListPage() {
  const adminchallengeData = await fetchAdminChallenge();
  const { challengeData, userId, role } = await fetchChallenge();
  const rankerData = await fetchRanker();

  const Data = {
    adminchallengeData,
    challengeData,
    userId,
    role,
    rankerData
  };

  return (
    <div>
      {Object.values(Data).every(value => !!value) ? (
        <ChallengeListClient
          adminchallengeData={adminchallengeData}
          challengeData={challengeData}
          userId={userId}
          role={role}
          rankerData={rankerData}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
