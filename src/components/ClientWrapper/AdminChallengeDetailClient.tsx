'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchAdminChallengeDetailNext, fetchAdminChallengeDetailPrev, fetchChallenge_detail } from '@/api/challengeService';
import type { ChallengeApplicationDetailHeaderData } from '@/interfaces/challengeInterface';
import useStore from '@/store/store';
import ChallengeApplicationDetailBody from '../Body/ChallengeApplicationDetailBody';
import ChallengeApplicationDetailHeader from '../Header/ChallengeApplicationDetailHeader';
import Pagination from '../Pagination/Pagination';

export default function AdminChallengeDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const { challengeMgmtTotalCount } = useStore();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    if (!accessToken || role !== 'admin') {
      router.push('/');
    }
  }, []);

  const [currentData, setCurrentData] = useState<ChallengeApplicationDetailHeaderData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 1;
  const totalPages =
    currentData && typeof currentData.number === 'number' ? Math.max(1, Math.ceil(challengeMgmtTotalCount / itemsPerPage)) : 1;

  const handlePageChange = async (page: number) => {
    if (page === currentPage) return;

    setCurrentPage(page);

    let response;

    if (page < currentPage) {
      response = await fetchAdminChallengeDetailPrev(String(id));
    } else if (page > currentPage) {
      response = await fetchAdminChallengeDetailNext(String(id));
    }

    if (response) {
      setCurrentData(response);
    }

    router.push(`/auth/challenge/${response.id}`);
  };

  useEffect(() => {
    const getChallengeDetailData = async () => {
      const response = await fetchChallenge_detail(String(id));
      setCurrentData(response);
      setCurrentPage(response.number);
    };

    getChallengeDetailData();
  }, [id]);

  useEffect(() => {
    if (currentData) {
      setCurrentPage(Number(currentData.number));
    }
  }, [currentData]);

  if (!currentData) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Image src={loading} alt="로딩" />
      </div>
    );
  }

  return (
    <div className="w-full justify-center items-center flex md:px-[2.4rem] sm:px-[1.6rem] pt-[2.4rem] pb-[7rem] flex-col">
      <div className="flex justify-between lg:w-[115.2rem] sm:w-full items-center">
        <p className="font-normal text-[1.6rem]">No. {currentData.number}</p>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
          type="admin"
        />
      </div>
      <div className="lg:w-[115.2rem] sm:w-full">
        <ChallengeApplicationDetailHeader type="admin" data={currentData} />
      </div>
      <div className="border border-gray-200 lg:w-[115.2rem] sm:w-full mt-[4rem] mb-[4rem]" />
      <div className="lg:w-[115.2rem] sm:w-full">
        <ChallengeApplicationDetailBody type="admin" data={currentData} />
      </div>
    </div>
  );
}
