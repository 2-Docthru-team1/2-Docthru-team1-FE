import type { AxiosResponse } from 'axios';
import type { ChallengeParticipantStatusData } from '@/interfaces/cardInterface';
import { getRequest } from './api';

export const fetchChallengeStatus = async (): Promise<ChallengeParticipantStatusData[]> => {
  const response: AxiosResponse<ChallengeParticipantStatusData[]> = await getRequest('/ChallengeStatusData.json');
  return response.data;
};
