'use client';

import Image from 'next/image';
import { useState } from 'react';
import click from '@/../public/assets/icon_click.png';
import ref from '@/../public/assets/icon_ref.png';
import type { ChallengeRefPageCardProps } from '@/interfaces/ChallengeRefInterface';

export default function ChallengeRefPageCard({ embedUrl }: ChallengeRefPageCardProps) {
  const [showSecondButton, setShowSecondButton] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  const handleFirstButtonClick = () => {
    setShowSecondButton(true);
    setShowIframe(true);
  };

  const handleSecondButtonClick = () => {
    setShowIframe(true);
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden flex justify-end items-start">
      {!showSecondButton ? (
        <div
          className="mt-[7.6rem] w-[5.2rem] h-[9.9rem] flex items-center justify-center rounded-tl-[2.4rem] rounded-bl-[2.4rem] border-2 border-gray-100"
          style={{ boxShadow: '0 4px 4px 4px #585C820D' }}
        >
          <button
            onClick={handleFirstButtonClick}
            className="flex flex-col items-center font-semibold text-[1.6rem] leading-[1.909rem] text-gray-500"
          >
            <Image src={ref} alt="ref" />
            Ref
          </button>
        </div>
      ) : (
        <div className="flex absolute top-4 right-4 bg-[#F6F8FA80] opacity-50 px-4 py-2 rounded-[1rem] gap-[0.2rem]">
          <button
            onClick={handleSecondButtonClick}
            className="flex items-center font-bold text-[1.4rem] leading-[2.6rem] text-gray-700"
          >
            Open Link
            <Image src={click} alt="화살표" />
          </button>
        </div>
      )}
      {showIframe && <iframe src={embedUrl} title="Embedded Content" width={640} height="100%" allowFullScreen />}
    </div>
  );
}
