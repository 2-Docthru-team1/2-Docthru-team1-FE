'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchChallengeAbortReason, fetchChallenge_detail } from '@/api/challengeService';
import type { ChallengeApplicationDetailHeaderData } from '@/interfaces/challengeInterface';
import ChallengeApplicationDetailBody from '../Body/ChallengeApplicationDetailBody';
import ChallengeApplicationDetailHeader from '../Header/ChallengeApplicationDetailHeader';
import Pagination from '../Pagination/Pagination';

export default function AdminChallengeDetailClient() {
  const { id } = useParams();

  const [currentData, setCurrentData] = useState<ChallengeApplicationDetailHeaderData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 1;
  const totalPages =
    currentData && typeof currentData.number === 'number' ? Math.max(1, Math.ceil(currentData.number / itemsPerPage)) : 1;

  console.log(totalPages, 'total page');
  console.log(currentPage, 'current page');

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getChallengeDetailData = async () => {
      const response = await fetchChallenge_detail(String(id));
      setCurrentData(response);
    };

    getChallengeDetailData();
  }, [currentPage, id]);

  useEffect(() => {
    if (currentData) {
      setCurrentPage(Number(currentData.number));
    }
  }, [currentData]);

  console.log(currentData);

  if (!currentData) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Image src={loading} alt="로딩" />
      </div>
    );
  }

  return (
    <div className="w-full justify-center items-center flex pt-[2.4rem] pb-[7rem] flex-col">
      <div className="flex justify-between w-[120rem] items-center">
        <p className="font-normal text-[1.6rem]">No. {currentData.number}</p>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
          type="admin"
        />
      </div>
      <div>
        <ChallengeApplicationDetailHeader data={currentData} />
      </div>
      <div className="border border-gray-200 w-[120rem] mt-[4rem] mb-[4rem]" />
      <div className="w-[120rem]">
        <ChallengeApplicationDetailBody data={currentData} />
      </div>
    </div>
  );
}
