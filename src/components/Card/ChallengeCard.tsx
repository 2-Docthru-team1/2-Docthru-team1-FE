import Image from 'next/image';
import { useState } from 'react';
import clockIcon from '@/../public/assets/icon_deadline_clock_large.png';
import kebabToggle from '@/../public/assets/icon_kebab_toggle.png';
import { fetchUpdateStatus } from '@/api/challengeService';
import ChipCard from '@/components/Chip/ChipCard';
import ChipCategoryCard from '@/components/Chip/ChipCategory';
import type { ChallengeCardProps } from '@/interfaces/cardInterface';
import CancelDropdown from '../Dropdown/CancelDropdown';

export default function ChallengeCard({ data, userId, role }: ChallengeCardProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const { id, title, deadline, status, mediaType, requestUser } = data;

  console.log(data);
  const formattedDeadline = new Date(deadline).toISOString().split('T')[0];

  const handleStatusChange = (id: string, newStatus: 'onGoing' | 'canceled') => {
    console.log(`Challenge ${id} status updated to ${newStatus}`);
  };

  if (status === 'canceled') {
    return null;
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handledropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen(prev => !prev);
  };

  const handleCancelClick = async () => {
    setDropdownOpen(false);

    try {
      await fetchUpdateStatus(id, 'canceled');
    } catch (error) {
      console.error('Failed to update challenge status:', error);
    }
  };

  // NOTE API 연결해서 챌린지 상태 수정하기 abort
  return (
    <div className="bg-primary-white w-[58.8rem] gap-[1rem] rounded-[0.8rem] border-[0.2rem] border-solid border-gray-200">
      <div>
        <div className="p-[2.4rem]">
          <div className="flex justify-between items-center">
            <div>
              <ChipCard type={status} />
            </div>
            {role === 'admin' || userId === requestUser.id ? (
              <div className="relative">
                <Image src={kebabToggle} alt="More Options" onClick={handledropdownClick} className="cursor-pointer" />
                <div className="absolute right-[1rem] top-[2.5rem]">
                  {dropdownOpen && <CancelDropdown onCancel={handleCancelClick}>Cancel</CancelDropdown>}
                </div>
              </div>
            ) : null}
          </div>
          <h2 className="text-[2rem] leading-[2.39rem] mt-[1.2rem] mb-[1.4rem] font-semibold text-left text-gray-700">{title}</h2>
          <div>
            <ChipCategoryCard mediaType={mediaType} />
          </div>
          <div className="w-[54rem] border-b border-gray-200 mt-[2rem] mb-[1.2rem]" />
          <div className="flex items-center gap-[0.2rem]">
            <Image src={clockIcon} alt="Deadline" />
            <div className="text-[1.3rem] text-gray-500">Closing on {formattedDeadline}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
