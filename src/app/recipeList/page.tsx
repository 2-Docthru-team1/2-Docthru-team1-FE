import { fetchAdminChallenge } from '@/api/challengeService';
import RecipeListClient from '@/components/ClientWrapper/RecipeListClient';

export default async function RecipePage() {
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
