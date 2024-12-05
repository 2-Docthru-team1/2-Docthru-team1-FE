'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import type { ToastProps } from '@/interfaces/toastInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ToastComponent({ onClose, duration = 10000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="flex justify-between lg:w-[89rem] md:w-[69.6rem] sm:w-[34.3rem] p-[0.8rem] border border-gray-200 bg-primary-white rounded-[0.8rem]">
      <div className="flex gap-[0.8rem] items-center">
        <Image src={`${S3_BASE_URL}/icon_close.svg`} alt="X" width={24} height={24} onClick={onClose} />
        <p className="font-medium text-[1.4rem] leading-[1.671rem] text-gray-700">
          Would you like to upload your previous draft?
        </p>
      </div>
      <button className="w-[9rem] h-[3.2rem] rounded-[0.8rem] py-[0.2rem] px-[1.6rem] gap-[0.4rem] bg-primary-blue font-semibold text-[1.4rem] leading-[1.671rem] text-primary-white">
        Yes
      </button>
    </div>
  );
}
