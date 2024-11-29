'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchChallenge_detail } from '@/api/challengeService';
import type { ChallengeApplicationDetailHeaderData } from '@/interfaces/challengeInterface';
import Pagination from '../Pagination/Pagination';

export default function AdminChallengeDetailClient() {
  const { id } = useParams();

  const [currentData, setCurrentData] = useState<ChallengeApplicationDetailHeaderData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 1;
  const totalPages =
    currentData && typeof currentData.number === 'number' ? Math.max(1, Math.ceil(currentData.number / itemsPerPage)) : 1;

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
    <div>
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
    </div>
  );
}
