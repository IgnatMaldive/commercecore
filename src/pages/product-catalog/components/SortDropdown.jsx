import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest Arrivals', icon: 'Clock' },
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'name-az', label: 'Name: A to Z', icon: 'ArrowUp' },
    { value: 'name-za', label: 'Name: Z to A', icon: 'ArrowDown' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.label : 'Sort by';
  };

  const getCurrentSortIcon = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.icon : 'ArrowUpDown';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-48"
        iconName={getCurrentSortIcon()}
        iconPosition="left"
        iconSize={16}
      >
        <span className="hidden sm:inline">{getCurrentSortLabel()}</span>
        <span className="sm:hidden">Sort</span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="ml-auto"
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-lg commerce-shadow-modal z-50 overflow-hidden">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-border">
              <h4 className="text-sm font-medium text-foreground">Sort Products</h4>
            </div>
            
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted commerce-transition ${
                  currentSort === option.value 
                    ? 'bg-primary/10 text-primary' :'text-foreground'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={currentSort === option.value ? 'text-primary' : 'text-text-secondary'}
                />
                <span className="text-sm">{option.label}</span>
                {currentSort === option.value && (
                  <Icon name="Check" size={16} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;