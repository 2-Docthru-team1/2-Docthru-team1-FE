import Image from 'next/image';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import inactiveHeart from '@/../public/assets/icon_heart_inact_small.png';
import food from '@/../public/temporaryAssets/Food.svg';
import type { RecipeCardProps } from '@/interfaces/cardInterface';

// TODO: 백엔드쪽에서 데이터 넘어오면 추후 목데이터 수정 예정입니다.

export default function RecipeCard({ data }: RecipeCardProps) {
  if (!data) {
    return (
      <div>
        <Image src={loading} alt="loading" />
      </div>
    );
  }

  return (
    <div className="w-[27.8rem] h-[35rem] flex flex-col border border-gray-100 bg-primary-white">
      <div className="relative w-full h-[16.7rem]">
        <Image src={food} alt="음식 이미지" layout="fill" objectFit="cover" />
        {/* {data.images[0] ? <Image src={data.images[0]} alt="음식 이미지" layout="fill" objectFit="cover" /> : null} */}
      </div>
      <div className="flex flex-col px-[1.5rem] py-[1.3rem] gap-[0.6rem]">
        <p className="font-medium text-[1.4rem] leading-[2.6rem] text-gray-600">{data.category}</p>
        <p className="font-bold text-[2rem] leading-[2.6rem] text-gray-700">{data.title}</p>
        <div className="flex gap-[0.4rem] items-center">
          <Image src={inactiveHeart} alt="하트" />
          <p className="font-medium text-[1.2rem] leading-[1.8rem] text-gray-700">{data.likeCount}</p>
        </div>
      </div>
    </div>
  );
}
