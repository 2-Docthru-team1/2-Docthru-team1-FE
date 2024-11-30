import { headers } from 'next/headers';
import type { ChallengeParticipateStatusProps } from '@/interfaces/cardInterface';
import { getRequest, patchRequest, postRequest } from './api';

export const fetchChallenge = async (page: number, pageSize: number, queryParams: string = '') => {
  try {
    const response = await getRequest(`/challenges?page=${page}&pageSize=${pageSize}${queryParams}`);
    return response.data;
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

export const fetchAdminChallenge = async (queryParams: string = '') => {
  try {
    const response = await getRequest(`/challenges/monthly${queryParams}`);
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

export const fetchChallengeApplication = async (page: string, pageSize: number = 10, keyword: string, category: string) => {
  try {
    const response = await getRequest(
      `/challenges/admin-requests?page=${page}&pageSize=${pageSize}&keyword=${keyword}&filter=${category}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get Challenge Application Data');
  }
};

export const fetchChallengeAbortReason = async (id: string) => {
  try {
    const response = await getRequest(`/challenges/${id}/reason`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get abort reason');
  }
};

export const fetchChallengeStatusChange = async (id: string, status: string, abortReason?: string) => {
  const requestBody = {
    status: status,
    abortReason: abortReason
  };
  try {
    const response = await patchRequest(`/challenges/${id}/status`, requestBody);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to change challenge status`);
  }
};

export const fetchAdminChallengeDetailPrev = async (id: string) => {
  try {
    const response = await getRequest(`/challenges/${id}/prev`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get prev data');
  }
};

export const fetchAdminChallengeDetailNext = async (id: string) => {
  try {
    const response = await getRequest(`/challenges/${id}/next`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get next data');
  }
};
