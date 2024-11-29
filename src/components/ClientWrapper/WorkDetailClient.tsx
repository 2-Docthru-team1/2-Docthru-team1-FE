'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import loading from '@/../public/assets/Message@1x-1.0s-200px-200px.svg';
import { getUser } from '@/api/userService';
import { getFeedbackList } from '@/api/workService';
import { getWorkDetail } from '@/api/workService';
import type { FeedbackResponse } from '@/interfaces/feedbackInterface';
import FeedbackCard from '../Card/FeedbackCard';
import WorkCard from '../Card/WorkCard';
import WorkInput from '../Input/WorkInput';

export default function WorkDetailClient() {
  const { id } = useParams();
  const workId = String(id);
  const {
    data: work,
    isLoading: workLoading,
    error: workError
  } = useQuery({
    queryKey: ['work', workId],
    queryFn: () => getWorkDetail(workId)
  });

  const {
    data: feedback,
    isLoading: feedbackLoading,
    error: feedbackError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FeedbackResponse>({
    queryKey: ['feedback', workId],
    queryFn: ({ pageParam }) => {
      return getFeedbackList(workId, pageParam as number, 4);
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.totalCount / 4);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser()
  });

  if (workLoading || feedbackLoading || userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Image src={loading} alt="loading" />
      </div>
    );
  }

  if (workError || feedbackError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-[1.5rem]">Failed to load data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <WorkCard data={work} user={user} />
      <WorkInput data={work} />
      <FeedbackCard
        comments={feedback ? feedback.pages.flatMap(page => page.list) : []}
        user={user}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
