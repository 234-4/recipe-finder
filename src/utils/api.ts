import { Recipe } from '../types';
import { mockRecipes } from './mockData';

// For a real implementation, use your own API key from Spoonacular
const API_KEY = '';
const BASE_URL = 'https://api.spoonacular.com';

// This flag determines if we should use mock data instead of real API calls
// In a real app, you'd remove this and use proper error handling
const USE_MOCK_DATA = true;

export async function searchRecipesByQuery(query: string): Promise<Recipe[]> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter mock data based on query if provided
        if (query) {
          const filtered = mockRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(query.toLowerCase())
          );
          resolve(filtered);
        } else {
          resolve(mockRecipes);
        }
      }, 800); // Simulate network delay
    });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=20&addRecipeInformation=true&fillIngredients=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function searchRecipesByIngredients(ingredients: string): Promise<Recipe[]> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (ingredients) {
          const ingredientsList = ingredients.split(',').map(i => i.trim().toLowerCase());
          const filtered = mockRecipes.filter(recipe => 
            ingredientsList.some(ingredient => 
              recipe.title.toLowerCase().includes(ingredient) ||
              (recipe.extendedIngredients && recipe.extendedIngredients.some(
                i => i.name.toLowerCase().includes(ingredient)
              ))
            )
          );
          resolve(filtered);
        } else {
          resolve(mockRecipes);
        }
      }, 800);
    });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=20&ranking=1&ignorePantry=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes by ingredients');
    }
    
    const data = await response.json();
    
    // Fetch full details for each recipe
    const recipeDetails = await Promise.all(
      data.map(async (recipe: { id: number }) => {
        return await getRecipeById(recipe.id);
      })
    );
    
    return recipeDetails;
  } catch (error) {
    console.error('Error fetching recipes by ingredients:', error);
    return [];
  }
}

export async function getRecipeById(id: number): Promise<Recipe> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recipe = mockRecipes.find(r => r.id === id);
        if (recipe) {
          resolve(recipe);
        } else {
          resolve(mockRecipes[0]); // Fallback to first recipe
        }
      }, 500);
    });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
}

export async function getRecipesByIds(ids: number[]): Promise<Recipe[]> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recipes = mockRecipes.filter(recipe => ids.includes(recipe.id));
        resolve(recipes);
      }, 700);
    });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/recipes/informationBulk?apiKey=${API_KEY}&ids=${ids.join(',')}&includeNutrition=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes by IDs:', error);
    return [];
  }
}