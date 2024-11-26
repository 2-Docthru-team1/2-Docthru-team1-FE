import { getRequest } from './api';

export const fetchMenu = async () => {
  try {
    const response = await getRequest(`/recipes`);
    return response;
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
