import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, searchQuery, onFilterToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'wireless headphones',
    'laptop stand',
    'smartphone case',
    'bluetooth speaker'
  ]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const popularSuggestions = [
    { query: 'wireless headphones', category: 'Electronics', count: '2.3k products' },
    { query: 'laptop accessories', category: 'Computers', count: '1.8k products' },
    { query: 'smartphone cases', category: 'Mobile', count: '3.1k products' },
    { query: 'bluetooth speakers', category: 'Audio', count: '945 products' },
    { query: 'gaming keyboards', category: 'Gaming', count: '567 products' },
    { query: 'wireless chargers', category: 'Accessories', count: '1.2k products' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearch(value);

    if (value.length > 0) {
      const filtered = popularSuggestions.filter(suggestion =>
        suggestion.query.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
    if (searchQuery.length === 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay to allow suggestion clicks
    setTimeout(() => {
      setIsExpanded(false);
    }, 200);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion.query);
    setShowSuggestions(false);
    
    // Add to recent searches
    const updatedRecent = [suggestion.query, ...recentSearches.filter(s => s !== suggestion.query)].slice(0, 4);
    setRecentSearches(updatedRecent);
  };

  const handleRecentSearchClick = (search) => {
    onSearch(search);
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setShowSuggestions(false);
      if (searchQuery.trim()) {
        const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 4);
        setRecentSearches(updatedRecent);
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>
        
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search products, brands, categories..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-12 h-12 text-base border-2 focus:border-primary"
        />

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={onFilterToggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 lg:hidden"
        >
          <Icon name="SlidersHorizontal" size={20} className="text-text-secondary" />
        </button>

        {/* Clear Search */}
        {searchQuery && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 lg:right-3 top-1/2 transform -translate-y-1/2 hidden lg:block"
          >
            <Icon name="X" size={16} className="text-text-secondary hover:text-foreground" />
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg commerce-shadow-modal z-50 max-h-96 overflow-y-auto"
        >
          {/* Recent Searches */}
          {searchQuery.length === 0 && recentSearches.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">Recent Searches</h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-text-secondary hover:text-foreground"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="flex items-center space-x-3 w-full text-left p-2 rounded hover:bg-muted commerce-transition"
                  >
                    <Icon name="Clock" size={16} className="text-text-secondary" />
                    <span className="text-sm text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          <div className="p-4">
            {searchQuery.length === 0 && (
              <h4 className="text-sm font-medium text-foreground mb-3">Popular Searches</h4>
            )}
            
            <div className="space-y-1">
              {(searchQuery.length > 0 ? suggestions : popularSuggestions).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center justify-between w-full text-left p-3 rounded hover:bg-muted commerce-transition"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Search" size={16} className="text-text-secondary" />
                    <div>
                      <span className="text-sm text-foreground">{suggestion.query}</span>
                      <p className="text-xs text-text-secondary">{suggestion.category}</p>
                    </div>
                  </div>
                  <span className="text-xs text-text-secondary">{suggestion.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* No Results */}
          {searchQuery.length > 0 && suggestions.length === 0 && (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} className="text-text-secondary mx-auto mb-2" />
              <p className="text-sm text-text-secondary">No suggestions found for "{searchQuery}"</p>
              <p className="text-xs text-text-secondary mt-1">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;