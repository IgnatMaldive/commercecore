import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose, resultCount }) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    rating: true,
    availability: true,
    category: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (range) => {
    onFilterChange('priceRange', range);
  };

  const handleBrandChange = (brand, checked) => {
    const currentBrands = filters.brands || [];
    const updatedBrands = checked 
      ? [...currentBrands, brand]
      : currentBrands.filter(b => b !== brand);
    onFilterChange('brands', updatedBrands);
  };

  const handleRatingChange = (rating) => {
    onFilterChange('minRating', rating);
  };

  const handleAvailabilityChange = (availability, checked) => {
    const currentAvailability = filters.availability || [];
    const updatedAvailability = checked
      ? [...currentAvailability, availability]
      : currentAvailability.filter(a => a !== availability);
    onFilterChange('availability', updatedAvailability);
  };

  const clearAllFilters = () => {
    onFilterChange('clear', null);
  };

  const priceRanges = [
    { label: 'Under $25', value: '0-25', count: 156 },
    { label: '$25 - $50', value: '25-50', count: 234 },
    { label: '$50 - $100', value: '50-100', count: 189 },
    { label: '$100 - $200', value: '100-200', count: 145 },
    { label: 'Over $200', value: '200+', count: 78 }
  ];

  const brands = [
    { name: 'TechPro', count: 45 },
    { name: 'InnovateCorp', count: 38 },
    { name: 'QualityFirst', count: 32 },
    { name: 'ModernDesign', count: 28 },
    { name: 'PremiumBrand', count: 24 },
    { name: 'SmartTech', count: 19 }
  ];

  const ratings = [
    { stars: 4, label: '4 Stars & Up', count: 312 },
    { stars: 3, label: '3 Stars & Up', count: 456 },
    { stars: 2, label: '2 Stars & Up', count: 523 },
    { stars: 1, label: '1 Star & Up', count: 567 }
  ];

  const availabilityOptions = [
    { label: 'In Stock', value: 'in-stock', count: 489 },
    { label: 'On Sale', value: 'on-sale', count: 123 },
    { label: 'Free Shipping', value: 'free-shipping', count: 345 },
    { label: 'New Arrivals', value: 'new', count: 67 }
  ];

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="font-medium text-foreground">{title}</h3>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary"
        />
      </button>
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-80 lg:w-full bg-background border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <p className="text-sm text-text-secondary">{resultCount} products found</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-text-secondary hover:text-foreground"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Price Range */}
          <FilterSection
            title="Price Range"
            isExpanded={expandedSections.price}
            onToggle={() => toggleSection('price')}
          >
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.priceRange === range.value}
                    onChange={(e) => handlePriceChange(e.target.checked ? range.value : null)}
                  />
                  <span className="text-sm text-foreground">{range.label}</span>
                </div>
                <span className="text-xs text-text-secondary">({range.count})</span>
              </label>
            ))}
          </FilterSection>

          {/* Brands */}
          <FilterSection
            title="Brand"
            isExpanded={expandedSections.brand}
            onToggle={() => toggleSection('brand')}
          >
            {brands.map((brand) => (
              <label key={brand.name} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.brands?.includes(brand.name) || false}
                    onChange={(e) => handleBrandChange(brand.name, e.target.checked)}
                  />
                  <span className="text-sm text-foreground">{brand.name}</span>
                </div>
                <span className="text-xs text-text-secondary">({brand.count})</span>
              </label>
            ))}
          </FilterSection>

          {/* Rating */}
          <FilterSection
            title="Customer Rating"
            isExpanded={expandedSections.rating}
            onToggle={() => toggleSection('rating')}
          >
            {ratings.map((rating) => (
              <label key={rating.stars} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.minRating === rating.stars}
                    onChange={(e) => handleRatingChange(e.target.checked ? rating.stars : null)}
                  />
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < rating.stars ? "text-accent fill-current" : "text-border"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-foreground">{rating.label}</span>
                  </div>
                </div>
                <span className="text-xs text-text-secondary">({rating.count})</span>
              </label>
            ))}
          </FilterSection>

          {/* Availability */}
          <FilterSection
            title="Availability"
            isExpanded={expandedSections.availability}
            onToggle={() => toggleSection('availability')}
          >
            {availabilityOptions.map((option) => (
              <label key={option.value} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.availability?.includes(option.value) || false}
                    onChange={(e) => handleAvailabilityChange(option.value, e.target.checked)}
                  />
                  <span className="text-sm text-foreground">{option.label}</span>
                </div>
                <span className="text-xs text-text-secondary">({option.count})</span>
              </label>
            ))}
          </FilterSection>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;