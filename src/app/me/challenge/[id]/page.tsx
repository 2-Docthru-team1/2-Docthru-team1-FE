'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchAdminChallengeDetailNext, fetchAdminChallengeDetailPrev, fetchChallenge_detail } from '@/api/challengeService';
import ChallengeApplicationDetailBody from '@/components/Body/ChallengeApplicationDetailBody';
import ChallengeApplicationDetailHeader from '@/components/Header/ChallengeApplicationDetailHeader';
import Pagination from '@/components/Pagination/Pagination';
import type { ChallengeApplicationDetailHeaderData } from '@/interfaces/challengeInterface';
import useStore from '@/store/store';

export default function AdminChallengeDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const { challengeMgmtTotalCount } = useStore();

  const [currentData, setCurrentData] = useState<ChallengeApplicationDetailHeaderData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/');
    }
  }, []);

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
    <div className="w-full justify-center items-center flex pt-[2.4rem] pb-[7rem] flex-col">
      <div>
        <ChallengeApplicationDetailHeader type="normal" data={currentData} />
      </div>
      <div className="border border-gray-200 w-[120rem] mt-[4rem] mb-[4rem]" />
      <div className="w-[120rem]">
        <ChallengeApplicationDetailBody type="normal" data={currentData} />
      </div>
    </div>
  );
}
