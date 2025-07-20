import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-card rounded-lg p-6 commerce-shadow-card">
      <h3 className="font-value-prop text-lg text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Filter" size={20} />
        <span>Categories</span>
      </h3>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left commerce-transition ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={category.icon} size={18} />
              <span className="font-medium">{category.name}</span>
            </div>
            <span className={`text-sm px-2 py-1 rounded-full ${
              activeCategory === category.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-text-secondary'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;