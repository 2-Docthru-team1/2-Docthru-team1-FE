import Image from 'next/image';
import profile_member from '@/../public/assets/img_profile_member.png';
import rank1 from '@/../public/assets/img_ranking_1st.png';
import rank2 from '@/../public/assets/img_ranking_2nd.png';
import rank3 from '@/../public/assets/img_ranking_3rd.png';
import type { MonthlyRankerCardProps } from '@/interfaces/cardInterface';

export default function MonthlyRankerCard({ data }: MonthlyRankerCardProps) {
  if (!data || data.length === 0) {
    return <div>로딩 중...</div>;
  }

  const rankImages = [rank1, rank2, rank3];

  return (
    <div className="flex lg:flex-row sm:flex-col lg:gap-[0.45rem] md:gap-[2rem] sm:gap-[1.6rem]">
      {data.map((ranker, index) => (
        <div
          key={ranker.owner.id}
          className="lg:w-[39.7rem] md:w-[calc(100vw-2.6rem)] sm:w-[calc(100vw-1.8rem)] gap-[1rem] border-[0.3rem] rounded-[1.2rem] border-solid border-primary-beige bg-primary-white"
        >
          <div className="font-medium m-[2.4rem] flex justify-between">
            <div>
              <div className="flex gap-[1.3rem]">
                <Image src={rankImages[index]} alt={`${index + 1}위 아이콘`} />
                <div className="flex gap-[1.6rem]">
                  <Image
                    src={ranker.owner.profileImage || profile_member}
                    alt={`${ranker.owner.name}의 프로필`}
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col">
                    <span className="text-[2rem] text-gray-800">{ranker.owner.name}</span>
                    <span className="text-[1.4rem] text-gray-500">
                      {ranker.owner.role === 'normal' ? 'Koo-koo' : ranker.owner.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[1.4rem] text-gray-700">Total Likes</div>
              <div className="text-[2rem] text-gray-800">
                {ranker.likeCount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
