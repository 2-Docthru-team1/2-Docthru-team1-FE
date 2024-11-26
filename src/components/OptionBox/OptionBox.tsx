import Image from 'next/image';
import Link from 'next/link';
import clock from '@/../public/assets/icon_deadline_clock_large.png';
import type { OptionBoxProps } from '@/interfaces/optionboxInterface';

// TODO: 추후 button Link는 수정 예정입니다.

export default function OptionBox({ type, id }: OptionBoxProps) {
  console.log(type);
  const isFinished = type === 'finished';
  const participateButtonText = type === 'onGoing' ? 'Keep Participating' : 'Participate Challenge';
  const bgColor = type === 'finished' ? 'bg-gray-200' : 'bg-primary-beige';

  return (
    <div className="w-[28.5rem] h-[17.6rem] rounded-[1.6rem] border-2 border-gray-100 flex items-center justify-center bg-primary-white">
      <div className="w-[25.3rem] flex flex-col gap-[1.6rem]">
        <div className="flex items-center justify-center gap-[0.4rem]">
          <Image src={clock} alt="시계" />
          <p className="font-normal text-[1.3rem] leading-[1.551rem] text-gray-600">Closing on 2024-03-03</p>
        </div>
        <div className="flex flex-col items-center gap-[0.8rem] w-[25.3rem]">
          <Link href="https://www.example.com" className="w-full">
            <button className="rounded-[0.8rem] bg-primary-blue w-full h-[4rem] font-bold text-[1.4rem] leading-[2.6rem] text-primary-white">
              See Content
            </button>
          </Link>
          <Link href={isFinished ? '#' : `/challengeList/${id}/edit`} className="w-full">
            <button
              className={`rounded-[0.8rem] w-full h-[4rem] font-bold text-[1.4rem] leading-[2.6rem] text-primary-white ${bgColor}`}
              disabled={isFinished}
            >
              {participateButtonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
