import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const TrendingTopics = ({ topics }) => {
  return (
    <div className="bg-card rounded-lg p-6 commerce-shadow-card">
      <h3 className="font-value-prop text-lg text-foreground mb-4 flex items-center space-x-2">
        <Icon name="TrendingUp" size={20} />
        <span>Trending Topics</span>
      </h3>

      <div className="space-y-3">
        {topics.map((topic, index) => (
          <Link
            key={topic.id}
            to={`/blog-resources/topic/${topic.slug}`}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted commerce-transition group"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {index + 1}
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-foreground group-hover:text-primary commerce-transition">
                {topic.title}
              </h4>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-text-secondary">{topic.articleCount} articles</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span className="text-xs text-text-secondary">{topic.views}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-success">
              <Icon name="TrendingUp" size={14} />
              <span className="text-xs font-medium">+{topic.growth}%</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;