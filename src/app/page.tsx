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
      <div className="grid grid-cols-4 gap-[2.9rem] w-[120rem]">
        {initialData.map((data, index) => (
          <RecipeCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
}
