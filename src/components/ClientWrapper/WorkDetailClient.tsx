import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/authService';
import { getFeedbackList } from '@/api/feedbackService';
import { getWorkDetail } from '@/api/workService';
import FeedbackCard from '../Card/FeedbackCard';
import WorkCard from '../Card/WorkCard';
import WorkInput from '../Input/WorkInput';

export interface WorkDetailClientProps {
  workId: string;
}

export default function WorkDetailClient({ workId }: WorkDetailClientProps) {
  const { data: work } = useQuery({
    queryKey: ['work', workId],
    queryFn: () => getWorkDetail(workId)
  });

  const { data: feedback } = useQuery({
    queryKey: ['feedback', workId],
    queryFn: () => getFeedbackList(workId)
  });

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser()
  });

  return (
    <div>
      <WorkCard data={work} user={user} />
      <WorkInput />
      <FeedbackCard comments={feedback} user={user} />
    </div>
  );
}
