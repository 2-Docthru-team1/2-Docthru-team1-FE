import { fetchAdminChallenge, fetchChallenge, fetchRanker } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

export default async function ChallengeListPage() {
  const adminchallengeData = await fetchAdminChallenge();
  const { challengeData, userId, role } = await fetchChallenge();
  const rankerData = await fetchRanker();

  return (
    <div>
      {challengeData.length > 0 ? (
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
