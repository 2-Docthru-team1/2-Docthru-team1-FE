import Image from 'next/image';
import type { ChipCardProps } from '@/interfaces/chipInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ChipCard({ type }: ChipCardProps) {
  return (
    <>
      {type === 'onGoing' ? (
        <div className="w-[9.1rem] py-[0.8rem] px-[1.2rem] flex gap-[0.4rem] rounded-[2.4rem] bg-gray-200 items-center justify-center">
          <div className="w-[0.9rem] h-[0.9rem] bg-[#F24744] rounded-full" />
          <p className="font-medium text-[1.3rem] leading-[1.551rem] items-center flex">On going</p>
        </div>
      ) : (
        <div className="w-[19.3rem] py-[0.8rem] px-[1.2rem] rounded-[2.4rem] bg-gray-700 gap-[0.4rem] flex items-center justify-center">
          <Image src={`${S3_BASE_URL}/ic_deadline_clock_white.svg`} alt="시계" width={16} height={16} />
          <p className="font-medium text-[1.3rem] leading-[1.551rem] text-[#ffffff] items-center justify-center flex">
            The challenge has ended
          </p>
        </div>
      )}
    </>
  );
}
