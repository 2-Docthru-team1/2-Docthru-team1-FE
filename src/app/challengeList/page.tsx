import { fetchChallenge } from '@/api/challengeService';
import MonthlyChallengeCard from '@/components/Card/MonthlyChallengeCard';

export default async function ChallengePage() {
  const initialData = await fetchChallenge();
}
