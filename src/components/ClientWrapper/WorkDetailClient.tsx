'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getUser } from '@/api/userService';
import { getFeedbackList } from '@/api/workService';
import { getWorkDetail } from '@/api/workService';
import type { FeedbackResponse } from '@/interfaces/feedbackInterface';
import FeedbackCard from '../Card/FeedbackCard';
import WorkCard from '../Card/WorkCard';
import WorkInput from '../Input/WorkInput';

export default function WorkDetailClient() {
  const { id, workId } = useParams();
  const workIdParam = workId as string;

  const {
    data: work,
    isLoading: workLoading,
    error: workError
  } = useQuery({
    queryKey: ['work'],
    queryFn: () => getWorkDetail(workIdParam)
  });

  const {
    data: feedback,
    isLoading: feedbackLoading,
    error: feedbackError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<FeedbackResponse>({
    queryKey: ['feedback'],
    queryFn: ({ pageParam }) => {
      return getFeedbackList(workIdParam, pageParam as number, 4);
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
        <div className="relative w-[16rem] h-[16rem]">
          <div className="absolute inset-0 w-full h-full border-[4rem] border-t-[4rem] border-gray-300 border-t-primary-blue rounded-full animate-spin"></div>
          <span className="absolute inset-0 flex justify-center items-center text-[1.5rem] text-gray-500">Loading...</span>
        </div>
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
    <div className="flex flex-col w-full  items-center justify-center bg-primary-white">
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
