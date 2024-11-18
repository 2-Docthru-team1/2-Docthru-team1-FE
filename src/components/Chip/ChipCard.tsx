import Image from 'next/image';
import clock from '@/../public/assets/icon_deadline_clock_small_white.png';
import type { ChipCardProps } from '@/interfaces/chipcardInterface';

export default function ChipCard({ type }: ChipCardProps) {
  return (
    <>
      {type === 'ongoing' ? (
        <div className="w-[9.1rem] py-[0.8rem] px-[1.2rem] flex gap-[0.4rem] rounded-[2.4rem] bg-gray-200 items-center justify-center">
          <div className="w-[0.9rem] h-[0.9rem] bg-[#F24744] rounded-full" />
          <p className="font-medium text-[1.3rem] leading-[1.551rem] items-center flex">On going</p>
        </div>
      ) : (
        <div className="w-[19.3rem] py-[0.8rem] px-[1.2rem] rounded-[2.4rem] bg-gray-700 gap-[0.4rem] flex items-center justify-center">
          <Image src={clock} alt="시계" />
          <p className="font-medium text-[1.3rem] leading-[1.551rem] text-[#ffffff] items-center justify-center flex">
            The challenge has ended
          </p>
        </div>
      )}
    </>
  );
}
