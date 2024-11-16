import { fetchChallenges } from '@/api/challengeService';
import { fetchMenu } from '@/api/recipeService';
import { RecipeData } from '@/interfaces/cardInterface';
import { ChallengeData } from '@/interfaces/challengeInterface';
import Header from '../components/Header';

export default async function Home() {
  const initialData: RecipeData[] = await fetchMenu();

  const challenges: ChallengeData[] = await fetchChallenges();

  return (
    <div>
      <Header>HanCook</Header>
    </div>
  );
}
