import axios from 'axios';

const API_URL = 'https://greythium.com/automobiles-api/public/api/automoviles';


export const getAutomoviles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getAutomovil = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createAutomovil = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateAutomovil = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteAutomovil = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getCountries = async () => {
  try {
    const response = await axios.get('https://greythium.com/automobiles-api/public/api/paises');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};