import type { Recipe, RecipesResponse, RecipeResponse } from '../types';

// Take url from Vite or localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

// Set up error class for error handling
class ApiError extends Error {
    status: number; //404,500 etc
    constructor(status: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

// Handle responses for three different shapes: RecipesResponse, RecipeResponse and ApiError 
// thus need <T> as placeholder type
const handleResponse = async <T>(response: Response): Promise<T> => {
    // If response is not ok, throw an error
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
    }
    // Otherwise return
    return response.json();
};

// Types for search, random and recipe card
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
    // Check if the query is empty
    if (!query.trim()) {
        return [];
    }
    // If not, search the API
    const response = await fetch(`${API_BASE_URL}/recipes/search?query=${encodeURIComponent(query.trim())}`);
    const data = await handleResponse<RecipesResponse>(response);
    return data.recipes;
};
export const getRandomRecipe = async (): Promise<Recipe> => {
    const response = await fetch(`${API_BASE_URL}/recipes/random`);
    const data = await handleResponse<RecipeResponse>(response);
    return data.recipe;
};
export const getRecipeById = async (id: string): Promise<Recipe> => {
    const response = await fetch(`${API_BASE_URL}/recipes/${encodeURIComponent(id)}`);
    const data = await handleResponse<RecipeResponse>(response);
    return data.recipe;
};

export { ApiError };