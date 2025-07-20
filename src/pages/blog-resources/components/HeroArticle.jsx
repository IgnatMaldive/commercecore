import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroArticle = ({ article }) => {
  return (
    <div className="relative bg-card rounded-xl overflow-hidden commerce-shadow-card">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative h-64 lg:h-96 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover commerce-transition hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-foreground">{article.author.name}</span>
            </div>
            <span className="text-sm text-text-secondary">{article.readTime}</span>
          </div>

          <h1 className="font-headline text-2xl lg:text-3xl text-foreground mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-text-secondary mb-6 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <Link
              to={`/blog-resources/article/${article.slug}`}
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium commerce-transition"
            >
              <span>Read Full Article</span>
              <Icon name="ArrowRight" size={16} />
            </Link>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1 text-text-secondary hover:text-foreground commerce-transition">
                <Icon name="Heart" size={16} />
                <span className="text-sm">{article.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-text-secondary hover:text-foreground commerce-transition">
                <Icon name="MessageCircle" size={16} />
                <span className="text-sm">{article.comments}</span>
              </button>
              <button className="flex items-center space-x-1 text-text-secondary hover:text-foreground commerce-transition">
                <Icon name="Share2" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroArticle;