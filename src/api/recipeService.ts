import { getRequest } from './api';

export const fetchMenu = async () => {
  const response = await getRequest(`/recipes`);
  return response;
};

export const fetchRecipe = async (id: string) => {
  const response = await getRequest(`/recipes/${id}`);
  return response.data;
};
