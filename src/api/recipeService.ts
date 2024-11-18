import { getRequest } from './api';

export const fetchMenu = async () => {
  const response = await getRequest('/mockData.json');
  return response.data;
};

export const fetchRecipe = async (id: string) => {
  const response = await getRequest(`/mockData.json`);
  const recipe = response.data.find((item: { id: number }) => item.id === parseInt(id));
  return recipe;
};
