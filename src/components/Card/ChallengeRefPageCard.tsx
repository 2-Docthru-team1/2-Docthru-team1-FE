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
  const [processedUrl, setProcessedUrl] = useState<string>('');

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

  useEffect(() => {
    if (embedUrl) {
      if (embedUrl.includes('youtube.com/watch?v=')) {
        const videoId = embedUrl.split('v=')[1]?.split('&')[0];
        setProcessedUrl(`https://www.youtube.com/embed/${videoId}`);
      } else {
        setProcessedUrl(embedUrl);
      }
    }
  }, [embedUrl]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden flex justify-end items-start">
      {!showLinkButton ? (
        <div
          className="mt-[7.6rem] w-[5.2rem] h-[9.9rem] flex items-center justify-center rounded-tl-[2.4rem] rounded-bl-[2.4rem] border-2 border-gray-100 bg-primary-white"
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
        <div className="flex w-[60.8rem] justify-between items-center absolute top-4 right-4 bg-[#F6F8FA80] opacity-50 px-4 py-2 rounded-[1rem] gap-[0.2rem]">
          <Image src={close} alt="닫기" onClick={handleRefCloseButtonClick} className="cursor-pointer" />
          <Link href={processedUrl} target="_blank" rel="noopener noreferrer">
            <button
              className="flex items-center font-bold text-[1.4rem] leading-[2.6rem] text-gray-700"
              onClick={handleLinkButtonClick}
            >
              Open Link
              <Image src={click} alt="화살표" />
            </button>
          </Link>
        </div>
      )}
      {showIframe &&
        (processedUrl.includes('youtube.com') ? (
          <iframe
            src={processedUrl}
            title="Embedded Content"
            width="640"
            height="100%"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <iframe src={processedUrl} title="Embedded Content" width="640" height="100%" allowFullScreen />
        ))}
    </div>
  );
}
