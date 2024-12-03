'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import click from '@/../public/assets/icon_click.png';
import close from '@/../public/assets/icon_out_circle_large.png';
import ref from '@/../public/assets/icon_ref.png';
import type { ChallengeRefPageCardProps } from '@/interfaces/ChallengeRefInterface';

export default function ChallengeRefPageCard({ embedUrl }: ChallengeRefPageCardProps) {
  const [showLinkButton, setShowLinkButton] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [isPcScreen, setIsPcScreen] = useState<boolean>(false);
  const [isTabletScreen, setIsTabletScreen] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  useEffect(() => {
    const updatePcScreenSize = () => {
      setIsPcScreen(window.innerWidth >= 1200);
    };
    const updateTabletScreenSize = () => {
      setIsTabletScreen(window.innerWidth < 1200);
    };
    const updateMobileScreenSize = () => {
      setIsMobileScreen(window.innerWidth < 744);
    };
    updatePcScreenSize();
    updateTabletScreenSize();
    updateMobileScreenSize();
    window.addEventListener('pcResize', updatePcScreenSize);
    window.addEventListener('tabletResize', updateTabletScreenSize);
    window.addEventListener('mobileResize', updateMobileScreenSize);
    return () => {
      window.removeEventListener('pcResize', updatePcScreenSize);
      window.removeEventListener('tabletResize', updateTabletScreenSize);
      window.removeEventListener('mobileResize', updateMobileScreenSize);
    };
  }, []);

  const handleRefButtonClick = useCallback(() => {
    setShowLinkButton(true);
    setShowIframe(true);
  }, []);

  const handleRefCloseButtonClick = useCallback(() => {
    setShowLinkButton(false);
    setShowIframe(false);
  }, []);

  const handleLinkButtonClick = useCallback(() => {
    setShowIframe(true);
  }, []);

  return (
    <div className="relative lg:w-full md:w-[31.4rem] lg:h-[60rem] md:h-[65rem] sm:w-full sm:h-[36rem] rounded-lg overflow-hidden flex justify-end items-start">
      {!showLinkButton ? (
        <div
          className="mt-[7.6rem] lg:w-[5.2rem] lg:h-[9.9rem] md:w-[6.9rem] md:h-[5.2rem] sm:w-[6.9rem] sm:h-[5.2rem]  flex items-center justify-center rounded-tl-[2.4rem] rounded-bl-[2.4rem] border-2 border-gray-100 bg-primary-white"
          style={{ boxShadow: '0 4px 4px 4px #585C820D' }}
        >
          <button
            onClick={handleRefButtonClick}
            className="flex flex-col items-center font-semibold text-[1.6rem] leading-[1.909rem] text-gray-500"
          >
            <Image src={ref} alt="ref" />
            Ref
          </button>
        </div>
      ) : (
        <div className="flex lg:w-[36.8rem] md:w-[30rem] sm:w-[36rem] justify-between items-center absolute top-4 right-4 bg-[#F6F8FA80] opacity-50 px-4 py-2 rounded-[1rem] gap-[0.2rem]">
          <Image src={close} alt="닫기" onClick={handleRefCloseButtonClick} className="cursor-pointer" />
          <Link href={embedUrl}>
            <button
              className="flex items-center font-bold text-[1.4rem] leading-[2.6rem] text-gray-700 whitespace-nowrap"
              onClick={handleLinkButtonClick}
            >
              Open Link
              <Image src={click} alt="화살표" />
            </button>
          </Link>
        </div>
      )}
      {showIframe && (
        <iframe
          src={embedUrl}
          title="Embedded Content"
          width={isMobileScreen ? 640 : isTabletScreen ? 314 : isPcScreen ? 400 : 0}
          height="100%"
          allowFullScreen
        />
      )}
    </div>
  );
}
