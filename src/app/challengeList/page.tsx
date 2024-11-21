import { fetchChallenge } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

export default async function ChallengeListPage() {
  const { initialData, userId, role } = await fetchChallenge();

  return (
    <div>
      {initialData.length > 0 ? <ChallengeListClient initialData={initialData} userId={userId} role={role} /> : <p>Loading...</p>}
    </div>
  );
}
