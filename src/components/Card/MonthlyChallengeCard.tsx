import Image from 'next/image';
import { useState } from 'react';
import crownIcon from '@/../public/assets/icon_crown.png';
import clockIcon from '@/../public/assets/icon_deadline_clock_large.png';
import kebabToggle from '@/../public/assets/icon_kebab_toggle.png';
import { fetchUpdateStatus } from '@/api/challengeService';
import ChipCard from '@/components/Chip/ChipCard';
import ChipCategoryCard from '@/components/Chip/ChipCategory';
import type { MonthlyChallengeCardProps } from '@/interfaces/cardInterface';
import CancelDropdown from '../Dropdown/CancelDropdown';
import ConfirmModal from '../Modal/ConfirmModal';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function MonthlyChallengeCard({ data, role }: MonthlyChallengeCardProps) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
      </div>
    );
  }

  const { id, title, mediaType, status, deadline } = data;
  const formattedDeadline = new Date(deadline).toISOString().split('T')[0];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [abortReason, setAbortReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handledropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen(prev => !prev);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleDeleteWork = async () => {
    try {
      const newStatus = 'aborted';
      const reason = abortReason;
      await fetchUpdateStatus(id, newStatus, reason);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update challenge status:', error);
    }
  };

  const handleCardClick = (event: React.MouseEvent) => {
    if (isModalOpen) {
      event.stopPropagation();
      return;
    }
  };

  return (
    <div
      className="md:w-[38.4rem] sm:w-[34.3rem] gap-[1rem] rounded-[1.2rem] border-[0.2rem] border-solid border-primary-beige bg-primary-white"
      onClick={handleCardClick}
    >
      <div>
        <div className="p-[2.4rem]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[1.2rem]">
              <Image src={`${S3_BASE_URL}/icon_crown.svg`} alt="Recommended" width={17} height={17} />
              <div>
                <ChipCard type={status} />
              </div>
            </div>
            {role === 'admin' ? (
              <div className="relative z-10">
                <Image
                  src={`${S3_BASE_URL}/icon_kebab.svg`}
                  alt="More Options"
                  onClick={handledropdownClick}
                  className="cursor-pointer"
                  width={24}
                  height={24}
                />
                <div className="absolute right-[1rem] top-[2.5rem]" onClick={e => e.stopPropagation()}>
                  {dropdownOpen && <CancelDropdown onCancel={handleCancelClick}>Abort</CancelDropdown>}
                </div>
              </div>
            ) : null}
          </div>
          {isModalOpen && (
            <ConfirmModal
              onCancel={handleModalCancel}
              onDelete={handleDeleteWork}
              role={role}
              abortReason={abortReason}
              setAbortReason={setAbortReason}
            />
          )}
          <h2 className="text-[2rem] leading-[2.39rem] mt-[1.2rem] mb-[1.4rem] font-semibold text-left text-gray-700">{title}</h2>

          <div>
            <ChipCategoryCard mediaType={mediaType} />
          </div>

          <div className="w-[29.5rem] border-b border-gray-200 mt-[2rem] mb-[1.2rem]" />

          <div className="flex items-center gap-[0.2rem]">
            <Image src={`${S3_BASE_URL}/icon_deadline_clock.svg`} alt="Deadline" width={24} height={24} />
            <div className="text-[1.3rem] text-gray-500">Closing on {formattedDeadline}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
