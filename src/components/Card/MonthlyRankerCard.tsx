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
    <div className="flex flex-row gap-[0.45rem]">
      {data.map((ranker, index) => (
        <div
          key={ranker.id}
          className="w-[39.7rem] gap-[1rem] border-[0.3rem] rounded-[1.2rem] border-solid border-primary-beige bg-primary-white"
        >
          <div className="font-medium m-[2.4rem] flex justify-between">
            <div>
              <div className="flex gap-[1.3rem]">
                <Image src={rankImages[index]} alt={`${index + 1}위 아이콘`} />
                <div className="flex gap-[1.6rem]">
                  <Image
                    src={ranker.profileImage || profile_member}
                    alt={`${ranker.name}의 프로필`}
                    width={50} // 이미지 너비
                    height={50}
                  />
                  <div className="flex flex-col">
                    <span className="text-[2rem] text-gray-800">{ranker.name}</span>
                    <span className="text-[1.4rem] text-gray-500">{ranker.role}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[1.4rem] text-gray-700">Total Likes</div>
              <div className="text-[2rem] text-gray-800">
                {ranker.totalLikes.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
