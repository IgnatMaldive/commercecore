import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Icon from '../AppIcon';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { signIn, authError, clearError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (authError) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const result = await signIn(formData.email, formData.password);
    setIsLoading(false);

    if (result?.success) {
      navigate('/user-account-dashboard');
    }
  };

  const handleDemoLogin = async (userType) => {
    const demoCredentials = {
      admin: { email: 'admin@commercecore.com', password: 'admin123' },
      customer: { email: 'customer@example.com', password: 'customer123' },
      manager: { email: 'manager@commercecore.com', password: 'manager123' }
    };

    const credentials = demoCredentials[userType];
    if (credentials) {
      setFormData(credentials);
      setIsLoading(true);
      const result = await signIn(credentials.email, credentials.password);
      setIsLoading(false);

      if (result?.success) {
        navigate('/user-account-dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">CommerceCore</h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Sign in to your account to continue shopping
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
            />
          </div>

          {authError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <div className="flex items-center gap-2">
                <Icon name="AlertCircle" size={16} color="var(--color-destructive)" />
                <p className="text-sm text-destructive">{authError}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 commerce-transition"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            loading={isLoading}
            className="w-full"
          >
            Sign in
          </Button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-text-secondary">Or try demo accounts</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDemoLogin('customer')}
                className="w-full"
                iconName="User"
                iconPosition="left"
              >
                Demo Customer
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDemoLogin('admin')}
                className="w-full"
                iconName="Shield"
                iconPosition="left"
              >
                Demo Admin
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-primary/80 commerce-transition"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;