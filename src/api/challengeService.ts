import type { ChallengeParticipateStatusProps } from '@/interfaces/cardInterface';
import { getRequest, patchRequest, postRequest } from './api';

export const fetchChallenge = async (queryParams: string = '') => {
  try {
    const response = await getRequest(`/challenges${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get challenge');
  }
};

export const getFilteredChallenges = async () => {
  try {
    const { list, totalCount } = await fetchChallenge();
    const filteredList = list.filter((list: { status: string }) => ['onGoing', 'finished'].includes(list.status));
    return { list: filteredList, totalCount };
  } catch (error) {
    throw new Error('Failed to get challenge');
  }
};

export const fetchRanker = async () => {
  try {
    const response = await getRequest('http://localhost:3000/rankerMockData.json');
    // const response = await getRequest('https://2-docthru-team1-n10tvnaef-team1-hancook.vercel.app/rankerMockData.json');
    return response.data;
  } catch (error) {
    throw new Error('Failed to get ranker');
  }
};

export const fetchAdminChallenge = async () => {
  try {
    const response = await getRequest('http://localhost:3000/adminchallengeMockData.json');
    // const response = await getRequest('https://2-docthru-team1-n10tvnaef-team1-hancook.vercel.app/adminchallengeMockData.json');
    return response.data;
  } catch (error) {
    throw new Error('Failed to get admin challenge data');
  }
};

export const fetchChallenge_detail = async (id: string) => {
  try {
    const response = await getRequest(`/challenges/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get challenge detail');
  }
};

export const fetchChallengeStatus = async (id: string, page: number): Promise<ChallengeParticipateStatusProps> => {
  try {
    const params = {
      page: page,
      pageSize: 4
    };
    const response = await getRequest(`/challenges/${id}/works`, { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get works');
  }
};

export const fetchChallengeRequest = async (data: object) => {
  try {
    const response = await postRequest('/challenges', data);

    return response.data;
  } catch (err: any) {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (err?.response?.data?.field === '요청 형식이 잘못되었습니다.') {
      errorMessage = '요청 형식이 잘못되었습니다.';
    }
    if (err?.response?.data?.field === '먼저 로그인해 주세요.') {
      errorMessage = '먼저 로그인해 주세요.';
    }
    alert(errorMessage);
  }
};

export const fetchUpdateStatus = async (challengeId: string, newStatus: 'canceled' | 'aborted', reason: string) => {
  try {
    const response = await patchRequest(`/challenges/${challengeId}/status`, {
      status: newStatus,
      abortReason: reason
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update challenge status:', error);
    throw error;
  }
};
