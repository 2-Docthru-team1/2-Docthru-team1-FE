import Image from 'next/image';
import crownIcon from '@/../public/assets/icon_crown.png';
import clockIcon from '@/../public/assets/icon_deadline_clock_large.png';
import kebabToggle from '@/../public/assets/icon_kebab_toggle.png';
import ChipCard from '@/components/Chip/ChipCard';
import ChipCategoryCard from '@/components/Chip/ChipCategory';
import type { MonthlyChallengeCardProps } from '@/interfaces/cardInterface';

export default function MonthlyChallengeCard({ data }: MonthlyChallengeCardProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const { title, mediaType, status, deadline } = data;
  const formattedClosingDate = new Date(deadline).toISOString().split('T')[0];

  // {user.id === data.ownerId && <div>드롭다운</div>}
  return (
    <div className="w-[38.4rem] gap-[1rem] rounded-[1.2rem] border-[0.2rem] border-solid border-primary-beige">
      <div className="">
        {/* <div className="absolute top-[1rem] right-[1rem] z-10">
          <Image src={kebabToggle} alt="More Options" />
        </div> */}

        <div className="p-[2.4rem]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[1.2rem]">
              <Image src={crownIcon} alt="Recommended" />
              <div>
                <ChipCard type={status} />
              </div>
            </div>
            <Image src={kebabToggle} alt="More Options" />
          </div>

          <h2 className="text-[2rem] mt-[1.2rem] mb-[1.4rem] font-semibold text-left text-gray-700">{title}</h2>

          <div>
            <ChipCategoryCard mediaType={mediaType} />
          </div>

          <div className="w-[29.5rem] border-b border-gray-200 mt-[2rem] mb-[1.2rem]" />

          <div className="flex items-center gap-[0.2rem]">
            <Image src={clockIcon} alt="Deadline" />
            <div className="text-[1.3rem] text-gray-500">Closing on {formattedClosingDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
