import RecipeCard from "@/components/Card/RecipeCard";
import Header from "../components/Header";
import { fetchMenu } from "@/api/recipeService";

interface RecipeData {
  title: string;
  likeCount: number;
  category: string;
  images: string[];
}

export default async function Home() {
  const initialData: RecipeData[] = await fetchMenu();

  return (
    <div>
      <Header>HanCook</Header>
    </div>
  );
}
