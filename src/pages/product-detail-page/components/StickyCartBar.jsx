import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyCartBar = ({ product, selectedVariants, quantity, onAddToCart }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show sticky bar when user scrolls past the main product info
      setIsVisible(scrollPosition > windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalPrice = (product.price * quantity).toFixed(2);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border commerce-shadow-modal lg:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Product Summary */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Package" size={20} color="var(--color-text-secondary)" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground truncate text-sm">
                {product.name}
              </p>
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <span>${product.price}</span>
                {selectedVariants?.size && (
                  <>
                    <span>•</span>
                    <span>Size: {selectedVariants.size}</span>
                  </>
                )}
                {selectedVariants?.color && (
                  <>
                    <span>•</span>
                    <span>Color: {selectedVariants.color.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quantity and Price */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-xs text-text-secondary">Qty: {quantity}</p>
              <p className="font-bold text-foreground">${totalPrice}</p>
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="default"
              size="sm"
              onClick={onAddToCart}
              disabled={product.stock === 0}
              iconName="ShoppingCart"
              iconPosition="left"
              className="whitespace-nowrap"
            >
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Stock Warning */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="mt-2 text-center">
            <p className="text-xs text-warning font-medium">
              Only {product.stock} left in stock!
            </p>
          </div>
        )}

        {/* Out of Stock */}
        {product.stock === 0 && (
          <div className="mt-2 text-center">
            <p className="text-xs text-error font-medium">
              Currently out of stock
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyCartBar;