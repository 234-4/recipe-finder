import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart } from 'lucide-react';
import { Recipe } from '../types';
import { useFavoritesContext } from '../context/FavoritesContext';

interface RecipeCardProps {
  recipe: Recipe;
  horizontal?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, horizontal = false }) => {
  const { favorites, toggleFavorite } = useFavoritesContext();
  const isFavorite = favorites.includes(recipe.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  return (
    <Link 
      to={`/recipe/${recipe.id}`}
      className={`group bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 ${
        horizontal ? 'flex' : 'block'
      }`}
    >
      <div className={`relative ${horizontal ? 'w-40 md:w-48' : 'h-48'}`}>
        <img 
          src={recipe.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'} 
          alt={recipe.title} 
          className={`w-full h-full object-cover ${horizontal ? 'h-full' : ''}`}
          loading="lazy"
        />
        <button 
          onClick={handleFavoriteToggle}
          className={`absolute top-2 right-2 rounded-full p-2 transition-colors ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-700 opacity-80 group-hover:opacity-100'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className={`p-4 ${horizontal ? 'flex-grow' : ''}`}>
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-1 h-4 w-4 text-orange-500" />
            <span>{recipe.readyInMinutes || '30'} min</span>
          </div>
          
          {recipe.healthScore && (
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              recipe.healthScore > 80 ? 'bg-green-100 text-green-800' : 
              recipe.healthScore > 50 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              Health {recipe.healthScore}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;