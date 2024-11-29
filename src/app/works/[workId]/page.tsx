import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getFeedbackList, getWorkDetail } from '@/api/workService';
import WorkDetailClient from '@/components/ClientWrapper/WorkDetailClient';
import type { FeedbackResponse } from '@/interfaces/feedbackInterface';

export default function WorkPage({ params }: { params: { workId: string } }) {
  const { workId } = params;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['work', workId],
    queryFn: () => getWorkDetail(workId)
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: ['feedback', workId],
    queryFn: ({ pageParam }) => getFeedbackList(workId, pageParam, 4),
    getNextPageParam: (lastPage: FeedbackResponse, allPages: FeedbackResponse[]) => {
      const currentPage = allPages.length;
      const totalPage = Math.ceil(lastPage.totalCount / 4);
      return currentPage < totalPage ? currentPage + 1 : undefined;
    },
    initialPageParam: 1
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <WorkDetailClient workId={workId} />
    </HydrationBoundary>
  );
}
