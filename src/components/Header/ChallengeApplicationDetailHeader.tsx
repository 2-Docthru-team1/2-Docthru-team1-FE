'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import clock from '@/../public/assets/icon_deadline_clock_large.png';
import toggle from '@/../public/assets/icon_kebab_toggle.png';
import profile from '@/../public/assets/img_profile_member.png';
import type { ChallengeApplicationDetailHeader } from '@/interfaces/challengeInterface';
import ChipCategory from '../Chip/ChipCategory';

export default function ChallengeApplicationDetailHeader({ data }: ChallengeApplicationDetailHeader) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yyyy-MM-dd');
  };

  const renderImage = (imageUrl: string) => {
    if (!imageUrl || imageUrl.trim() === '') {
      return null;
    }
    return <Image src={imageUrl} alt="picture" width={343} height={294} />;
  };

  return (
    <div className="w-[120rem] items-center justify-center flex flex-col">
      <div className="flex flex-col w-full gap-[1.6rem]">
        <div className="flex justify-between w-full">
          <p className="font-semibold text-[2.4rem] leading-[2.864rem]">{data.title}</p>
          <Image src={toggle} alt="toggle" />
        </div>
        <div>
          <ChipCategory mediaType={data.mediaType} />
        </div>
      </div>
      <div className="flex flex-col mt-[2.4rem] gap-[2.4rem] w-full">
        <p className="font-normal text-[1.6rem] leading-[2.08rem] text-gray-700">{data.description}</p>
        <div className="flex w-[30rem] justify-between items-center">
          <div className="flex gap-[0.8rem] items-center">
            <Image src={profile} alt="profile" />
            <p className="font-medium text-[1.2rem] leading-[1.432rem] text-gray-800">{data.requestUser.name}</p>
          </div>
          <div className="flex gap-[0.44rem] items-center">
            <Image src={clock} alt="clock" />
            <p className="font-normal text-[1.3rem] leading-[1.551rem] text-gray-600">Closing on {formatDate(data.deadline)}</p>
          </div>
        </div>
        <div className="flex gap-[2.4rem]">
          {renderImage(data.imageUrl)}
          {renderImage(data.imageUrl2)}
        </div>
      </div>
    </div>
  );
}
