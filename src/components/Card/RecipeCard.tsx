import Image from 'next/image';
import inactiveHeart from '@/../public/assets/icon_heart_inact_small.png';
import foodImg from '@/../public/temporaryAssets/Food.svg';
import data from '@/api/mockData.json';
import styles from './RecipeCard.module.css';

/**
 * @NOTE
 * 백엔드쪽에서 데이터 넘어온 게 없어서 임시로 목데이터 생성해서 작업했습니다.
 * 추후 수정예정입니다.
 */

export default function RecipeCard() {
  console.log(data);

  return (
    <div className={styles.card}>
      <Image src={foodImg} alt="음식 이미지" />
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
