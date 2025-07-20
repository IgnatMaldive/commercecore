import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  shipping, 
  tax, 
  discount, 
  total, 
  onApplyPromoCode,
  isSticky = false 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    setIsApplyingPromo(true);
    setPromoError('');
    
    try {
      const result = await onApplyPromoCode(promoCode);
      if (!result.success) {
        setPromoError(result.error || 'Invalid promo code');
      } else {
        setPromoCode('');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    }
    
    setIsApplyingPromo(false);
  };

  const summaryItems = [
    { label: 'Subtotal', value: subtotal, type: 'normal' },
    { label: 'Shipping', value: shipping, type: 'normal' },
    { label: 'Tax', value: tax, type: 'normal' },
    ...(discount > 0 ? [{ label: 'Discount', value: -discount, type: 'discount' }] : []),
    { label: 'Total', value: total, type: 'total' }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-6 commerce-shadow-card ${
      isSticky ? 'sticky top-24' : ''
    }`}>
      <h3 className="font-value-prop text-lg text-foreground mb-4">
        Order Summary
      </h3>

      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              error={promoError}
              className="mb-0"
            />
          </div>
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            disabled={!promoCode.trim() || isApplyingPromo}
            loading={isApplyingPromo}
          >
            Apply
          </Button>
        </div>
        {promoError && (
          <p className="text-sm text-destructive mt-1">{promoError}</p>
        )}
      </div>

      {/* Summary Items */}
      <div className="space-y-3">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              item.type === 'total' ?'pt-3 border-t border-border font-value-prop text-lg' :'text-sm'
            }`}
          >
            <span className={
              item.type === 'total' ?'text-foreground' 
                : item.type === 'discount' ?'text-success' :'text-text-secondary'
            }>
              {item.label}
            </span>
            <span className={
              item.type === 'total' ?'text-foreground' 
                : item.type === 'discount' ?'text-success' :'text-foreground'
            }>
              {item.type === 'discount' ? '-' : ''}${Math.abs(item.value).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Trust Signals */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span>Secure SSL Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Icon name="RotateCcw" size={16} color="var(--color-success)" />
            <span>30-Day Return Policy</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Icon name="Truck" size={16} color="var(--color-success)" />
            <span>Free Shipping on $50+</span>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="mt-4 p-3 bg-surface rounded-md">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="Calendar" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">
            Estimated Delivery
          </span>
        </div>
        <p className="text-sm text-text-secondary">
          July 23-25, 2025 (3-5 business days)
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;