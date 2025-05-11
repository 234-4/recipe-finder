import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types';
import { useRecipeContext } from '../context/RecipeContext';
import { getRecipesByIds } from '../utils/api';

interface RecipeListProps {
  recipes?: Recipe[];
  recipeIds?: number[];
  horizontal?: boolean;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, recipeIds, horizontal = false }) => {
  const { loading } = useRecipeContext();
  const [fetchedRecipes, setFetchedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!recipeIds || recipeIds.length === 0) return;

      try {
        setIsLoading(true);
        const data = await getRecipesByIds(recipeIds);
        setFetchedRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (recipeIds) {
      fetchRecipes();
    }
  }, [recipeIds]);

  const displayRecipes = recipes || fetchedRecipes;

  if (loading || isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex justify-between">
                <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!displayRecipes || displayRecipes.length === 0) {
    return null;
  }

  if (horizontal) {
    return (
      <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
        {displayRecipes.map(recipe => (
          <div key={recipe.id} className="min-w-[240px] md:min-w-[300px]">
            <RecipeCard recipe={recipe} horizontal />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayRecipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;