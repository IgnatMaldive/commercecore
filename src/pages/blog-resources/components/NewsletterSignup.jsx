import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
      <div className="flex items-start space-x-4">
        <div className="bg-primary-foreground/20 p-3 rounded-lg">
          <Icon name="Mail" size={24} color="currentColor" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-value-prop text-xl mb-2">Stay Updated</h3>
          <p className="text-primary-foreground/80 mb-4">
            Get the latest shopping tips, product reviews, and exclusive guides delivered to your inbox.
          </p>

          {isSubscribed ? (
            <div className="flex items-center space-x-2 text-success-foreground bg-success/20 p-3 rounded-lg">
              <Icon name="CheckCircle" size={20} />
              <span>Successfully subscribed! Check your email for confirmation.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-primary-foreground text-foreground"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                className="whitespace-nowrap"
              >
                Subscribe Now
              </Button>
            </form>
          )}

          <p className="text-xs text-primary-foreground/60 mt-2">
            No spam, unsubscribe at any time. Read our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;