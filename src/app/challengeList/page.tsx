import { fetchChallenge, fetchRanker } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

export default async function ChallengeListPage() {
  const { initialData, userId, role } = await fetchChallenge();
  const { rankerData } = await fetchRanker();

  return (
    <div>
      {initialData.length > 0 ? (
        <ChallengeListClient initialData={initialData} rankerData={rankerData} userId={userId} role={role} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
