import { deleteRequest, getRequest, patchRequest, postRequest } from './api';

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

export const patchWorkDetail = async (workId: string, content: string, title: string) => {
  try {
    const res = await patchRequest(`/works/${workId}`, { content, title });
    return res.data;
  } catch (error) {
    throw new Error('Failed to edit work.');
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

export const likePost = async (workId: string) => {
  try {
    const res = await postRequest(`/works/${workId}/like`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to create like');
  }
};

export const unLikePost = async (workId: string) => {
  try {
    const res = await deleteRequest(`/works/${workId}/like`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to create unlike');
  }
};
