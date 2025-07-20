import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountNavigation = ({ activeSection, onSectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Order History', icon: 'Package' },
    { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
    { id: 'payments', label: 'Payment Methods', icon: 'CreditCard' },
    { id: 'profile', label: 'Profile Settings', icon: 'User' },
    { id: 'loyalty', label: 'Loyalty Program', icon: 'Crown' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  const handleSectionChange = (sectionId) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          fullWidth
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="justify-between"
        >
          <span className="flex items-center space-x-2">
            <Icon name={navigationItems.find(item => item.id === activeSection)?.icon || 'Menu'} size={16} />
            <span>{navigationItems.find(item => item.id === activeSection)?.label || 'Menu'}</span>
          </span>
          <Icon name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>

        {isMobileMenuOpen && (
          <div className="mt-2 bg-card border border-border rounded-lg commerce-shadow-card">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start rounded-none first:rounded-t-lg last:rounded-b-lg ${
                  activeSection === item.id ? 'bg-primary/10 text-primary' : ''
                }`}
                onClick={() => handleSectionChange(item.id)}
              >
                <Icon name={item.icon} size={16} className="mr-3" />
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block bg-card rounded-lg p-4 commerce-shadow-card">
        <h3 className="font-semibold text-foreground mb-4">Account Menu</h3>
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start ${
                activeSection === item.id 
                  ? 'bg-primary/10 text-primary hover:bg-primary/15' :'hover:bg-muted'
              }`}
              onClick={() => handleSectionChange(item.id)}
            >
              <Icon name={item.icon} size={16} className="mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-error hover:bg-error/10"
            onClick={() => console.log('Sign out')}
          >
            <Icon name="LogOut" size={16} className="mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountNavigation;