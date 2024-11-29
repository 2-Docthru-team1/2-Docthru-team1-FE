import { fetchAdminChallenge } from '@/api/challengeService';
import RecipeListClient from '@/components/ClientWrapper/RecipeListClient';

export default async function RecipePage() {
  const DUMMY: any[] = [];

  if (process.env.NODE_ENV === 'production') {
    return DUMMY;
  }

  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const queryParams = `?monthly=${currentMonth}`;

  const adminchallengeData = await fetchAdminChallenge(queryParams);

  const Data = {
    adminchallengeData
  };

  return (
    <div>
      {Object.values(Data).every(value => !!value) ? (
        <RecipeListClient adminchallengeData={adminchallengeData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
