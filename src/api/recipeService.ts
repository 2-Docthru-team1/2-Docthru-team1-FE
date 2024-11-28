import { getRequest } from './api';

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
