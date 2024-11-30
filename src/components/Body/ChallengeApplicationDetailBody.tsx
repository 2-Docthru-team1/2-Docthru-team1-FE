'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import arrow from '@/../public/assets/icon_click.png';
import { fetchChallengeStatusChange } from '@/api/challengeService';
import type { ChallengeApplicationDetailBody } from '@/interfaces/challengeInterface';
import useStore from '@/store/store';
import ConfirmModal from '../Modal/ConfirmModal';

export default function ChallengeApplicationDetailBody({ data }: ChallengeApplicationDetailBody) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [abortReason, setAbortReason] = useState('');
  const { userStatus } = useStore();

  const patchChallengeStatusChange = async (status: string, declineReason?: string) => {
    const response = await fetchChallengeStatusChange(String(data.id), status, declineReason);
    console.log(response);
    if (response) {
      window.location.reload();
    } else {
      console.error('Status update failed:', response);
    }
  };

  const handleDeclineClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDecline = () => {
    setIsConfirmModalOpen(false);
    patchChallengeStatusChange('denied', abortReason);
    setAbortReason('');
  };

  const handleApprove = () => {
    patchChallengeStatusChange('onGoing');
    setIsApproveModalOpen(false);
  };

  const handleApproveClick = () => {
    setIsApproveModalOpen(true);
  };

  const handleApproveCancel = () => {
    setIsApproveModalOpen(false);
  };

  return (
    <div className="w-[120rem]">
      <p className="font-semibold text-[1.8rem] leading-[2.148rem] text-gray-800">Recipe Link / Attached Article</p>
      <div className="relative mt-[4rem] w-[89rem] h-[42.4rem]">
        <iframe src={data.embedUrl} title="Embedded Content" width="100%" height="100%" />
        <div className="absolute top-[2%] right-[1%] bg-primary-white opacity-50 z-2 rounded-[1rem] px-2 py-1">
          <Link
            href={data.embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-[0.4rem] items-center justify-center font-bold text-[1.4rem] leading-[2.6rem] text-gray-700"
          >
            Open Link
            <Image src={arrow} alt="arrow" />
          </Link>
        </div>
      </div>
      <div className="border border-gray-200 w-full mt-[2.4rem] mb-[4rem]" />
      <div className="flex gap-[1.2rem] h-[4.8rem] justify-end">
        {data.status === 'pending' && (
          <button
            onClick={handleDeclineClick}
            className="w-[15.3rem] bg-[#FFE7E7] text-[#F24744] rounded-[1.2rem] font-semibold text-[1.6rem] leading-[2.6rem] flex items-center justify-center"
          >
            Decline
          </button>
        )}
        {(data.status === 'pending' || data.status === 'denied' || data.status === 'aborted') && (
          <button
            className="w-[15.3rem] bg-primary-blue text-primary-white rounded-[1.2rem] font-semibold text-[1.6rem] leading-[2.6rem] flex items-center justify-center"
            onClick={handleApproveClick}
          >
            Approve
          </button>
        )}
      </div>
      {isConfirmModalOpen && (
        <ConfirmModal
          onCancel={handleCancel}
          onDelete={handleDecline}
          role={userStatus}
          abortReason={abortReason}
          setAbortReason={setAbortReason}
        />
      )}
      {isApproveModalOpen && <ConfirmModal onCancel={handleApproveCancel} role={userStatus} onApprove={handleApprove} />}
    </div>
  );
}
