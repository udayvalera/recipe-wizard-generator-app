
import axios from 'axios';
import { 
  mockFetchIngredients, 
  mockAddIngredient, 
  mockGenerateRecipe, 
  mockFetchRecipeHistory 
} from './mockApi';

// Check if we're in development mode to use mock data
const isDevelopment = import.meta.env.DEV;

const api = axios.create({
  baseURL: '/api',
});

export interface Ingredient {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Recipe {
  _id: string;
  ingredients: string[];
  title: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const fetchIngredients = async (): Promise<Ingredient[]> => {
  try {
    if (isDevelopment) {
      return await mockFetchIngredients();
    }
    const response = await api.get('/items');
    return response.data;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
};

export const addIngredient = async (name: string): Promise<Ingredient> => {
  try {
    if (isDevelopment) {
      return await mockAddIngredient(name);
    }
    const response = await api.post('/items/add', { name });
    return response.data;
  } catch (error) {
    console.error('Error adding ingredient:', error);
    throw error;
  }
};

export const generateRecipe = async (itemIds: string[]): Promise<Recipe> => {
  try {
    if (isDevelopment) {
      return await mockGenerateRecipe(itemIds);
    }
    const response = await api.post('/recipes/basket/generate-recipe', { itemIds });
    return response.data;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
};

export const fetchRecipeHistory = async (): Promise<Recipe[]> => {
  try {
    if (isDevelopment) {
      return await mockFetchRecipeHistory();
    }
    const response = await api.get('/recipes/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe history:', error);
    throw error;
  }
};
