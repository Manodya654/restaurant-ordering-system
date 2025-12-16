import axios from 'axios';

// Base URL of your backend API
const API_URL = 'http://localhost:5000/api/menu'; // change port/path if needed

// Get all menu items
export const getMenus = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching menus:', error);
    throw error;
  }
};

// Get a single menu item by ID
export const getMenuById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu with id ${id}:`, error);
    throw error;
  }
};

// Create a new menu item
export const createMenu = async (menuData) => {
  try {
    const response = await axios.post(API_URL, menuData);
    return response.data;
  } catch (error) {
    console.error('Error creating menu:', error);
    throw error;
  }
};

// Update a menu item
export const updateMenu = async (id, menuData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, menuData);
    return response.data;
  } catch (error) {
    console.error(`Error updating menu with id ${id}:`, error);
    throw error;
  }
};

// Delete a menu item
export const deleteMenu = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting menu with id ${id}:`, error);
    throw error;
  }
};
