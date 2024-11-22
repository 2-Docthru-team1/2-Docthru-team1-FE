import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getFeedbackList } from '@/api/feedbackService';
import { getWorkDetail } from '@/api/workService';
import WorkDetailClient from '@/components/ClientWrapper/WorkDetailClient';

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
  workId: string;
}> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ dehydratedState: DehydratedState; workId: string }>> => {
  const queryClient = new QueryClient();
  const { workId } = context.params || {};

  if (!workId || typeof workId !== 'string') {
    return { notFound: true };
  }

  await queryClient.prefetchQuery({
    queryKey: ['work', workId],
    queryFn: () => getWorkDetail(workId)
  });

  await queryClient.prefetchQuery({
    queryKey: ['feedback', workId],
    queryFn: () => getFeedbackList(workId)
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      workId
    }
  };
};

export default function WorkPage({ dehydratedState, workId }: { dehydratedState: DehydratedState; workId: string }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <WorkDetailClient workId={workId} />
    </HydrationBoundary>
  );
}
