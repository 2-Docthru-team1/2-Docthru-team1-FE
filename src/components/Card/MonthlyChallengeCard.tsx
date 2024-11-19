import Image from 'next/image';
import crownIcon from '@/../public/assets/icon_crown.png';
import ChipCard from '@/components/Chip/ChipCard';
import ChipCategory from '@/components/Chip/ChipCategory';
import ChipType from '@/components/Chip/ChipType';
import type { MonthlyChallengeCardProps } from '@/interfaces/cardInterface';

export default function MonthlyChallengeCard({ data }: MonthlyChallengeCardProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const { id, title, cuisineType, mediaType, status, closingDate } = data;

  // 마감 날짜 형식
  const formattedClosingDate = new Date(closingDate).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="w-[38.4rem] h-[21.2rem] pt-[2.4rem] gap-[1rem] rounded-[1.2rem] border-[0.2rem] border-solid border-[#D5BDA6]">
      <div className="">
        {/* 왕관 아이콘과 상태표시 */}
        <div className="flex items-center gap-[1.2rem]">
          <div className="w-[1.7rem] h-[1.7rem]">
            <Image src={crownIcon} alt="Recommended" />
          </div>
          <div className="mb-4">
            <ChipCard type={status} />
          </div>
        </div>

        {/* 챌린지 타이틀 */}
        <h2 className="text-[2rem] font-semibold leading-[2.39rem] text-left underline decoration-skip-ink-none text-gray-700">
          {title}
        </h2>

        {/* 카테고리 및 미디어 유형 */}
        <div className="">
          <ChipType category={cuisineType} />
          <ChipCategory category={mediaType} />
        </div>

        {/* 1px, gray-200 가로 선 */}
        <div className="w-[295px] border-b border-gray-200" />

        {/* 마감일 */}
        <div className="text-sm text-gray-500">Closing on {formattedClosingDate}</div>
      </div>
    </div>
  );
}
