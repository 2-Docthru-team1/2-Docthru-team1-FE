import Image from "next/image";
import inactiveHeart from "@/../public/assets/icon_heart_inact_small.png";
import styles from "./RecipeCard.module.css";

/**
 * @NOTE
 * 백엔드쪽에서 데이터 넘어온 게 없어서 임시로 목데이터 생성해서 작업했습니다.
 * 추후 수정예정입니다.
 */

interface RecipeData {
  title: string;
  likeCount: number;
  category: string;
  images: string[];
}

interface RecipeCardProps {
  data: RecipeData;
}

export default function RecipeCard({ data }: RecipeCardProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.card}>
      <Image src={data.images[0]} alt="음식 이미지" width={278} height={167} />
      <div className={styles.info}>
        <p className={styles.category}>{data.category}</p>
        <p className={styles.food_name}>{data.title}</p>
        <div className={styles.heart_info}>
          <Image src={inactiveHeart} alt="하트" />
          <p className={styles.heart_count}>{data.likeCount}</p>
        </div>
      </div>
    </div>
  );
}
