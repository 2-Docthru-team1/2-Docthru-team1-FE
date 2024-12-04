import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import clock from '@/../public/assets/icon_deadline_clock_large.png';
import type { OptionBoxProps } from '@/interfaces/optionboxInterface';

export default function OptionBox({ type, id, date, url }: OptionBoxProps) {
  const [buttonText, setButtonText] = useState('Participate Challenge');
  const isFinished = type === 'finished';
  const bgColor = type === 'finished' ? 'bg-gray-200' : 'bg-primary-beige';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yyyy-MM-dd');
  };

  useEffect(() => {
    const updateButtonText = () => {
      if (window.innerWidth < 744) {
        setButtonText('Participate');
      } else if (type === 'onGoing') {
        setButtonText('Participate Challenge');
      } else {
        setButtonText('Keep Participating');
      }
    };

    updateButtonText();
    window.addEventListener('resize', updateButtonText);

    return () => {
      window.removeEventListener('resize', updateButtonText);
    };
  }, [type]);

  return (
    <div className="md:w-[28.5rem] md:h-[17.6rem] sm:w-[34.3rem] sm:h-[10.4rem] rounded-[1.6rem] border-2 border-gray-100 flex items-center justify-center bg-primary-white">
      <div className="md:w-[25.3rem] flex flex-col gap-[1.6rem]">
        <div className="flex items-center justify-center gap-[0.4rem]">
          <Image src={clock} alt="시계" />
          <p className="font-normal text-[1.3rem] leading-[1.551rem] text-gray-600">Closing on {formatDate(date)}</p>
        </div>
        <div className="flex md:flex-col items-center gap-[0.8rem] md:w-[25.3rem] sm: w-[31rem]">
          <Link href={url} target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="rounded-[0.8rem] bg-primary-blue w-full h-[4rem] font-bold text-[1.4rem] leading-[2.6rem] text-primary-white">
              See Content
            </button>
          </Link>
          <Link href={isFinished ? '#' : `/challengeList/${id}/edit`} className="w-full">
            <button
              className={`rounded-[0.8rem] w-full h-[4rem] font-bold text-[1.4rem] leading-[2.6rem] text-primary-white ${bgColor}`}
              disabled={isFinished}
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
