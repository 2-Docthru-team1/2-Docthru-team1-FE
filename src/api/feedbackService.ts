import { deleteRequest, patchRequest } from './api';

export const patchFeedback = async (feedbackId: string, content: string) => {
  try {
    const res = await patchRequest(`/feedbacks/${feedbackId}`, { content });
    return res.data;
  } catch (error) {
    throw new Error('Failed to patch feedback');
  }
};

export const deleteFeedback = async (feedbackId: string) => {
  try {
    const res = await deleteRequest(`/feedbacks/${feedbackId}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to delete feedback');
  }
};
