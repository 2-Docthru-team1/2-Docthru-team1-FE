import Image from 'next/image';
import type { RecipeCardProps } from '@/interfaces/cardInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function RecipeCard({ data }: RecipeCardProps) {
  if (!data) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="w-[27.8rem] h-[30rem] flex flex-col border border-gray-100 bg-primary-white">
      <div className="relative w-full h-[16.7rem]">
        {data.images[0] ? <Image src={data.images[0]} alt="음식 이미지" layout="fill" objectFit="cover" /> : null}
      </div>
      <div className="flex flex-col px-[1.5rem] py-[1.3rem] gap-[0.6rem]">
        <p className="font-medium text-[1.4rem] leading-[2.6rem] text-gray-600">{data.category}</p>
        <p className="font-bold text-[2rem] leading-[2.6rem] text-gray-700">{data.title}</p>
        <div className="flex gap-[0.4rem] items-center">
          <Image src={`${S3_BASE_URL}/icon_heart_inactive_large.svg`} alt="하트" width={16} height={16} />
          <p className="font-medium text-[1.2rem] leading-[1.8rem] text-gray-700">{data.likeCount}</p>
        </div>
      </div>
    </div>
  );
}
