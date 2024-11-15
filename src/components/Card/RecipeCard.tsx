import Image from 'next/image';
import inactiveHeart from '@/../public/assets/icon_heart_inact_small.png';
import foodImg from '@/../public/temporaryAssets/Food.svg';
import styles from './RecipeCard.module.css';

export default function RecipeCard() {
  return (
    <div className={styles.card}>
      <Image src={foodImg} alt="음식 이미지" />
      <div className={styles.info}>
        <p className={styles.category}>TRADITIONAL</p>
        <p className={styles.food_name}>BIBIMBAP</p>
        <div className={styles.heart_info}>
          <Image src={inactiveHeart} alt="하트" />
          <p className={styles.heart_count}>84</p>
        </div>
      </div>
    </div>
  );
}
