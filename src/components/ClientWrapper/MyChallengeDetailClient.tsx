'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchChallenge_detail } from '@/api/challengeService';
import ChallengeApplicationDetailBody from '@/components/Body/ChallengeApplicationDetailBody';
import ChallengeApplicationDetailHeader from '@/components/Header/ChallengeApplicationDetailHeader';
import type { ChallengeApplicationDetailHeaderData } from '@/interfaces/challengeInterface';

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export default function MyChallengeDetailClient() {
  const { id } = useParams();
  const router = useRouter();

  const [currentData, setCurrentData] = useState<ChallengeApplicationDetailHeaderData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/');
    }
  }, []);

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
      <div className="flex w-full justify-center items-center min-h-screen">
        <Image src={`${S3_BASE_URL}/loading.svg`} alt="loading" width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="w-full md: p-[2rem] justify-center items-center flex pt-[2.4rem] pb-[7rem] flex-col">
      <div className="w-full">
        <ChallengeApplicationDetailHeader type="normal" data={currentData} />
      </div>
      <div className="border border-gray-200 lg:w-[120rem] sm:w-full mt-[4rem] mb-[4rem]" />
      <div className="lg:w-[120rem] sm:w-full">
        <ChallengeApplicationDetailBody type="normal" data={currentData} />
      </div>
    </div>
  );
}
