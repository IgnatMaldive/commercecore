import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsBar = () => {
  const trustMetrics = [
    {
      icon: "Shield",
      label: "99.9% Uptime",
      description: "Reliable Service"
    },
    {
      icon: "Users",
      label: "50k+ Customers",
      description: "Happy Shoppers"
    },
    {
      icon: "Award",
      label: "A+ Rating",
      description: "BBB Certified"
    },
    {
      icon: "Lock",
      label: "SSL Secured",
      description: "256-bit Encryption"
    }
  ];

  const paymentMethods = [
    {
      name: "Visa",
      icon: "CreditCard"
    },
    {
      name: "Mastercard",
      icon: "CreditCard"
    },
    {
      name: "PayPal",
      icon: "Wallet"
    },
    {
      name: "Apple Pay",
      icon: "Smartphone"
    },
    {
      name: "Google Pay",
      icon: "Smartphone"
    }
  ];

  return (
    <section className="bg-surface border-y border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {trustMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name={metric.icon} size={24} color="var(--color-success)" />
                </div>
              </div>
              <div className="font-semibold text-foreground text-lg">{metric.label}</div>
              <div className="text-sm text-text-secondary">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Payment Methods & Security */}
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
          {/* Payment Methods */}
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-text-secondary">Accepted Payments:</span>
            <div className="flex items-center space-x-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:border-primary commerce-transition"
                  title={method.name}
                >
                  <Icon name={method.icon} size={20} color="var(--color-text-secondary)" />
                </div>
              ))}
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">Stripe Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">Verified Secure</span>
            </div>
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Icon name="Truck" size={24} color="var(--color-primary)" />
              <div className="text-left">
                <div className="font-medium text-foreground">Free Shipping</div>
                <div className="text-sm text-text-secondary">On orders over $50</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <Icon name="RotateCcw" size={24} color="var(--color-primary)" />
              <div className="text-left">
                <div className="font-medium text-foreground">30-Day Returns</div>
                <div className="text-sm text-text-secondary">Hassle-free policy</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <Icon name="Headphones" size={24} color="var(--color-primary)" />
              <div className="text-left">
                <div className="font-medium text-foreground">24/7 Support</div>
                <div className="text-sm text-text-secondary">Always here to help</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsBar;