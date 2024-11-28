import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

export default function MonthlyChallengeCard({ data, role }: MonthlyChallengeCardProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const router = useRouter();

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
      router.refresh();
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
      className="w-[38.4rem] gap-[1rem] rounded-[1.2rem] border-[0.2rem] border-solid border-primary-beige bg-primary-white"
      onClick={handleCardClick}
    >
      <div>
        <div className="p-[2.4rem]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[1.2rem]">
              <Image src={crownIcon} alt="Recommended" />
              <div>
                <ChipCard type={status} />
              </div>
            </div>
            {role === 'admin' ? (
              <div className="relative">
                <Image src={kebabToggle} alt="More Options" onClick={handledropdownClick} className="cursor-pointer" />
                <div className="absolute right-[1rem] top-[2.5rem]">
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
            <Image src={clockIcon} alt="Deadline" />
            <div className="text-[1.3rem] text-gray-500">Closing on {formattedDeadline}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
