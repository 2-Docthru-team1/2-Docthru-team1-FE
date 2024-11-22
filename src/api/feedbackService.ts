import { getRequest } from './api';

export const getFeedbackList = async (workId: string) => {
  const res = await getRequest(`/works/${workId}/feedbacks`);
  return res.data;
};
