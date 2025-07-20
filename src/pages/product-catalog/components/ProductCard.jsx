import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onWishlistToggle, onCompareToggle, isInWishlist, isInComparison }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageHover = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex(1);
      setIsHovered(true);
    }
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
    setIsHovered(false);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle(product.id);
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onCompareToggle(product.id);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick add to cart functionality
    console.log('Quick add to cart:', product.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? "text-accent fill-current" : "text-border"}
      />
    ));
  };

  const currentImage = product.images?.[currentImageIndex] || product.image;

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden commerce-shadow-card hover:commerce-shadow-hover commerce-transition">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Link to={`/product-detail-page?id=${product.id}`}>
          <div
            className="relative w-full h-full"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          >
            <Image
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover commerce-transition group-hover:scale-105"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {product.isNew && (
                <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded">
                  New
                </span>
              )}
              {product.isOnSale && (
                <span className="bg-conversion text-conversion-foreground text-xs font-medium px-2 py-1 rounded">
                  Sale
                </span>
              )}
              {product.discount && (
                <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 commerce-transition">
              <Button
                variant="ghost"
                size="icon"
                className={`bg-background/80 backdrop-blur-sm hover:bg-background ${
                  isInWishlist ? 'text-conversion' : 'text-text-secondary'
                }`}
                onClick={handleWishlistClick}
              >
                <Icon name={isInWishlist ? "Heart" : "Heart"} size={16} className={isInWishlist ? "fill-current" : ""} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className={`bg-background/80 backdrop-blur-sm hover:bg-background ${
                  isInComparison ? 'text-primary' : 'text-text-secondary'
                }`}
                onClick={handleCompareClick}
              >
                <Icon name="BarChart3" size={16} />
              </Button>
            </div>

            {/* Quick Add Button */}
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 commerce-transition">
              <Button
                variant="default"
                size="sm"
                className="w-full"
                onClick={handleQuickAdd}
                iconName="Plus"
                iconPosition="left"
                iconSize={14}
              >
                Quick Add
              </Button>
            </div>
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product-detail-page?id=${product.id}`} className="block">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
              {product.brand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary commerce-transition">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-text-secondary">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-text-secondary line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${
                product.stock > 10 ? 'bg-success' : 
                product.stock > 0 ? 'bg-warning' : 'bg-error'
              }`} />
              <span className="text-xs text-text-secondary">
                {product.stock > 10 ? 'In Stock' : 
                 product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </span>
            </div>
            
            {product.freeShipping && (
              <div className="flex items-center space-x-1">
                <Icon name="Truck" size={12} className="text-success" />
                <span className="text-xs text-success">Free Ship</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;