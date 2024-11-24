import { getRequest, patchRequest, postRequest } from './api';

export const getFeedbackList = async (workId: string) => {
  try {
    const res = await getRequest(`/works/${workId}/feedbacks`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to get feedback');
  }
};

export const postFeedback = async (workId: string, content: string) => {
  try {
    const res = await postRequest(`/works/${workId}/feedbacks`, { content });
    return res.data;
  } catch (error) {
    throw new Error('Failed to create feedback');
  }
};

export const patchFeedback = async (feedbackId: string, content: string) => {
  try {
    const res = await patchRequest(`/feedbacks/${feedbackId}`, { content });
    return res.data;
  } catch (error) {
    throw new Error('Failed to patch feedback');
  }
};
