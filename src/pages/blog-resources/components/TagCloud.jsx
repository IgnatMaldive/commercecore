import React from 'react';

const TagCloud = ({ tags, activeTags, onTagToggle }) => {
  return (
    <div className="bg-card rounded-lg p-6 commerce-shadow-card">
      <h3 className="font-value-prop text-lg text-foreground mb-4">Popular Tags</h3>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagToggle(tag.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium commerce-transition ${
              activeTags.includes(tag.id)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            #{tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;