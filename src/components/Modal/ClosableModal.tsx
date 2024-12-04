import Image from 'next/image';
import type { ClosableModalProps } from '@/interfaces/modalInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ClosableModal({ isOpen, onClose, title, children }: ClosableModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#000000] bg-opacity-50">
      <div className="rounded-[0.8rem] border-2 border-gray-200 md:py-[2.4rem] md:px-[2.4rem] sm:py-[1.6rem] sm:px-[1.6rem] bg-primary-white">
        <div className="flex justify-between items-center">
          <p className="font-bold text-[1.8rem] leading-[2.6rem] text-gray-700">{title}</p>
          <Image
            src={`${S3_BASE_URL}/icon_close.svg`}
            alt="X"
            onClick={onClose}
            className="cursor-pointer"
            width={24}
            height={24}
          />
        </div>
        <div className="cursor-pointer">{children}</div>
      </div>
    </div>
  );
}
