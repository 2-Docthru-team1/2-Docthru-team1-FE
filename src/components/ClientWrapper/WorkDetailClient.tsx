import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useStore } from 'zustand';
import { getFeedbackList } from '@/api/feedbackService';
import { getUser } from '@/api/userService';
import { getWorkDetail } from '@/api/workService';
import FeedbackCard from '../Card/FeedbackCard';
import WorkCard from '../Card/WorkCard';
import WorkInput from '../Input/WorkInput';

export interface WorkDetailClientProps {
  workId: string;
}

export default function WorkDetailClient({ workId }: WorkDetailClientProps) {
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
    error: feedbackError
  } = useQuery({
    queryKey: ['feedback', workId],
    queryFn: () => getFeedbackList(workId)
  });

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser()
  });

  if (workLoading || feedbackLoading) {
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
    <div>
      <WorkCard data={work} user={user} />
      <WorkInput data={work} />
      <FeedbackCard comments={feedback} user={user} />
    </div>
  );
}
