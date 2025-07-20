import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    await onUpdateQuantity(item.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    await onRemove(item.id);
    setIsUpdating(false);
  };

  const handleSaveForLater = async () => {
    setIsUpdating(true);
    await onSaveForLater(item.id);
    setIsUpdating(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border rounded-lg commerce-shadow-card commerce-transition hover:commerce-shadow-hover">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-surface">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-value-prop text-lg text-foreground line-clamp-2">
              {item.name}
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              {item.brand} • {item.variant}
            </p>
            {item.inStock ? (
              <div className="flex items-center gap-1 mt-2">
                <Icon name="Check" size={16} color="var(--color-success)" />
                <span className="text-sm text-success">In Stock</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-2">
                <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
                <span className="text-sm text-warning">Limited Stock</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="font-value-prop text-xl text-foreground">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="text-sm text-text-secondary">
              ${item.price.toFixed(2)} each
            </div>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">Qty:</span>
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
              >
                <Icon name="Minus" size={16} />
              </Button>
              <span className="px-3 py-1 text-sm font-medium text-foreground min-w-[3rem] text-center">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveForLater}
              disabled={isUpdating}
              iconName="Heart"
              iconPosition="left"
              iconSize={16}
            >
              Save for Later
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isUpdating}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              className="text-destructive hover:text-destructive"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;