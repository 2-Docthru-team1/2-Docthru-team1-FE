import Image from 'next/image';
import check from '@/../public/assets/icon_confirm_modal_check.png';
import type { ConfirmModalProps } from '@/interfaces/modalInterface';

export default function ConfirmModal({ onCancel, onDelete, role, abortReason, setAbortReason }: ConfirmModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-30">
      <div className="flex fixed max-w-[29.8rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full rounded-[1.2rem] p-[2.4rem] bg-primary-white gap-[1.5rem]">
        <div className="flex-col justify-center items-center mb-[1.5rem]">
          <div className="flex justify-center mb-[1.5rem]">
            <Image src={check} alt="체크 이미지" width={24} height={24} />
          </div>
          <p className="text-[1.6rem] font-medium text-gray-700">Are you sure you want to cancel?</p>
        </div>
        {role === 'admin' && abortReason !== undefined && setAbortReason && (
          <div className="w-full mb-[1.5rem]">
            <textarea
              className="w-full text-[1.3rem] h-[16rem] p-[1rem] border rounded-[0.8rem] text-gray-700 focus:outline-none border-gray-300 resize-none"
              placeholder="Enter reason for aborting..."
              value={abortReason}
              onChange={e => setAbortReason(e.target.value)}
            />
          </div>
        )}
        <div className="flex gap-[0.8rem]">
          <button
            onClick={onCancel}
            className="text-[1.6rem] leading-[1rem] w-[9rem] h-[4rem] py-[1.2rem] px-[2.3rem] rounded-[0.8rem] font-semibold border border-gray-200 text-gray-700 bg-primary-white"
          >
            No
          </button>
          <button
            onClick={onDelete}
            className="text-[1.6rem] leading-[1rem] w-[9rem] h-[4rem] py-[1.2rem] px-[2.3rem] rounded-[0.8rem] font-semibold border border-gray-200 text-primary-white bg-primary-blue"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
