'use client';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { fetchMyFinishedChallenge, fetchMyOngoingChallenge, fetchMyRequestChallenge } from '@/api/challengeService';
import type { MyParticipateData, MyRequestData } from '@/interfaces/challengeInterface';
import useStore from '@/store/store';
import ChallengeApplicationBody from '../Body/ChallengeApplicationBody';
import ChallengeCard from '../Card/ChallengeCard';
import MyChallengeHeader from '../Header/MyChallengeHeader';
import Pagination from '../Pagination/Pagination';

export default function MyChallengeClient() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { keyword, category } = useStore();

  const [activeTab, setActiveTab] = useState('participating');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    if (activeTab === 'applied') {
      setItemsPerPage(10);
    } else if (activeTab === 'participating' || activeTab === 'finished') {
      const width = window.innerWidth;
      if (width >= 1200) {
        setItemsPerPage(4);
      } else if (width >= 375) {
        setItemsPerPage(2);
      }
    }
  }, [activeTab]);

  const {
    data: participateOngoingChallenge,
    isLoading: ongoingLoading,
    isError: ongoingError,
    isPlaceholderData: ongoingPlaceholder
  } = useQuery({
    queryKey: ['participateOngoingChallenge', currentPage, itemsPerPage, keyword, category],
    queryFn: async () => await fetchMyOngoingChallenge(currentPage, itemsPerPage, keyword),
    placeholderData: keepPreviousData
  });

  const {
    data: participateFinishedChallenge,
    isLoading: finishedLoading,
    isError: finishedError,
    isPlaceholderData: finishedPlaceholder
  } = useQuery({
    queryKey: ['participateFinishedChallenge', currentPage, itemsPerPage, keyword, category],
    queryFn: async () => await fetchMyFinishedChallenge(currentPage, itemsPerPage, keyword),
    placeholderData: keepPreviousData
  });

  const {
    data: requestChallenge,
    isLoading: requestLoading,
    isError: requestError,
    isPlaceholderData: requestPlaceholder
  } = useQuery({
    queryKey: ['requestChallenge', currentPage, keyword, itemsPerPage, category],
    queryFn: async () => await fetchMyRequestChallenge(currentPage, itemsPerPage, keyword),
    placeholderData: keepPreviousData
  });

  const totalPages =
    activeTab === 'participating'
      ? Math.max(0, Math.ceil(participateOngoingChallenge?.totalCount / itemsPerPage))
      : activeTab === 'applied'
        ? Math.max(0, Math.ceil(requestChallenge?.totalCount / itemsPerPage))
        : activeTab === 'finished'
          ? Math.max(0, Math.ceil(participateFinishedChallenge?.totalCount / itemsPerPage))
          : 0;

  const hasMore = currentPage < totalPages;
  console.log('Active Tab:', activeTab);
  console.log('Items Per Page:', itemsPerPage);
  console.log('Total Pages:', totalPages);

  useEffect(() => {
    if (!ongoingPlaceholder && hasMore) {
      const pagesToPrefetch = 5;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['participateOngoingChallenge', i, keyword, category, itemsPerPage],
          queryFn: async () => await fetchMyOngoingChallenge(i, itemsPerPage, keyword)
        });
      }
    }
  }, [currentPage, hasMore, ongoingPlaceholder, keyword, category]);

  useEffect(() => {
    if (!finishedPlaceholder && hasMore) {
      const pagesToPrefetch = 5;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['finishedPlaceholder', i, keyword, category, itemsPerPage],
          queryFn: async () => await fetchMyFinishedChallenge(i, itemsPerPage, keyword)
        });
      }
    }
  }, [currentPage, hasMore, finishedPlaceholder, keyword, category]);

  useEffect(() => {
    if (!requestPlaceholder && hasMore) {
      const pagesToPrefetch = 5;
      const nextPage = currentPage + 1;

      for (let i = nextPage; i < nextPage + pagesToPrefetch && i <= totalPages; i++) {
        queryClient.prefetchQuery({
          queryKey: ['requestChallenge', i, keyword, category, itemsPerPage],
          queryFn: async () => await fetchMyRequestChallenge(i, itemsPerPage, keyword, category)
        });
      }
    }
  }, [currentPage, hasMore, requestPlaceholder, keyword, category]);

  if (ongoingLoading || finishedLoading || requestLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Image src={loading} alt="loading" />
      </div>
    );
  }

  if (ongoingError || finishedError || requestError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-[1.5rem]">Failed to load data. Please try again later.</p>
      </div>
    );
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClickEvent = (id: string) => {
    router.push(`/challengeList/${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <MyChallengeHeader activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'participating' &&
        (participateOngoingChallenge.totalCount === 0 ? (
          <div className="flex items-center justify-center mt-[2rem]">
            <p className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-400">There is no challenge participate yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 my-[2rem]">
            {participateOngoingChallenge.list.map((item: any, index: number) => (
              <div key={index} onClick={() => handleClickEvent(item.id)} className="cursor-pointer">
                <ChallengeCard data={item} userId={item.requestUser.id} role="normal" />
              </div>
            ))}
          </div>
        ))}

      {activeTab === 'finished' &&
        (participateFinishedChallenge.totalCount === 0 ? (
          <div className="flex items-center justify-center mt-[2rem]">
            <p className="font-normal text-[1.6rem] leading-[1.909rem] text-gray-400">There is no challenge participate yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 my-[2rem]">
            {participateFinishedChallenge.list.slice(0, 4).map((item: any, index: number) => (
              <div key={index} onClick={() => handleClickEvent(item.id)} className="cursor-pointer">
                <ChallengeCard data={item} userId={item.requestUser.id} role="normal" />
              </div>
            ))}
          </div>
        ))}

      {activeTab === 'applied' && (
        <>
          <div className="my-[2.4rem]">
            <ChallengeApplicationBody type="normal" data={requestChallenge.list} />
          </div>
        </>
      )}
      {totalPages >= 1 && (
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
