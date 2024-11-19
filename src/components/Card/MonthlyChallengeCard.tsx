import Image from 'next/image';
import crownIcon from '@/../public/assets/icon_crown.png';
import clockIcon from '@/../public/assets/icon_deadline_clock_large.png';
import kebabToggle from '@/../public/assets/icon_kebab_toggle.png';
import ChipCard from '@/components/Chip/ChipCard';
import ChipCategoryCard from '@/components/Chip/ChipCategory';
import ChipType from '@/components/Chip/ChipType';
import type { MonthlyChallengeCardProps } from '@/interfaces/cardInterface';

export default function MonthlyChallengeCard({ data }: MonthlyChallengeCardProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const { id, title, cuisineType, mediaType, status, closingDate } = data;
  const formattedClosingDate = new Date(closingDate).toISOString().split('T')[0];

  // NOTE css 나중에 다시 수정 예정.
  return (
    <div className="w-[38.4rem] h-[21.2rem] pt-[2.4rem] gap-[1rem] rounded-[1.2rem] border-[0.2rem] border-solid border-brand_yellow">
      <div className="absolute top-0 right-0">
        <Image src={kebabToggle} alt="More Options" />
      </div>

      <div className="p-[2.4rem]">
        <div className="flex items-center gap-[1.2rem]">
          <Image src={crownIcon} alt="Recommended" />
          <div>
            {/* className="" - 사용 예정 */}
            <ChipCard type={status} />
          </div>
        </div>

        <h2 className="text-[2rem] pt-[1.2rem] pb-[1.4rem] font-semibold leading-[2.39rem] text-left underline decoration-skip-ink-none text-gray-700">
          {title}
        </h2>

        <div>
          {/* className="" - 사용 예정 */}
          <ChipType category={cuisineType} />
          <ChipCategory category={mediaType} />
        </div>

        <div className="w-[295px] border-b border-gray-200 pt-[2rem] pb-[1.2rem]" />

        <div className="flex items-center gap-[1.2rem]">
          <Image src={clockIcon} alt="Deadline" />
          <div className="text-sm text-gray-500">Closing on {formattedClosingDate}</div>
        </div>
      </div>
    </div>
  );
}
