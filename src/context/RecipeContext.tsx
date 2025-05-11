import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe } from '../types';
import { searchRecipesByQuery, searchRecipesByIngredients } from '../utils/api';

interface RecipeContextType {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  searchHistory: string[];
  searchRecipes: (query: string) => Promise<void>;
  applyFilters: (filters: any) => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastQuery, setLastQuery] = useState('');

  const addToSearchHistory = (query: string) => {
    if (!query.trim() || searchHistory.includes(query)) return;

    const newHistory = [query, ...searchHistory].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const searchRecipes = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      setLastQuery(query);

      let results;
      if (query.includes(',') || query.match(/^[a-zA-Z]+$/)) {
        // If query contains commas or is a single word, treat as ingredient search
        results = await searchRecipesByIngredients(query);
      } else {
        // Otherwise, treat as general search
        results = await searchRecipesByQuery(query);
      }

      setRecipes(results);
      if (query) addToSearchHistory(query);
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Failed to search recipes. Please try again later.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async (filters: any) => {
    try {
      setLoading(true);
      setError(null);

      // Start with the last query as a base, or empty string
      let baseQuery = lastQuery || '';
      
      // Add cuisine filter
      if (filters.cuisines.length > 0) {
        baseQuery += `&cuisine=${filters.cuisines.join(',')}`;
      }

      // Add diet filter
      if (filters.diets.length > 0) {
        baseQuery += `&diet=${filters.diets.join(',')}`;
      }

      // Add max ready time
      if (filters.readyInMinutes) {
        baseQuery += `&maxReadyTime=${filters.readyInMinutes}`;
      }

      // Add included ingredients
      if (filters.includeIngredients.length > 0) {
        baseQuery += `&includeIngredients=${filters.includeIngredients.join(',')}`;
      }

      // Add excluded ingredients
      if (filters.excludeIngredients.length > 0) {
        baseQuery += `&excludeIngredients=${filters.excludeIngredients.join(',')}`;
      }

      const results = await searchRecipesByQuery(baseQuery);
      setRecipes(results);
    } catch (err) {
      console.error('Error applying filters:', err);
      setError('Failed to apply filters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      loading,
      error,
      searchHistory,
      searchRecipes,
      applyFilters
    }}>
      {children}
    </RecipeContext.Provider>
  );
};