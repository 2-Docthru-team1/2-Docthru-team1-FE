import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import { fetchUpdateStatus } from '@/api/challengeService';
import ChipCard from '@/components/Chip/ChipCard';
import ChipCategoryCard from '@/components/Chip/ChipCategory';
import type { ChallengeCardProps } from '@/interfaces/cardInterface';
import CancelDropdown from '../Dropdown/CancelDropdown';
import ConfirmModal from '../Modal/ConfirmModal';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function ChallengeCard({ type, data, userId, role }: ChallengeCardProps) {
  if (!data) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
      </div>
    );
  }

  const { id, title, deadline, status, mediaType, requestUser } = data;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yyyy-MM-dd');
  };

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
      const newStatus = role === 'admin' ? 'aborted' : 'canceled';
      const reason = role === 'admin' ? abortReason : '';
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
      className="bg-primary-white lg:w-[58.8rem] gap-[1rem] rounded-[0.8rem] border-[0.2rem] border-solid border-gray-200"
      onClick={handleCardClick}
    >
      <div>
        <div className="p-[2.4rem]">
          <div className="flex justify-between items-center">
            <div>
              <ChipCard type={status} />
            </div>
            {role === 'admin' || userId === requestUser.id ? (
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
                  {dropdownOpen && (
                    <CancelDropdown onCancel={handleCancelClick}>{role === 'admin' ? 'Abort' : 'Cancel'}</CancelDropdown>
                  )}
                </div>
              </div>
            ) : null}
          </div>
          <h2 className="text-[2rem] leading-[2.39rem] mt-[1.2rem] mb-[1.4rem] font-semibold text-left text-gray-700">{title}</h2>
          <div>
            <ChipCategoryCard mediaType={mediaType} />
          </div>
          <div className="lg:w-[54rem] border-b border-gray-200 mt-[2rem] mb-[1.2rem]" />
          <div className="flex justify-between">
            <div className="flex items-center gap-[0.2rem]">
              <Image src={`${S3_BASE_URL}/icon_deadline_clock.svg`} alt="Deadline" width={24} height={24} />
              <div className="text-[1.3rem] text-gray-500">Closing on {formatDate(deadline)}</div>
            </div>
            {type === 'finish' && (
              <div className="cursor-pointer flex items-center gap-[0.6rem] justify-center rounded-[3.05rem] border border-gray-400 w-[14.3rem] h-[3.3rem]">
                <p className="font-bold text-[1.4rem] leading-[1.671rem] color-gray-700">View my work</p>
                <Image src={`${S3_BASE_URL}/icon_document.svg`} alt="view my work" width={24} height={24} />
              </div>
            )}
            {type === 'ongoing' && (
              <div className="cursor-pointer flex items-center gap-[0.6rem] justify-center rounded-[3.05rem] border border-gray-400 w-[14.3rem] h-[3.3rem]">
                <p className="font-bold text-[1.4rem] leading-[1.671rem] color-gray-700">Keep going</p>
                <Image src={`${S3_BASE_URL}/icon_keep_going_arrow.svg`} alt="keep going" width={24} height={24} />
              </div>
            )}
          </div>
        </div>
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
    </div>
  );
}
