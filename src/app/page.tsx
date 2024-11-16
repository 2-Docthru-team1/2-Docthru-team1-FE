import { fetchMenu } from '@/api/recipeService';
import { RecipeData } from '@/interfaces/cardInterface';
import Header from '../components/Header';

export default async function Home() {
  const initialData: RecipeData[] = await fetchMenu();

  return (
    <div>
      <Header>HanCook</Header>
    </div>
  );
}
