import { deleteRequest, getRequest, postRequest } from './api';

export const getWorkDetail = async (workId: string) => {
  try {
    const res = await getRequest(`/works/${workId}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to get works.');
  }
};

export const deleteWorkDetail = async (workId: string) => {
  try {
    await deleteRequest(`/works/${workId}`);
  } catch (error) {
    throw new Error('Failed to delete works.');
  }
};

export const getFeedbackList = async (workId: string, page: number, pageSize: number = 4) => {
  try {
    const res = await getRequest(`/works/${workId}/feedbacks?page=${page}&pageSize=${pageSize}`);
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