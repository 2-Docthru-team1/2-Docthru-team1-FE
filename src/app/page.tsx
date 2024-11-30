'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cta from '@/components/Button/Cta';
import pcLogo from '../../public/assets/img_logo_pc.png';
import pcLanding from '../../public/assets/img_pc_landing.png';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/recipeList');
    }
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-gradient-to-b from-[#F5F5F5] to-primary-beige relative">
      <Image
        src={pcLanding}
        alt="Korean flag with seaweed paper"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-8"
      />
      <div className="flex flex-col items-center text-center gap-[8rem] relative">
        <div className="flex flex-col items-center text-center">
          <Image src={pcLogo} alt="HanCook Logo" width={462} height={92.4} />
          <p className="text-[2rem] font-semibold text-color-700">Capture and share your Hansik(Korean Food) cooking!</p>
        </div>
        <Cta url="/signIn">Go to Sign-in</Cta>
      </div>
    </div>
  );
}
