import Image from 'next/image';
import type { MonthlyRankerCardProps } from '@/interfaces/cardInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function MonthlyRankerCard({ data }: MonthlyRankerCardProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row sm:flex-col lg:gap-[0.45rem] md:gap-[2rem] sm:gap-[1.6rem]">
      {data.map((ranker, index) => (
        <div
          key={ranker.id}
          className="lg:w-[39.7rem] md:w-[calc(100vw-2.6rem)] sm:w-[calc(100vw-1.8rem)] gap-[1rem] border-[0.3rem] rounded-[1.2rem] border-solid border-primary-beige bg-primary-white"
        >
          <div className="font-medium m-[2.4rem] flex justify-between">
            <div>
              <div className="flex gap-[1.3rem]">
                <Image src={`${S3_BASE_URL}/img_ranking_${index + 1}.svg`} alt={`${index + 1}위 아이콘`} width={50} height={50} />
                <div className="flex gap-[1.6rem]">
                  <Image
                    src={ranker.profileImage || `${S3_BASE_URL}/img_profile_member.svg`}
                    alt={`${ranker.name}의 프로필`}
                    width={50}
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
