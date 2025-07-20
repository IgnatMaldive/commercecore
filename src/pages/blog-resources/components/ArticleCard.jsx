import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ArticleCard = ({ article, variant = 'default' }) => {
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={`bg-card rounded-lg overflow-hidden commerce-shadow-card hover:commerce-shadow-hover commerce-transition group ${
      isHorizontal ? 'flex' : ''
    }`}>
      {/* Image */}
      <div className={`relative overflow-hidden ${
        isHorizontal ? 'w-48 flex-shrink-0' : 'h-48'
      }`}>
        <Image
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 commerce-transition"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-2">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-foreground">{article.author.name}</span>
          </div>
          <span className="text-xs text-text-secondary">{article.readTime}</span>
        </div>

        <h3 className="font-value-prop text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary commerce-transition">
          <Link to={`/blog-resources/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Calendar" size={14} />
            <span className="text-xs">{article.publishDate}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 text-text-secondary hover:text-foreground commerce-transition">
              <Icon name="Heart" size={14} />
              <span className="text-xs">{article.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-text-secondary hover:text-foreground commerce-transition">
              <Icon name="MessageCircle" size={14} />
              <span className="text-xs">{article.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;