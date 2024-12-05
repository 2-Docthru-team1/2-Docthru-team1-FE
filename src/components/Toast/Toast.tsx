'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import type { ToastProps } from '@/interfaces/toastInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ToastComponent({ message, onClose, duration = 10000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <div>
      <div>
        <Image src={`${S3_BASE_URL}/icon_close.svg`} alt="X" width={24} height={24} />
        <p>Would you like to upload your previous draft?</p>
      </div>
      <div>
        <button>Yes</button>
      </div>
    </div>
  );
}
