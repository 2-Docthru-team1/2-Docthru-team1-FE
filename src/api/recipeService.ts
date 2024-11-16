import { getRequest } from "./api";

export const fetchMenu = async () => {
  const response = await getRequest("/mockData.json");
  return response.data;
};
