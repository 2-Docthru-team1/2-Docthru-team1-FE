import axios from 'axios';
import RecipeCard from '@/components/Card/RecipeCard';
import SearchBar from '@/components/SearchBar/SearchBar';

export async function getStaticProps() {
  const res = await axios.get('http://localhost:3000/mockData.json');
  const initialData = await res.data;
  return {
    props: {
      initialData,
    },
  };
}

interface RecipeData {
  title: string;
  likeCount: number;
  category: string;
  images: string[];
}

interface RecipeListProps {
  initialData: RecipeData[];
}

export default function RecipeList({ initialData }: RecipeListProps) {
  return (
    <div>
      <SearchBar />
      {initialData.map((data, index) => (
        <RecipeCard key={index} data={data} />
      ))}
    </div>
  );
}
