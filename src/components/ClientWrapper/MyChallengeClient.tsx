'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { fetchMyChallenge } from '@/api/challengeService';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchMyRequestChallenge } from '@/api/challengeService';
import type { MyRequestData } from '@/interfaces/challengeInterface';
import ChallengeApplicationBody from '../Body/ChallengeApplicationBody';
import MyChallengeHeader from '../Header/MyChallengeHeader';
import Pagination from '../Pagination/Pagination';

export default function MyChallengeClient() {
  const [participateData, setParticipateData] = useState();
  const [requestData, setRequestData] = useState<MyRequestData>();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // useEffect(() => {
  //   const getMyChallenge = async () => {
  //     const response = await fetchMyChallenge();
  //     console.log('res!!!');
  //     setParticipateData(response);
  //   };

  //   getMyChallenge();
  // }, []);

  // if (!participateData) {
  //   return (
  //     <div className="flex items-center justify-center h-[100vh]">
  //       <Image src={loading} alt="로딩" />
  //     </div>
  //   );
  // }

  useEffect(() => {
    const getMyRequestChallenge = async () => {
      const response = await fetchMyRequestChallenge();
      console.log(response);
      setRequestData(response);
    };

    getMyRequestChallenge();
  }, []);

  if (!requestData) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Image src={loading} alt="loading" />
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(requestData?.totalCount / itemsPerPage));

  return (
    <div className="flex flex-col justify-center items-center">
      <MyChallengeHeader />
      <div className="my-[2.4rem]">
        <ChallengeApplicationBody data={requestData.list} />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasNext={currentPage < totalPages}
        type="default"
      />
    </div>
  );
}
