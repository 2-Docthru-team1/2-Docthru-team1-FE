'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import type { ChallengeHeaderProps } from '@/interfaces/challengeInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ChallengeHeader({ onSubmit, isCardClicked, workId, onEdit, onSave }: ChallengeHeaderProps) {
  const { id } = useParams();
  const router = useRouter();

  const handleQuit = () => {
    router.push(`/challengeList/${id}`);
  };

  const handleBack = () => {
    router.push(`/challengeList/${id}/${workId}`);
  };

  return (
    <div
      className={`flex items-center justify-center mt-[3.6rem] lg:w-[70rem] lg:px-0 ${isCardClicked ? 'md:w-[38.8rem]' : 'md:w-full'} md:pl-0 md:max-w-[87.1rem] sm:w-full sm:max-w-[69.6rem] sm:pl-0`}
    >
      <div className="flex w-full h-[4rem] justify-between items-center lg:gap-0 md:gap-0 sm:gap-[1rem]">
        <p className="font-semibold text-[2rem] leading-[2.387rem] text-gray-700 lg:text-[2rem] md:text-[2rem] md:whitespace-normal sm:text-[1.6rem] sm:whitespace-normal">
          Write your challenge
        </p>
        <div className="flex justify-end lg:gap-[0.8rem] md:gap-[0.8rem] sm:gap-[0.3rem] w-full max-w-[28.9rem]">
          <div className="lg:w-[28rem] md:w-[23rem] sm: w-[21.4rem] sm:flex sm:justify-between">
            <button
              className="flex items-center bg-[#FFE7E7] rounded-[0.8rem] lg:py-[0.8rem] lg:px-[1.2rem] gap-[0.5rem] lg:w-[9rem] ld:max-w-[9rem] md:w-[4rem] md:h-[4rem] sm:w-[4rem] sm:h-[4rem] font-semibold text-[1.6rem] leading-[1.909rem] text-[#F24744] justify-center "
              onClick={workId ? handleBack : handleQuit}
            >
              <span className="hidden md:inline md:max-lg:hidden">Quit</span>
              <Image src={`${S3_BASE_URL}/icon_red_door.svg`} alt="문" width={24} height={24} />
            </button>
            <button
              className="lg:w-[9rem] md:w-[9rem] sm:w-[8rem] sm:h-[4rem] rounded-[0.8rem] bg-primary-white border border-gray-700 py-[0.3rem] px-[1.6rem] font-semibold text-[1.6rem] leading-[1.909rem]"
              onClick={onSave}
            >
              Save
            </button>
            <button
              onClick={workId ? onEdit : onSubmit}
              className="lg:w-[9rem] md:w-[9rem] sm:w-[9rem] rounded-[0.8rem] bg-primary-blue py-[0.3rem] px-[1.6rem] font-semibold text-[1.6rem] text-primary-white leading-[1.909rem]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
