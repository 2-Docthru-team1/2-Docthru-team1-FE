'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import clock from '@/../public/assets/icon_deadline_clock_large.png';
import toggle from '@/../public/assets/icon_kebab_toggle.png';
import profile from '@/../public/assets/img_profile_member.png';
import { fetchChallenge_detail } from '@/api/challengeService';
import type { ChallengeApplicationDetailHeader, ChallengeApplicationDetailHeaderData } from '@/interfaces/challengeInterface';
import ChipCategory from '../Chip/ChipCategory';
import Pagination from '../Pagination/Pagination';

export default function ChallengeApplicationDetailHeader({ data, totalCount }: ChallengeApplicationDetailHeader) {
  const [currentData, setCurrentData] = useState<ChallengeApplicationDetailHeaderData>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yyyy-MM-dd');
  };

  useEffect(() => {
    const getChallengeDetailData = async () => {
      const response = await fetchChallenge_detail(data.id);
      setCurrentData(response);
    };

    getChallengeDetailData();
  }, [currentPage]);

  if (!currentData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-[120rem] items-center justify-center flex flex-col">
      <div className="flex justify-between w-full items-center">
        <p className="font-normal text-[1.6rem]">No. {currentData.number}</p>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
          type="admin"
        />
      </div>
      <div className="flex flex-col w-full gap-[1.6rem]">
        <div className="flex justify-between w-full">
          <p className="font-semibold text-[2.4rem] leading-[2.864rem]">{data.title}</p>
          <Image src={toggle} alt="toggle" />
        </div>
        <div>
          <ChipCategory mediaType={data.mediaType} />
        </div>
      </div>
      <div className="flex flex-col gap-[2.4rem]">
        <p className="font-normal text-[1.6rem] leading-[2.08rem] text-gray-700">{currentData.description}</p>
        <div className="flex w-[13.1rem] justify-between items-center">
          <div className="flex gap-[0.8rem]">
            <Image src={profile} alt="profile" />
            <p className="font-medium text-[1.2rem] leading-[1.432rem] text-gray-800">{currentData.requestUser.name}</p>
          </div>
          <div className="flex gap-[4rem] items-center">
            <Image src={clock} alt="clock" />
            <p className="font-normal text-[1.3rem] leading-[1.551rem] text-gray-600">
              Closing on {formatDate(currentData.deadline)}
            </p>
          </div>
        </div>
        <div className="flex gap-[2.4rem]">
          <Image src={currentData.imageUrl} alt="picture" width={343} height={294} />
          <Image src={currentData.imageUrl2} alt="picture" width={343} height={294} />
        </div>
      </div>
    </div>
  );
}
