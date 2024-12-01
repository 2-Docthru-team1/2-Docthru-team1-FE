'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
      ? Math.max(0, Math.ceil(participateData?.totalCount / itemsPerPage))
      : activeTab === 'applied'
        ? Math.max(0, Math.ceil(requestData?.totalCount / itemsPerPage))
        : activeTab === 'finished'
          ? Math.max(0, Math.ceil(finishedData?.totalCount / itemsPerPage))
          : 1;

  return (
    <div className="flex flex-col justify-center items-center">
      <MyChallengeHeader activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'participating' &&
        (participateData.totalCount === 0 ? (
          <div className="flex items-center justify-center mt-[2rem]">
            <p className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-400">There is no challenge participate yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 my-[2rem]">
            {participateData.list.map((item, index) => (
              <div key={index} onClick={() => handleClickEvent(item.id)} className="cursor-pointer">
                <ChallengeCard data={item} userId={item.requestUser.id} role="normal" />
              </div>
            ))}
          </div>
        ))}

      {activeTab === 'finished' &&
        (finishedData.totalCount === 0 ? (
          <div className="flex items-center justify-center mt-[2rem]">
            <p className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-400">There is no challenge participate yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 my-[2rem]">
            {finishedData.list.slice(0, 4).map((item, index) => (
              <div key={index} onClick={() => handleClickEvent(item.id)} className="cursor-pointer">
                <ChallengeCard data={item} userId={item.requestUser.id} role="normal" />
              </div>
            ))}
          </div>
        ))}

      {activeTab === 'applied' && (
        <>
          <div className="my-[2.4rem]">
            <ChallengeApplicationBody type="normal" data={requestData.list} />
          </div>
        </>
      )}
      {totalPages === 0 ? null : (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNext={currentPage < totalPages}
          type="default"
        />
      )}
    </div>
  );
}
