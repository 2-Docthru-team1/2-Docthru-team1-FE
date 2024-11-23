import { getRequest } from './api';

export const fetchMenu = async (keyword = '', category = '') => {
  const params = {
    keyword: keyword,
    category: category
  };

  const response = await getRequest(`/recipes`, { params });

  return response.data;
};

export const fetchRecipe = async (id: string) => {
  const response = await getRequest(`/recipes/${id}`);
  return response.data;
};
