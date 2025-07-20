import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const suggestedProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      name: "Portable Phone Charger",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1609592806596-b43bada2f4b8?w=300&h=300&fit=crop",
      rating: 4.3
    }
  ];

  return (
    <div className="text-center py-12">
      {/* Empty Cart Icon */}
      <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
        <Icon name="ShoppingCart" size={48} color="var(--color-text-secondary)" />
      </div>

      {/* Empty Cart Message */}
      <h2 className="font-value-prop text-2xl text-foreground mb-2">
        Your cart is empty
      </h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button
          asChild
          size="lg"
          iconName="Package"
          iconPosition="left"
        >
          <Link to="/product-catalog">
            Browse Products
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild
          iconName="Home"
          iconPosition="left"
        >
          <Link to="/homepage">
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Suggested Products */}
      <div className="max-w-4xl mx-auto">
        <h3 className="font-value-prop text-xl text-foreground mb-6">
          You might like these
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg p-4 commerce-shadow-card commerce-transition hover:commerce-shadow-hover"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-surface">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                {product.name}
              </h4>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      color={i < Math.floor(product.rating) ? "var(--color-accent)" : "var(--color-border)"}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  ({product.rating})
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-value-prop text-lg text-foreground">
                  ${product.price}
                </span>
                <Button
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span>Secure Shopping</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Truck" size={16} color="var(--color-success)" />
            <span>Free Shipping $50+</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="RotateCcw" size={16} color="var(--color-success)" />
            <span>Easy Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Headphones" size={16} color="var(--color-success)" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;