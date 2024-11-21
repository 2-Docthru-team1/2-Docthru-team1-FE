import Image from 'next/image';
import clockIcon from '@/../public/assets/icon_deadline_clock_large.png';
import kebabToggle from '@/../public/assets/icon_kebab_toggle.png';
import ChipCard from '@/components/Chip/ChipCard';
import ChipCategoryCard from '@/components/Chip/ChipCategory';
import type { ChallengeCardProps } from '@/interfaces/cardInterface';

export default function ChallengeCard({ data, userId, role }: ChallengeCardProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const { id, title, deadline, status, mediaType, requestUserId } = data;
  const formattedDeadline = new Date(deadline).toISOString().split('T')[0];

  const handleStatusChange = (id: string, newStatus: 'ongoing' | 'canceled') => {
    console.log(`Challenge ${id} status updated to ${newStatus}`);
  };

  if (status === 'canceled') {
    return null; // 카드 컴포넌트를 렌더링하지 않음
  }

  // NOTE 도엽님이 완성하면 kebabToggle 이미지로만 넣어놓은 부분 Component로 바꿀 예정.
  // NOTE 본인이나 어드민만 보이게 설정 - {role === 'admin' || userId === requestUserId ? (<CancelToggle />) : null}
  // NOTE challengeId={id} currentStatus={status} onStatusChange={handleStatusChange}
  return (
    <div className="bg-primary-white w-[58.8rem] gap-[1rem] rounded-[0.8rem] border-[0.2rem] border-solid border-gray-200">
      <div>
        <div className="p-[2.4rem]">
          <div className="flex justify-between items-center">
            <div>
              <ChipCard type={status} />
            </div>
            <Image src={kebabToggle} alt="More Options" />
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
