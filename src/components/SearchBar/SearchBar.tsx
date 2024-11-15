import Image from 'next/image';
import filter from '@/../public/assets/icon_filter.png';
import search from '@/../public/assets/icon_search.png';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <div className={styles.search_bar}>
      <div className={styles.sort}>
        <p className={styles.sort_text}>Sort</p>
        <Image src={filter} alt="깔때기" />
      </div>
      <div className={styles.search}>
        <Image src={search} alt="돋보기" />
        <input className={styles.search_input} placeholder="Search recipe" />
      </div>
    </div>
  );
}
