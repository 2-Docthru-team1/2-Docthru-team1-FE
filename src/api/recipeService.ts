import { deleteRequest, getRequest, postRequest } from './api';

export const fetchMenu = async (page: number, pageSize: number, search: string, sort: string) => {
  try {
    const response = await getRequest(`/recipes?page=${page}&pageSize=${pageSize}&keyword=${search}&filter=${sort}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get recipe data');
  }
};

export const fetchRecipe = async (id: string) => {
  try {
    const response = await getRequest(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get recipe');
  }
};

export const fetchLikePost = async (id: string) => {
  try {
    const response = await postRequest(`/recipes/${id}/like`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create like');
  }
};

export const fetchUnlikePost = async (id: string) => {
  try {
    const response = await deleteRequest(`/recipes/${id}/like`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create unlike');
  }
};
