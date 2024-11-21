import Image from 'next/image';
import click from '@/../public/assets/icon_click.png';
import type { ChallengeRefPageCardProps } from '@/interfaces/ChallengeRefInterface';

export default function ChallengeRefPageCard({ embedUrl }: ChallengeRefPageCardProps) {
  return (
    <div className="relative w-full h-[100vh] border border-gray-300 rounded-lg overflow-hidden flex justify-end items-start">
      <div className="flex absolute top-4 right-4 bg-[#F6F8FA80] opacity-50 px-4 py-2 rounded-[1rem] gap-[0.2rem]">
        <button className="flex items-center font-bold text-[1.4rem] leading-[2.6rem] text-gray-700">
          Open Link
          <Image src={click} alt="화살표" className="ml-2" />
        </button>
      </div>
      <iframe src={embedUrl} title="Embedded Content" width={640} height="100%" allowFullScreen />
    </div>
  );
}
