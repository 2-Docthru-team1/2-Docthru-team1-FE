'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cta from '@/components/Button/Cta';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function Home() {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(`${S3_BASE_URL}/img_pc_landing.svg`);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setCurrentImage(`${S3_BASE_URL}/img_pc_landing.svg`);
      } else if (width >= 744) {
        setCurrentImage(`${S3_BASE_URL}/img_tablet_landing.svg`);
      } else {
        setCurrentImage(`${S3_BASE_URL}/img_mobile_landing.svg`);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/recipeList');
    }
  }, []);
  return (
    <div className="flex flex-col items-center h-[100vh] bg-gradient-to-b from-[#F5F5F5] to-primary-beige relative">
      <Image
        src={currentImage}
        alt="Korean flag with seaweed paper"
        className="absolute lg:top-[45rem] md:top-[33rem] sm:top-[27rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        priority
      />
      <div className="flex flex-col items-center text-center lg:gap-[8rem] md:gap-[6.1rem] sm:gap-[3.1rem] lg:mt-[35.1rem] md:mt-[23rem] sm:mt-[20.3rem] relative">
        <div className="flex flex-col items-center text-center">
          <Image
            src={`${S3_BASE_URL}/img_logo_pc.svg`}
            alt="HanCook Logo"
            className="md:w-[46.2rem] md:h-auto sm:w-[23rem] sm:h-auto"
          />
          <p className="mt-[1.2rem] md:text-[2rem] sm:text-[1.4rem] font-semibold text-gray-700 md:leading-[2.6rem] sm:leading-[1.8rem]">
            Capture and share your <br className="sm:block md:hidden" /> Hansik(Korean Food) cooking!
          </p>
        </div>
        <Cta url="/signIn">Go to Sign-in</Cta>
      </div>
    </div>
  );
}
