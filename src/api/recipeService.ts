import { getRequest } from './api';

export const fetchMenu = async (keyword = '', category = '', page = 1, pageSize = '8') => {
  const params = {
    keyword: keyword,
    category: category,
    page: page,
    pageSize: pageSize
  };

  const response = await getRequest(`/recipes`, { params });
  return response;
};

export const fetchRecipe = async (id: string) => {
  const response = await getRequest(`/recipes/${id}`);
  return response.data;
};
