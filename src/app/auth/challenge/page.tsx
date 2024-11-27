import { fetchChallengeApplication } from '@/api/challengeService';
import ChallengeMgmtClient from '@/components/ClientWrapper/ChallengeMgmtClient';

export default async function challengeMgmt() {
  const ChallengeApplicationData = await fetchChallengeApplication();
  return <ChallengeMgmtClient data={ChallengeApplicationData} />;
}
