import React, { useState } from 'react';
import { Filter, Check } from 'lucide-react';

interface FilterPanelProps {
  onApplyFilters: (filters: FilterState) => void;
}

interface FilterState {
  cuisines: string[];
  diets: string[];
  readyInMinutes: number;
  includeIngredients: string[];
  excludeIngredients: string[];
}

const CUISINES = [
  'Italian', 'American', 'Mexican', 'Asian', 'Mediterranean', 
  'Indian', 'French', 'Thai', 'Greek', 'Spanish'
];

const DIETS = [
  'Vegetarian', 'Vegan', 'Gluten Free', 'Ketogenic', 'Pescetarian',
  'Paleo', 'Low FODMAP', 'Whole30'
];

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState<FilterState>({
    cuisines: [],
    diets: [],
    readyInMinutes: 60,
    includeIngredients: [],
    excludeIngredients: [],
  });
  
  const [includeInput, setIncludeInput] = useState('');
  const [excludeInput, setExcludeInput] = useState('');

  const handleCuisineToggle = (cuisine: string) => {
    setFilters(prev => {
      const newCuisines = prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine];
      
      return { ...prev, cuisines: newCuisines };
    });
  };

  const handleDietToggle = (diet: string) => {
    setFilters(prev => {
      const newDiets = prev.diets.includes(diet)
        ? prev.diets.filter(d => d !== diet)
        : [...prev.diets, diet];
      
      return { ...prev, diets: newDiets };
    });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      readyInMinutes: parseInt(e.target.value)
    }));
  };

  const handleAddIngredient = (type: 'include' | 'exclude') => {
    const input = type === 'include' ? includeInput : excludeInput;
    if (input.trim()) {
      setFilters(prev => {
        const ingredient = input.trim().toLowerCase();
        const key = type === 'include' ? 'includeIngredients' : 'excludeIngredients';
        
        if (!prev[key].includes(ingredient)) {
          return {
            ...prev,
            [key]: [...prev[key], ingredient]
          };
        }
        return prev;
      });
      
      if (type === 'include') {
        setIncludeInput('');
      } else {
        setExcludeInput('');
      }
    }
  };

  const handleRemoveIngredient = (type: 'include' | 'exclude', ingredient: string) => {
    setFilters(prev => {
      const key = type === 'include' ? 'includeIngredients' : 'excludeIngredients';
      return {
        ...prev,
        [key]: prev[key].filter(item => item !== ingredient)
      };
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters({
      cuisines: [],
      diets: [],
      readyInMinutes: 60,
      includeIngredients: [],
      excludeIngredients: [],
    });
    setIncludeInput('');
    setExcludeInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Filter className="mr-2 h-5 w-5 text-orange-500" />
          Filter Recipes
        </h2>
        <button 
          onClick={handleResetFilters}
          className="text-sm text-orange-600 hover:text-orange-800"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Cuisine</h3>
          <div className="grid grid-cols-2 gap-2">
            {CUISINES.map(cuisine => (
              <label key={cuisine} className="flex items-center space-x-2 cursor-pointer">
                <div 
                  className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
                    filters.cuisines.includes(cuisine) 
                      ? 'bg-orange-500 border-orange-500' 
                      : 'border-gray-300'
                  }`}
                >
                  {filters.cuisines.includes(cuisine) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <span className="text-sm text-gray-700">{cuisine}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">Diet</h3>
          <div className="grid grid-cols-2 gap-2">
            {DIETS.map(diet => (
              <label key={diet} className="flex items-center space-x-2 cursor-pointer">
                <div 
                  className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
                    filters.diets.includes(diet) 
                      ? 'bg-orange-500 border-orange-500' 
                      : 'border-gray-300'
                  }`}
                  onClick={() => handleDietToggle(diet)}
                >
                  {filters.diets.includes(diet) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <span className="text-sm text-gray-700">{diet}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Max Cooking Time: {filters.readyInMinutes} minutes</h3>
            <input 
              type="range" 
              min="15" 
              max="120" 
              step="5" 
              value={filters.readyInMinutes} 
              onChange={handleTimeChange}
              className="w-full h-2 bg-orange-200 rounded-full appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15m</span>
              <span>60m</span>
              <span>120m</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Must Include Ingredients</h3>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={includeInput}
                  onChange={(e) => setIncludeInput(e.target.value)}
                  placeholder="Add ingredient"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient('include')}
                />
                <button
                  onClick={() => handleAddIngredient('include')}
                  className="px-3 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.includeIngredients.map(ingredient => (
                  <span 
                    key={ingredient}
                    className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    {ingredient}
                    <button
                      onClick={() => handleRemoveIngredient('include', ingredient)}
                      className="ml-1 text-orange-600 hover:text-orange-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Exclude Ingredients</h3>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={excludeInput}
                  onChange={(e) => setExcludeInput(e.target.value)}
                  placeholder="Add ingredient to exclude"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient('exclude')}
                />
                <button
                  onClick={() => handleAddIngredient('exclude')}
                  className="px-3 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.excludeIngredients.map(ingredient => (
                  <span 
                    key={ingredient}
                    className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                  >
                    {ingredient}
                    <button
                      onClick={() => handleRemoveIngredient('exclude', ingredient)}
                      className="ml-1 text-red-600 hover:text-red-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleApplyFilters}
          className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;