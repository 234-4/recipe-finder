import React from 'react';
import { useFavoritesContext } from '../context/FavoritesContext';
import RecipeList from '../components/RecipeList';
import { Heart, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavoritesContext();

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Heart className="mr-2 h-6 w-6 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-800">Your Favorite Recipes</h1>
      </div>

      {favorites.length > 0 ? (
        <RecipeList recipeIds={favorites} />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Favorites Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't saved any recipes to your favorites yet. Browse recipes and click the heart icon to add them here.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors inline-block"
          >
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;