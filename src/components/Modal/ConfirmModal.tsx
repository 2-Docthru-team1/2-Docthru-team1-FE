import Image from 'next/image';
import close from '@/../public/assets/icon_close.png';
import check from '@/../public/assets/icon_confirm_modal_check.png';
import type { ConfirmModalProps } from '@/interfaces/modalInterface';

export default function ConfirmModal({ onCancel, onDelete, role, abortReason, setAbortReason, onApprove }: ConfirmModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-30">
      {role === 'admin' && abortReason !== undefined && setAbortReason && (
        <>
          <div className="flex fixed max-w-[49.6rem] sm:w-[34.3rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full rounded-[1.2rem] p-[2.4rem] bg-primary-white">
            <div className="flex justify-between items-center mb-[2.4rem] w-full">
              <p className="text-[1.8rem] font-bold text-gray-700 leading-[1.8rem]">Reason for Decline</p>
              <Image src={close} alt="close" className="cursor-pointer" onClick={onCancel} />
            </div>
            <div className="w-full mb-[1.5rem] flex flex-col gap-[0.8rem]">
              <p className="font-normal text-[1.6rem] leading-[2.6rem]">Content</p>
              <textarea
                className="w-full h-[21.9rem] border rounded-[1rem] py-[1.6rem] px-[2rem] flex gap-[1rem] border border-gray-300 font-normal text-[1.6rem] leading-[2.6rem] focus:outline-none resize-none"
                placeholder="Please enter the reason for rejection"
                value={abortReason}
                onChange={e => setAbortReason(e.target.value)}
              />
            </div>
            <button
              className="w-full h-[4.8rem] bg-primary-blue text-primary-white rounded-[0.8rem] font-semibold text-[1.6rem] leading-[1.909rem]"
              onClick={onDelete}
            >
              Send
            </button>
          </div>
        </>
      )}
      {role === 'admin' && onApprove && (
        <div className="flex fixed max-w-[29.8rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full rounded-[1.2rem] p-[2.4rem] bg-primary-white gap-[1.5rem]">
          <div className="flex-col justify-center items-center mb-[1.5rem]">
            <div className="flex justify-center mb-[2rem]">
              <Image src={check} alt="체크 이미지" width={24} height={24} />
            </div>
            <p className="text-[1.6rem] font-medium text-gray-700 text-center">Are you sure you want to approve?</p>
          </div>
          <div className="flex gap-[0.8rem] justify-between w-full">
            <button
              onClick={onCancel}
              className="text-[1.6rem] leading-[1rem] w-[11.5rem] h-[4rem] py-[1.2rem] px-[2.3rem] rounded-[0.8rem] font-semibold border border-gray-200 text-gray-700 bg-primary-white"
            >
              No
            </button>
            <button
              onClick={onApprove}
              className="text-[1.6rem] leading-[1rem] w-[11.5rem] h-[4rem] py-[1.2rem] px-[2.3rem] rounded-[0.8rem] font-semibold border border-gray-200 text-primary-white bg-primary-blue"
            >
              Yes
            </button>
          </div>
        </div>
      )}
      {role !== 'admin' && (
        <div className="flex fixed max-w-[29.8rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full rounded-[1.2rem] p-[2.4rem] bg-primary-white gap-[1.5rem]">
          <div className="flex-col justify-center items-center mb-[1.5rem]">
            <div className="flex justify-center mb-[1.5rem]">
              <Image src={check} alt="체크 이미지" width={24} height={24} />
            </div>
            <p className="text-[1.6rem] font-medium text-gray-700">Are you sure you want to cancel?</p>
          </div>
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
      )}
    </div>
  );
}
