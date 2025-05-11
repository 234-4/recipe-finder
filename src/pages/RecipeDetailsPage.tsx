import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Bookmark, 
  CheckCircle, 
  ArrowLeft, 
  Heart,
  AlertTriangle
} from 'lucide-react';
import { getRecipeById } from '../utils/api';
import { useFavoritesContext } from '../context/FavoritesContext';
import { Recipe } from '../types';
import NutritionInfo from '../components/NutritionInfo';

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useFavoritesContext();
  const isFavorite = id ? favorites.includes(parseInt(id)) : false;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getRecipeById(parseInt(id));
        setRecipe(data);
        
        // Add to recently viewed
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const newRecentlyViewed = [parseInt(id), ...recentlyViewed.filter((item: number) => item !== parseInt(id))].slice(0, 10);
        localStorage.setItem('recentlyViewed', JSON.stringify(newRecentlyViewed));
      } catch (err) {
        setError('Failed to load recipe details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (id) {
      toggleFavorite(parseInt(id));
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recipe Not Found</h2>
        <p className="text-gray-600 mb-4">{error || "We couldn't find the recipe you were looking for."}</p>
        <button 
          onClick={handleBackClick}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-96">
        <img 
          src={recipe.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={handleBackClick}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button 
          onClick={handleFavoriteToggle}
          className={`absolute top-4 right-4 rounded-full p-3 shadow-md transition-colors ${
            isFavorite 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-gray-700">
            <Clock className="mr-2 h-5 w-5 text-orange-500" />
            <span>{recipe.readyInMinutes || '30'} minutes</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Users className="mr-2 h-5 w-5 text-orange-500" />
            <span>{recipe.servings || '4'} servings</span>
          </div>
          <div className="flex items-center text-gray-700">
            <ChefHat className="mr-2 h-5 w-5 text-orange-500" />
            <span>{recipe.cuisines?.join(', ') || 'International'}</span>
          </div>
          {recipe.vegetarian && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>Vegetarian</span>
            </div>
          )}
        </div>

        {recipe.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Bookmark className="mr-2 h-5 w-5 text-orange-500" />
              Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.extendedIngredients?.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-orange-400 mt-2 mr-2"></span>
                  <span className="text-gray-700">
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <ChefHat className="mr-2 h-5 w-5 text-orange-500" />
              Instructions
            </h2>
            {recipe.instructions ? (
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            ) : (
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-gray-700">Prepare all ingredients as listed.</li>
                <li className="text-gray-700">Follow the package instructions.</li>
                <li className="text-gray-700">Combine ingredients in a large bowl.</li>
                <li className="text-gray-700">Cook according to preference.</li>
                <li className="text-gray-700">Serve hot and enjoy!</li>
              </ol>
            )}
          </div>
        </div>

        {recipe.nutrition && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Nutrition Information</h2>
            <NutritionInfo nutrition={recipe.nutrition} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;