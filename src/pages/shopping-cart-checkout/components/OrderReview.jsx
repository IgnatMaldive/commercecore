import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderReview = ({ 
  cartItems, 
  shippingInfo, 
  paymentInfo, 
  orderSummary, 
  onPlaceOrder, 
  onEditStep,
  isLoading = false 
}) => {
  return (
    <div className="space-y-8">
      {/* Order Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-value-prop text-lg text-foreground">
            Order Items ({cartItems.length})
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(1)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit Cart
          </Button>
        </div>
        
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-surface flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-sm text-text-secondary">
                  {item.brand} • {item.variant}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-text-secondary">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Information */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-value-prop text-lg text-foreground">
            Shipping Information
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(2)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit
          </Button>
        </div>
        
        <div className="p-4 border border-border rounded-lg bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Delivery Address</h4>
              <div className="text-sm text-text-secondary space-y-1">
                <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                <p>{shippingInfo.address}</p>
                {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                <p>{shippingInfo.country}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Contact Information</h4>
              <div className="text-sm text-text-secondary space-y-1">
                <p>{shippingInfo.email}</p>
                <p>{shippingInfo.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Icon name="Truck" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">
                Standard Shipping (3-5 business days)
              </span>
            </div>
            <p className="text-sm text-text-secondary mt-1">
              Estimated delivery: July 23-25, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-value-prop text-lg text-foreground">
            Payment Method
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStep(3)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit
          </Button>
        </div>
        
        <div className="p-4 border border-border rounded-lg bg-surface">
          <div className="flex items-center gap-3">
            <Icon name="CreditCard" size={20} color="var(--color-primary)" />
            <div>
              <p className="font-medium text-foreground">
                {paymentInfo.method === 'card' ? 'Credit Card' : paymentInfo.method}
              </p>
              {paymentInfo.method === 'card' && paymentInfo.data.cardNumber && (
                <p className="text-sm text-text-secondary">
                  •••• •••• •••• {paymentInfo.data.cardNumber.slice(-4)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="font-value-prop text-lg text-foreground mb-4">
          Order Summary
        </h3>
        
        <div className="p-4 border border-border rounded-lg bg-surface">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-foreground">${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-foreground">${orderSummary.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Tax</span>
              <span className="text-foreground">${orderSummary.tax.toFixed(2)}</span>
            </div>
            {orderSummary.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-success">Discount</span>
                <span className="text-success">-${orderSummary.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between">
                <span className="font-value-prop text-lg text-foreground">Total</span>
                <span className="font-value-prop text-lg text-foreground">
                  ${orderSummary.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Place Order */}
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-text-secondary">
            By placing this order, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            You will receive an order confirmation email shortly.
          </p>
        </div>

        <Button
          onClick={onPlaceOrder}
          loading={isLoading}
          size="lg"
          className="w-full"
          iconName="CreditCard"
          iconPosition="left"
        >
          Place Order - ${orderSummary.total.toFixed(2)}
        </Button>

        <div className="flex items-center justify-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="RotateCcw" size={16} color="var(--color-success)" />
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;