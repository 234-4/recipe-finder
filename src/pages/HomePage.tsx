import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import FilterPanel from '../components/FilterPanel';
import { useRecipeContext } from '../context/RecipeContext';
import { ChefHat, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  const { recipes, loading, searchRecipes, applyFilters } = useRecipeContext();
  const [showFilters, setShowFilters] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);

  useEffect(() => {
    const viewed = localStorage.getItem('recentlyViewed');
    if (viewed) {
      setRecentlyViewed(JSON.parse(viewed));
    }
    
    // Initial search to populate the page
    searchRecipes('');
  }, [searchRecipes]);

  const handleSearch = (query: string) => {
    searchRecipes(query);
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterApply = (filters: any) => {
    applyFilters(filters);
  };

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-orange-200 to-amber-100 rounded-xl p-8 shadow-md">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">Find Your Perfect Recipe</h1>
          <p className="text-lg text-orange-700 mb-6">Search by ingredients and discover delicious meals to cook today</p>
          <SearchBar onSearch={handleSearch} />
          <button 
            onClick={handleFilterToggle}
            className="mt-4 text-orange-600 hover:text-orange-800 flex items-center mx-auto transition-colors"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'} 
            <ChefHat className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>

      {showFilters && (
        <FilterPanel onApplyFilters={handleFilterApply} />
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <>
          {recentlyViewed.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Clock className="mr-2 text-orange-500" />
                <h2 className="text-2xl font-semibold text-gray-800">Recently Viewed</h2>
              </div>
              <RecipeList recipeIds={recentlyViewed.slice(0, 4)} horizontal />
            </section>
          )}
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recipes for You</h2>
            {recipes.length > 0 ? (
              <RecipeList recipes={recipes} />
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow">
                <p className="text-gray-500">No recipes found. Try adjusting your search or filters.</p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;