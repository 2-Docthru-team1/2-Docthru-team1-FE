import Image from 'next/image';
import check from '@/../public/assets/icon_confirm_modal_check.png';
import type { ConfirmModalProps } from '@/interfaces/modalInterface';

export default function ConfirmModal({ onCancel, onDelete }: ConfirmModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-10">
      <div className="flex fixed max-w-[29.8rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full rounded-[1.2rem] p-[2.4rem] bg-primary-white gap-[1.5rem] z-11">
        <div className="flex-col justify-center items-center">
          <div className="flex justify-center mb-[1rem]">
            <Image src={check} alt="체크 이미지" width={24} height={24} />
          </div>
          <p className="text-[1.6rem] font-medium">정말로 취소하시겠어요?</p>
        </div>
        <div className="flex gap-[0.8rem]">
          <button
            onClick={onCancel}
            className="text-[1.4rem] w-[8.8rem] h-[4.8rem] py-[1.2rem] px-[2.3rem] rounded-[0.8rem] font-semibold border border-primary-blue text-primary-blue bg-primary-white"
          >
            취소
          </button>
          <button
            onClick={onDelete}
            className="text-[1.4rem] w-[8.8rem] h-[4.8rem] py-[1.2rem] px-[2.3rem] rounded-[0.8rem] font-semibold border border-primary-blue text-primary-blue bg-primary-white"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
