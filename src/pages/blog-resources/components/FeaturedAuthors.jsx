import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FeaturedAuthors = ({ authors }) => {
  return (
    <div className="bg-card rounded-lg p-6 commerce-shadow-card">
      <h3 className="font-value-prop text-lg text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Users" size={20} />
        <span>Featured Authors</span>
      </h3>

      <div className="space-y-4">
        {authors.map((author) => (
          <div key={author.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted commerce-transition">
            <Image
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{author.name}</h4>
              <p className="text-sm text-text-secondary">{author.role}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-text-secondary">{author.articleCount} articles</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-accent fill-current" />
                  <span className="text-xs text-text-secondary">{author.rating}</span>
                </div>
              </div>
            </div>

            <Link
              to={`/blog-resources/author/${author.slug}`}
              className="text-primary hover:text-primary/80 commerce-transition"
            >
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAuthors;