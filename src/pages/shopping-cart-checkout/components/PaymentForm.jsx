import React, { useState } from 'react';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ onSubmit, isLoading = false }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddressSame: true,
    billingAddress: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'Smartphone' },
    { id: 'google', name: 'Google Pay', icon: 'Smartphone' }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCardForm = () => {
    const newErrors = {};
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    if (!formData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format';
    }
    
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'card' && !validateCardForm()) {
      return;
    }
    
    onSubmit({ method: paymentMethod, data: formData });
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="font-value-prop text-lg text-foreground mb-4">
          Payment Method
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`
                p-4 border rounded-lg flex items-center gap-3 commerce-transition
                ${paymentMethod === method.id 
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                }
              `}
            >
              <Icon name={method.icon} size={20} />
              <span className="font-medium">{method.name}</span>
              {paymentMethod === method.id && (
                <Icon name="Check" size={16} className="ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {paymentMethod === 'card' && (
          <>
            <Input
              label="Cardholder Name"
              type="text"
              required
              value={formData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              error={errors.cardholderName}
              placeholder="Enter cardholder name"
            />

            <Input
              label="Card Number"
              type="text"
              required
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              error={errors.cardNumber}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                type="text"
                required
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                error={errors.expiryDate}
                placeholder="MM/YY"
                maxLength={5}
              />
              <Input
                label="CVV"
                type="text"
                required
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                error={errors.cvv}
                placeholder="123"
                maxLength={4}
              />
            </div>

            <Checkbox
              label="Billing address is the same as shipping address"
              checked={formData.billingAddressSame}
              onChange={(e) => handleInputChange('billingAddressSame', e.target.checked)}
            />

            {!formData.billingAddressSame && (
              <div className="space-y-4 p-4 border border-border rounded-lg bg-surface">
                <h4 className="font-medium text-foreground">Billing Address</h4>
                <Input
                  label="Address"
                  type="text"
                  required
                  value={formData.billingAddress.address}
                  onChange={(e) => handleInputChange('billingAddress.address', e.target.value)}
                  placeholder="Enter billing address"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    type="text"
                    required
                    value={formData.billingAddress.city}
                    onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                    placeholder="Enter city"
                  />
                  <Input
                    label="State"
                    type="text"
                    required
                    value={formData.billingAddress.state}
                    onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
                    placeholder="Enter state"
                  />
                  <Input
                    label="ZIP Code"
                    type="text"
                    required
                    value={formData.billingAddress.zipCode}
                    onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value)}
                    placeholder="Enter ZIP"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {paymentMethod === 'paypal' && (
          <div className="p-6 border border-border rounded-lg bg-surface text-center">
            <Icon name="Wallet" size={48} className="mx-auto mb-4 text-primary" />
            <h4 className="font-value-prop text-lg text-foreground mb-2">
              PayPal Checkout
            </h4>
            <p className="text-text-secondary mb-4">
              You'll be redirected to PayPal to complete your payment securely.
            </p>
          </div>
        )}

        {(paymentMethod === 'apple' || paymentMethod === 'google') && (
          <div className="p-6 border border-border rounded-lg bg-surface text-center">
            <Icon name="Smartphone" size={48} className="mx-auto mb-4 text-primary" />
            <h4 className="font-value-prop text-lg text-foreground mb-2">
              {paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'}
            </h4>
            <p className="text-text-secondary mb-4">
              Use your {paymentMethod === 'apple' ? 'Touch ID, Face ID, or passcode' : 'fingerprint or PIN'} to pay securely.
            </p>
          </div>
        )}

        {/* Security Notice */}
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Shield" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-success mb-1">Secure Payment</h4>
              <p className="text-sm text-success/80">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            loading={isLoading}
            className="flex-1"
          >
            {paymentMethod === 'card' ? 'Complete Order' : `Pay with ${paymentMethods.find(m => m.id === paymentMethod)?.name}`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;