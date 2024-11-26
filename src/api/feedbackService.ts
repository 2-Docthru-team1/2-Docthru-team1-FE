import { patchRequest } from './api';

export const patchFeedback = async (feedbackId: string, content: string) => {
  try {
    const res = await patchRequest(`/feedbacks/${feedbackId}`, { content });
    return res.data;
  } catch (error) {
    throw new Error('Failed to patch feedback');
  }
};
