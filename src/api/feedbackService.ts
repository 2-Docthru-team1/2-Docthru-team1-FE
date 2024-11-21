import { getRequest } from './api';

export const getFeedbackList = async (id: string) => {
  const res = await getRequest('/feedbackMockData.json');
  const feedback = res.data.find((item: { id: number }) => item.id === parseInt(id));
  return feedback;
};
