import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      product: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
  };

  const handleAddToWishlist = () => {
    console.log('Added to wishlist:', product.id);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < Math.floor(rating) ? "var(--color-accent)" : "var(--color-border)"}
        className={index < Math.floor(rating) ? "fill-current" : ""}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-3xl font-headline text-foreground mb-2">
          {product.name}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-sm font-medium text-foreground ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-text-secondary">
            ({product.reviewCount} reviews)
          </span>
          <span className="text-sm text-text-secondary">
            SKU: {product.sku}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-foreground">
          ${product.price}
        </span>
        {product.originalPrice && (
          <span className="text-xl text-text-secondary line-through">
            ${product.originalPrice}
          </span>
        )}
        {product.discount && (
          <span className="bg-error text-error-foreground px-2 py-1 rounded-md text-sm font-medium">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={product.stock > 0 ? "CheckCircle" : "XCircle"} 
          size={16} 
          color={product.stock > 0 ? "var(--color-success)" : "var(--color-error)"}
        />
        <span className={`text-sm font-medium ${
          product.stock > 0 ? 'text-success' : 'text-error'
        }`}>
          {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
        </span>
      </div>

      {/* Size Selection */}
      {product.sizes && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md text-sm font-medium commerce-transition ${
                  selectedSize === size
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-foreground hover:border-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {product.colors && (
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 commerce-transition ${
                  selectedColor?.name === color.name
                    ? 'border-primary scale-110' :'border-border hover:border-primary'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          {selectedColor && (
            <p className="text-sm text-text-secondary mt-2">
              Selected: {selectedColor.name}
            </p>
          )}
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed commerce-transition"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed commerce-transition"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <span className="text-sm text-text-secondary">
            Max: {product.stock}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </Button>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleAddToWishlist}
            iconName="Heart"
            iconPosition="left"
          >
            Add to Wishlist
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="Share2"
          >
            Share
          </Button>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="border-t border-border pt-6 space-y-3">
        <div className="flex items-center space-x-3 text-sm text-text-secondary">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-text-secondary">
          <Icon name="Truck" size={16} color="var(--color-success)" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-text-secondary">
          <Icon name="RotateCcw" size={16} color="var(--color-success)" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-text-secondary">
          <Icon name="Award" size={16} color="var(--color-success)" />
          <span>2-year warranty included</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;