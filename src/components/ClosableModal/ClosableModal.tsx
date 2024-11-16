import Image from 'next/image';
import close from '@/../public/assets/icon_close.png';
import type { ClosableModalProps } from '@/interfaces/modalInterface';

export default function ClosableModal({ isOpen, onClose, title, children }: ClosableModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#000000] bg-opacity-50">
      <div className="rounded-[0.8rem] border-2 border-gray-200 py-[2.4rem] px-[2.4rem] bg-[#ffffff]">
        <div className="flex justify-between items-center w-[44.8rem]">
          <p className="font-bold text-[1.8rem] leading-[2.6rem] text-gray-700">{title}</p>
          <Image src={close} alt="X" onClick={onClose} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
