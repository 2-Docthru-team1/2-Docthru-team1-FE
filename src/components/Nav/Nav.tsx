import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import bell from '@/../public/assets/icon_bell_default.png';
import translate from '@/../public/assets/icon_translate.png';
import logo from '@/../public/assets/img_logo_pc.png';
import profile from '@/../public/assets/img_profile_member.png';
import styles from './Nav.module.css';

export default function Nav() {
  const router = useRouter();

  return (
    <div className={styles.nav_bar}>
      <div className={styles.nav_bar_wrapper}>
        <div className={styles.nav_page_options}>
          <Image src={logo} alt="로고" width={146} height={29.2} />
          <div className={styles.options}>
            <Link href="/RecipeList">
              <p className={`${styles.recipe_option} ${router.pathname === '/RecipeList' ? styles.active_button : ''}`}>Recipe</p>
            </Link>
            <Link href="/Challenge">
              <p className={`${styles.challenge_option}  ${router.pathname.includes('/Challenge') ? styles.active_button : ''}`}>
                Challenge
              </p>
            </Link>
          </div>
        </div>
        <div className={styles.nav_toggle_options}>
          <Image src={translate} alt="번역" width={24} height={24} />
          <Image src={bell} alt="벨" width={24} height={24} />
          <Image src={profile} alt="프로필" width={32} height={32} />
        </div>
      </div>
    </div>
  );
}
