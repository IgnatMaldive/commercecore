import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import CheckoutProgress from './components/CheckoutProgress';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import EmptyCart from './components/EmptyCart';

const ShoppingCartCheckout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0
  });

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones - Premium Sound Quality",
      brand: "AudioTech",
      variant: "Black, Over-Ear",
      price: 79.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      inStock: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch with Heart Rate Monitor",
      brand: "FitTrack",
      variant: "Silver, 42mm",
      price: 199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      inStock: true
    },
    {
      id: 3,
      name: "Portable Wireless Phone Charger",
      brand: "PowerCore",
      variant: "10000mAh, White",
      price: 29.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1609592806596-b43bada2f4b8?w=400&h=400&fit=crop",
      inStock: false
    }
  ];

  // Initialize cart items
  useEffect(() => {
    setCartItems(mockCartItems);
  }, []);

  // Calculate order summary
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const discount = 0; // Will be updated when promo codes are applied
    const total = subtotal + shipping + tax - discount;

    setOrderSummary({
      subtotal,
      shipping,
      tax,
      discount,
      total
    });
  }, [cartItems]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    setIsLoading(false);
  };

  const handleRemoveItem = async (itemId) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setIsLoading(false);
  };

  const handleSaveForLater = async (itemId) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      setSavedItems(prev => [...prev, item]);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    }
    setIsLoading(false);
  };

  const handleApplyPromoCode = async (code) => {
    // Mock promo code validation
    const validCodes = {
      'SAVE10': { discount: 10, type: 'percentage' },
      'FREESHIP': { discount: 9.99, type: 'fixed' },
      'WELCOME20': { discount: 20, type: 'percentage' }
    };

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (validCodes[code.toUpperCase()]) {
      const promoData = validCodes[code.toUpperCase()];
      let discountAmount = 0;
      
      if (promoData.type === 'percentage') {
        discountAmount = orderSummary.subtotal * (promoData.discount / 100);
      } else {
        discountAmount = promoData.discount;
      }

      setOrderSummary(prev => ({
        ...prev,
        discount: discountAmount,
        total: prev.subtotal + prev.shipping + prev.tax - discountAmount
      }));

      return { success: true };
    } else {
      return { success: false, error: 'Invalid promo code' };
    }
  };

  const handleShippingSubmit = async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShippingInfo(data);
    setCurrentStep(3);
    setIsLoading(false);
  };

  const handlePaymentSubmit = async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPaymentInfo(data);
    setCurrentStep(4);
    setIsLoading(false);
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate order placement
    alert(`Order placed successfully! Order ID: #CO${Date.now()}`);
    setCartItems([]);
    setCurrentStep(1);
    setIsLoading(false);
  };

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
  };

  // If cart is empty and we're on step 1, show empty cart
  if (cartItems.length === 0 && currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <EmptyCart />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
            <Link to="/homepage" className="hover:text-primary commerce-transition">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Shopping Cart & Checkout</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-headline text-3xl text-foreground mb-2">
              {currentStep === 1 && 'Shopping Cart'}
              {currentStep === 2 && 'Shipping Information'}
              {currentStep === 3 && 'Payment Method'}
              {currentStep === 4 && 'Review Order'}
            </h1>
            <p className="text-text-secondary">
              {currentStep === 1 && 'Review your items and proceed to checkout'}
              {currentStep === 2 && 'Enter your shipping details'}
              {currentStep === 3 && 'Choose your payment method'}
              {currentStep === 4 && 'Review and confirm your order'}
            </p>
          </div>

          {/* Progress Indicator */}
          <CheckoutProgress 
            currentStep={currentStep} 
            onStepClick={handleStepClick}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Cart Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                        onSaveForLater={handleSaveForLater}
                      />
                    ))}
                  </div>

                  {/* Saved for Later */}
                  {savedItems.length > 0 && (
                    <div className="pt-6 border-t border-border">
                      <h3 className="font-value-prop text-lg text-foreground mb-4">
                        Saved for Later ({savedItems.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedItems.map((item) => (
                          <div key={item.id} className="bg-card border border-border rounded-lg p-4">
                            <div className="aspect-square rounded-md overflow-hidden mb-3 bg-surface">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-2">
                              {item.name}
                            </h4>
                            <p className="text-sm text-text-secondary mb-3">
                              ${item.price}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                setSavedItems(prev => prev.filter(i => i.id !== item.id));
                                setCartItems(prev => [...prev, item]);
                              }}
                            >
                              Move to Cart
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Continue Shopping & Checkout */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      variant="outline"
                      asChild
                      iconName="ArrowLeft"
                      iconPosition="left"
                    >
                      <Link to="/product-catalog">
                        Continue Shopping
                      </Link>
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <ShippingForm
                    onSubmit={handleShippingSubmit}
                    initialData={shippingInfo}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <PaymentForm
                    onSubmit={handlePaymentSubmit}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <OrderReview
                    cartItems={cartItems}
                    shippingInfo={shippingInfo}
                    paymentInfo={paymentInfo}
                    orderSummary={orderSummary}
                    onPlaceOrder={handlePlaceOrder}
                    onEditStep={handleEditStep}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={orderSummary.subtotal}
                shipping={orderSummary.shipping}
                tax={orderSummary.tax}
                discount={orderSummary.discount}
                total={orderSummary.total}
                onApplyPromoCode={handleApplyPromoCode}
                isSticky={true}
              />
            </div>
          </div>

          {/* Trust Signals Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} color="var(--color-success)" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Secure Checkout</h4>
                  <p className="text-sm text-text-secondary">SSL encrypted payment</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Truck" size={24} color="var(--color-success)" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Free Shipping</h4>
                  <p className="text-sm text-text-secondary">On orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="RotateCcw" size={24} color="var(--color-success)" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Easy Returns</h4>
                  <p className="text-sm text-text-secondary">30-day return policy</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Headphones" size={24} color="var(--color-success)" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">24/7 Support</h4>
                  <p className="text-sm text-text-secondary">Customer service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingCartCheckout;