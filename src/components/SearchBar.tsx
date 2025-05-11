import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRecipeContext } from '../context/RecipeContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const COMMON_INGREDIENTS = [
  'chicken', 'beef', 'pasta', 'rice', 'potato', 'tomato', 'onion', 
  'garlic', 'cheese', 'egg', 'milk', 'carrot', 'spinach', 'broccoli'
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchHistory } = useRecipeContext();

  useEffect(() => {
    if (query.length > 1) {
      // Combine search history and common ingredients for suggestions
      const history = searchHistory.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      
      const ingredients = COMMON_INGREDIENTS.filter(ingredient => 
        ingredient.toLowerCase().includes(query.toLowerCase())
      );
      
      setSuggestions([...new Set([...history, ...ingredients])].slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, searchHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
            placeholder="Search recipes by ingredients (e.g., chicken, pasta)"
            className="w-full px-4 py-3 pl-12 pr-10 bg-white border-2 border-orange-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          
          {query && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-gray-700 text-left first:rounded-t-lg last:rounded-b-lg"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;