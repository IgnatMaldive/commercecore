import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(3);
  const { user, userProfile, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/homepage', icon: 'Home' },
    { name: 'Products', href: '/product-catalog', icon: 'Package' },
    { name: 'Account', href: '/user-account-dashboard', icon: 'User' },
    { name: 'Blog', href: '/blog-resources', icon: 'BookOpen' }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    window.location.href = '/shopping-cart-checkout';
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/homepage" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center commerce-transition group-hover:scale-105">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="font-headline text-xl text-foreground">CommerceCore</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium commerce-transition ${
                  isActivePath(item.href)
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {userProfile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">
                      {userProfile?.full_name || 'Account'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    iconName="LogOut"
                    iconPosition="left"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                  >
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              onClick={() => console.log('Search clicked')}
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleCartClick}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* User Account */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              onClick={() => window.location.href = '/user-account-dashboard'}
            >
              <Icon name="User" size={20} />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium commerce-transition ${
                    isActivePath(item.href)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile-only items */}
              <div className="pt-2 border-t border-border">
                <Link
                  to="/user-account-dashboard"
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-text-secondary hover:text-foreground hover:bg-muted commerce-transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon name="User" size={20} />
                  <span>My Account</span>
                </Link>
                
                <button
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-text-secondary hover:text-foreground hover:bg-muted commerce-transition w-full text-left"
                  onClick={() => {
                    setIsMenuOpen(false);
                    console.log('Search clicked');
                  }}
                >
                  <Icon name="Search" size={20} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        
        <div className={`absolute right-0 top-0 h-full w-80 bg-background border-l border-border transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium commerce-transition ${
                  isActivePath(item.href)
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Auth Section */}
          <div className="px-6 py-4 border-t border-border">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {userProfile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {userProfile?.full_name || 'Account'}
                    </p>
                    <p className="text-sm text-text-secondary">{user?.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full"
                  iconName="LogOut"
                  iconPosition="left"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  variant="outline"
                  asChild
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
      <div className="hidden lg:block bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 py-2">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Truck" size={16} color="var(--color-success)" />
              <span>Free Shipping $50+</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="RotateCcw" size={16} color="var(--color-success)" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Headphones" size={16} color="var(--color-success)" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;