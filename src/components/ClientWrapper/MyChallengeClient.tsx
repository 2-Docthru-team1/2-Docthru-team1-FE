'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchMyChallenge, fetchMyRequestChallenge } from '@/api/challengeService';
import type { MyRequestData } from '@/interfaces/challengeInterface';
import ChallengeApplicationBody from '../Body/ChallengeApplicationBody';
import MyChallengeHeader from '../Header/MyChallengeHeader';
import Pagination from '../Pagination/Pagination';

export default function MyChallengeClient() {
  const [activeTab, setActiveTab] = useState('participating');
  const [finishedData, setFinishedData] = useState();
  const [participateData, setParticipateData] = useState();
  const [requestData, setRequestData] = useState<MyRequestData>();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getMyChallenge = async () => {
      const response = await fetchMyChallenge('onGoing');
      setParticipateData(response);
    };

    getMyChallenge();
  }, []);

  useEffect(() => {
    const getMyFinishedChallenge = async () => {
      const response = await fetchMyChallenge('finished');
      setFinishedData(response);
    };

    getMyFinishedChallenge();
  }, []);

  useEffect(() => {
    const getMyRequestChallenge = async () => {
      const response = await fetchMyRequestChallenge();
      console.log(response);
      setRequestData(response);
    };

    getMyRequestChallenge();
  }, []);

  useEffect(() => {
    const fetchChallenges = async () => {
      console.log(activeTab);
      if (activeTab === 'participating') {
        const response = await fetchMyChallenge('onGoing');
        setParticipateData(response);
      } else if (activeTab === 'finished') {
        const response = await fetchMyChallenge('finished');
        setFinishedData(response);
      } else if (activeTab === 'applied') {
        const response = await fetchMyRequestChallenge();
        setRequestData(response);
      }
    };

    fetchChallenges();
  }, [activeTab]);

  if (!requestData) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Image src={loading} alt="loading" />
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(requestData?.totalCount / itemsPerPage));

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const currentData = activeTab === 'participating' ? participateData : activeTab === 'applied' ? requestData : null;

  if (!currentData || !participateData || !finishedData) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Image src={loading} alt="loading" />
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <MyChallengeHeader activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'applied' && (
        <>
          <div className="my-[2.4rem]">
            <ChallengeApplicationBody type="normal" data={requestData.list} />
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            hasNext={currentPage < totalPages}
            type="default"
          />
        </>
      )}
    </div>
  );
}
