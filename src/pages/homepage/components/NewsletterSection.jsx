import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const benefits = [
    {
      icon: "Tag",
      title: "Exclusive Deals",
      description: "Get access to member-only discounts and flash sales"
    },
    {
      icon: "Zap",
      title: "Early Access",
      description: "Be the first to shop new arrivals and limited editions"
    },
    {
      icon: "Gift",
      title: "Special Offers",
      description: "Receive birthday discounts and seasonal promotions"
    },
    {
      icon: "Bell",
      title: "Product Updates",
      description: "Stay informed about restocks and product launches"
    }
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card border border-border rounded-2xl p-8 commerce-shadow-card">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} color="var(--color-success)" />
            </div>
            
            <h3 className="font-headline text-2xl text-foreground mb-4">
              Welcome to the CommerceCore Family!
            </h3>
            
            <p className="text-text-secondary mb-6">
              Thank you for subscribing! Check your email for a special welcome offer. 
              You'll be the first to know about exclusive deals and new arrivals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                onClick={() => window.location.href = '/product-catalog'}
              >
                Start Shopping
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsSubscribed(false)}
              >
                Subscribe Another Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                <Icon name="Mail" size={16} />
                <span>Newsletter</span>
              </div>
              
              <h2 className="font-headline text-3xl sm:text-4xl text-foreground">
                Stay in the Loop with{' '}
                <span className="text-primary">Exclusive Deals</span>
              </h2>
              
              <p className="text-lg text-text-secondary">
                Join over 25,000 subscribers and get early access to sales, 
                new product launches, and member-only discounts delivered straight to your inbox.
              </p>
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  loading={isLoading}
                  disabled={!email}
                  className="sm:w-auto w-full"
                >
                  Subscribe Now
                </Button>
              </div>
              
              <p className="text-sm text-text-secondary">
                By subscribing, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>{' '}
                and consent to receive marketing emails. Unsubscribe anytime.
              </p>
            </form>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">No Spam</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={20} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="X" size={20} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">Unsubscribe Anytime</span>
              </div>
            </div>
          </div>

          {/* Benefits Side */}
          <div className="space-y-6">
            <h3 className="font-semibold text-xl text-foreground mb-6">
              What You'll Get:
            </h3>
            
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-card border border-border rounded-lg commerce-shadow-card hover:commerce-shadow-hover commerce-transition"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={benefit.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="bg-surface border border-border rounded-lg p-6 mt-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center"
                    >
                      <Icon name="User" size={16} color="white" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-medium text-foreground">25,000+ Subscribers</div>
                  <div className="text-sm text-text-secondary">Join our growing community</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="Star" size={16} color="var(--color-accent)" />
                ))}
                <span className="ml-2 text-sm text-text-secondary">
                  4.9/5 newsletter rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;