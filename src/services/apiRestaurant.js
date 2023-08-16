import axios from "axios";

const API_URL = `https://react-fast-pizza-api.onrender.com/api`;

export const getMenu = async () => {
  const { data } = await axios.get(`${API_URL}/menu`);
  return data;
};

export const getOrder = async (id) => {
  const { data } = await axios.get(`${API_URL}/order/${id}`);
  return data;
};

export const createOrder = async (newOrder) => {
  const { data } = await axios.post(`${API_URL}/order`, newOrder);

  return data;
};
