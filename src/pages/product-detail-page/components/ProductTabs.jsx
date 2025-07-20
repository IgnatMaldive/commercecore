import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="prose max-w-none">
            <p className="text-foreground leading-relaxed mb-4">
              {product.description}
            </p>
            <h4 className="font-medium text-foreground mb-2">Key Features:</h4>
            <ul className="space-y-2">
              {product.features?.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-4">
            {product.specifications?.map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-border last:border-b-0">
                <span className="font-medium text-foreground">{spec.label}</span>
                <span className="text-text-secondary">{spec.value}</span>
              </div>
            ))}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-surface rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-3xl font-bold text-foreground">{product.rating}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Icon
                          key={index}
                          name="Star"
                          size={20}
                          color={index < Math.floor(product.rating) ? "var(--color-accent)" : "var(--color-border)"}
                          className={index < Math.floor(product.rating) ? "fill-current" : ""}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-text-secondary">Based on {product.reviewCount} reviews</p>
                </div>
              </div>
              
              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-3">
                    <span className="text-sm text-text-secondary w-8">{stars}★</span>
                    <div className="flex-1 bg-border rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${(product.ratingBreakdown?.[stars] || 0)}%` }}
                      />
                    </div>
                    <span className="text-sm text-text-secondary w-8">
                      {product.ratingBreakdown?.[stars] || 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {product.reviews?.map((review, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-medium">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{review.author}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, starIndex) => (
                              <Icon
                                key={starIndex}
                                name="Star"
                                size={14}
                                color={starIndex < review.rating ? "var(--color-accent)" : "var(--color-border)"}
                                className={starIndex < review.rating ? "fill-current" : ""}
                              />
                            ))}
                          </div>
                          {review.verified && (
                            <span className="text-xs bg-success text-success-foreground px-2 py-0.5 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary">{review.date}</span>
                  </div>
                  <p className="text-text-secondary mb-3">{review.comment}</p>
                  {review.helpful && (
                    <div className="flex items-center space-x-4 text-sm">
                      <button className="flex items-center space-x-1 text-text-secondary hover:text-foreground commerce-transition">
                        <Icon name="ThumbsUp" size={14} />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Shipping Options</h4>
                {product.shippingOptions?.map((option, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{option.name}</p>
                      <p className="text-sm text-text-secondary">{option.description}</p>
                    </div>
                    <span className="font-medium text-foreground">{option.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Return Policy</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="RotateCcw" size={16} color="var(--color-success)" className="mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">30-Day Returns</p>
                      <p className="text-sm text-text-secondary">Free returns within 30 days of purchase</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={16} color="var(--color-success)" className="mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Buyer Protection</p>
                      <p className="text-sm text-text-secondary">Full refund if item not as described</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Package" size={16} color="var(--color-success)" className="mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Original Packaging</p>
                      <p className="text-sm text-text-secondary">Items must be returned in original condition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm commerce-transition ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
              {tab.id === 'reviews' && (
                <span className="bg-muted text-text-secondary px-2 py-0.5 rounded-full text-xs">
                  {product.reviewCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;