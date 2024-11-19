import Image from 'next/image';
import crownIcon from '@/../public/assets/icon_crown_small.png';
import ChipCard from '@/components/Chip/ChipCard';
import ChipType from '@/components/Chip/ChipType';
import type { MonthlyChallengeCardProps } from '@/interfaces/cardInterface';

// 인터페이스 가져오기

export default function MonthlyChallengeCard({ data }: MonthlyChallengeCardProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const { id, title, category, mediaType, status, closingDate } = data;

  // 마감 날짜 형식
  const formattedClosingDate = new Date(closingDate).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div key={id} className="border rounded-lg shadow-md p-4 bg-white">
      {/* 왕관 아이콘과 추천 레이블 */}
      <div className="flex items-center mb-2">
        <Image src={crownIcon} alt="Recommended" width={20} height={20} />
        <span className="ml-2 text-yellow-500 font-bold">Recommended by Admin</span>
      </div>

      {/* 상태 표시 */}
      <div className="mb-4">
        <ChipCard type={status} />
      </div>

      {/* 챌린지 타이틀 */}
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

      {/* 카테고리 및 미디어 유형 */}
      <div className="mt-2">
        <ChipType category={category} />
        <p className="text-sm text-gray-500 mt-1">{mediaType}</p>
      </div>

      {/* 마감일 */}
      <div className="mt-6 text-sm text-gray-500">Closing on {formattedClosingDate}</div>
    </div>
  );
}
