import { deleteRequest, getRequest } from './api';

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
