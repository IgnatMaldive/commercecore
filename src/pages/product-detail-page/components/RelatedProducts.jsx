import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        color={index < Math.floor(rating) ? "var(--color-accent)" : "var(--color-border)"}
        className={index < Math.floor(rating) ? "fill-current" : ""}
      />
    ));
  };

  return (
    <div className="bg-background">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline text-foreground">You might also like</h2>
        <Link 
          to="/product-catalog"
          className="text-primary hover:text-primary/80 font-medium text-sm commerce-transition"
        >
          View all products
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="bg-card border border-border rounded-lg overflow-hidden commerce-shadow-card hover:commerce-shadow-hover commerce-transition">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 commerce-transition"
                />
                
                {/* Quick Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 commerce-transition">
                  <div className="flex flex-col space-y-2">
                    <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background commerce-transition">
                      <Icon name="Heart" size={16} />
                    </button>
                    <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background commerce-transition">
                      <Icon name="Eye" size={16} />
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {product.isNew && (
                    <span className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
                      New
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-error text-error-foreground px-2 py-1 rounded text-xs font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary commerce-transition">
                    <Link to={`/product-detail-page?id=${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">{product.category}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-text-secondary">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-foreground">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-text-secondary line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="text-xs text-warning font-medium">
                      Only {product.stock} left
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="ShoppingCart"
                  iconPosition="left"
                  disabled={product.stock === 0}
                  onClick={() => console.log('Added to cart:', product.id)}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;