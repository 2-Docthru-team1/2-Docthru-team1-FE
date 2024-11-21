import { fetchChallenge } from '@/api/challengeService';
import ChallengeListClient from '@/components/ClientWrapper/ChallengeListClient';

export default async function ChallengeListPage() {
  const initialData = await fetchChallenge();

  return <div>{initialData.length > 0 ? <ChallengeListClient initialData={initialData} /> : <p>Loading...</p>}</div>;
}
