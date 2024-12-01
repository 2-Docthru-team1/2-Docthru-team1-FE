'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchMyFinishedChallenge, fetchMyOngoingChallenge, fetchMyRequestChallenge } from '@/api/challengeService';
import type { MyParticipateData, MyRequestData } from '@/interfaces/challengeInterface';
import ChallengeApplicationBody from '../Body/ChallengeApplicationBody';
import ChallengeCard from '../Card/ChallengeCard';
import MyChallengeHeader from '../Header/MyChallengeHeader';
import Pagination from '../Pagination/Pagination';

export default function MyChallengeClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('participating');
  const [finishedData, setFinishedData] = useState<MyParticipateData>();
  const [participateData, setParticipateData] = useState<MyParticipateData>();
  const [requestData, setRequestData] = useState<MyRequestData>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const width = window.innerWidth;

    if (activeTab === 'participating' || activeTab === 'finished') {
      if (width >= 1200) {
        setItemsPerPage(4);
      } else if (width >= 375) {
        setItemsPerPage(2);
      }
    } else if (activeTab === 'applied') {
      setItemsPerPage(10);
    }
  }, [activeTab]);

  useEffect(() => {
    const getMyChallenge = async () => {
      const response = await fetchMyOngoingChallenge();
      setParticipateData(response);
    };

    getMyChallenge();
  }, []);

  useEffect(() => {
    const getMyFinishedChallenge = async () => {
      const response = await fetchMyFinishedChallenge();
      setFinishedData(response);
    };

    getMyFinishedChallenge();
  }, []);

  useEffect(() => {
    const getMyRequestChallenge = async () => {
      const response = await fetchMyRequestChallenge();
      setRequestData(response);
    };

    getMyRequestChallenge();
  }, []);

  useEffect(() => {
    const fetchChallenges = async () => {
      if (activeTab === 'participating') {
        const response = await fetchMyOngoingChallenge();
        setParticipateData(response);
      } else if (activeTab === 'finished') {
        const response = await fetchMyFinishedChallenge();
        setFinishedData(response);
      } else if (activeTab === 'applied') {
        const response = await fetchMyRequestChallenge();
        setRequestData(response);
      }
    };

    fetchChallenges();
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const currentData = activeTab === 'participating' ? participateData : activeTab === 'applied' ? requestData : null;

  if (!requestData || !participateData || !finishedData) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Image src={loading} alt="loading" />
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClickEvent = (id: string) => {
    router.push(`/challengeList/${id}`);
  };

  const totalPages =
    activeTab === 'participating'
      ? Math.max(1, Math.ceil(participateData?.totalCount / itemsPerPage))
      : activeTab === 'applied'
        ? Math.max(1, Math.ceil(requestData?.totalCount / itemsPerPage))
        : activeTab === 'finished'
          ? Math.max(1, Math.ceil(finishedData?.totalCount / itemsPerPage))
          : 1;

  return (
    <div className="flex flex-col justify-center items-center">
      <MyChallengeHeader activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'participating' &&
        participateData.list.map((item, index) => (
          <div key={index} onClick={() => handleClickEvent(item.id)} className="cursor-pointer">
            <ChallengeCard data={item} userId={item.requestUser.id} role="normal" />
          </div>
        ))}
      {activeTab === 'finished' &&
        finishedData.list.map((item, index) => (
          <div key={index} onClick={() => handleClickEvent(item.id)} className="cursor-pointer">
            <ChallengeCard data={item} userId={item.requestUser.id} role="normal" />
          </div>
        ))}
      {activeTab === 'applied' && (
        <>
          <div className="my-[2.4rem]">
            <ChallengeApplicationBody type="normal" data={requestData.list} />
          </div>
        </>
      )}
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
