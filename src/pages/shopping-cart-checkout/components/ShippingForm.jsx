import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const ShippingForm = ({ onSubmit, initialData = {}, isLoading = false }) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    address: initialData.address || '',
    apartment: initialData.apartment || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zipCode: initialData.zipCode || '',
    country: initialData.country || 'US',
    saveAddress: initialData.saveAddress || false,
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' }
  ];

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          required
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={errors.firstName}
          placeholder="Enter first name"
        />
        <Input
          label="Last Name"
          type="text"
          required
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          error={errors.lastName}
          placeholder="Enter last name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          placeholder="Enter email address"
        />
        <Input
          label="Phone Number"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="Enter phone number"
        />
      </div>

      <Input
        label="Street Address"
        type="text"
        required
        value={formData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        error={errors.address}
        placeholder="Enter street address"
      />

      <Input
        label="Apartment, suite, etc. (optional)"
        type="text"
        value={formData.apartment}
        onChange={(e) => handleInputChange('apartment', e.target.value)}
        placeholder="Apartment, suite, unit, etc."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          type="text"
          required
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          error={errors.city}
          placeholder="Enter city"
        />
        <Select
          label="State"
          required
          options={stateOptions}
          value={formData.state}
          onChange={(value) => handleInputChange('state', value)}
          error={errors.state}
          placeholder="Select state"
        />
        <Input
          label="ZIP Code"
          type="text"
          required
          value={formData.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          error={errors.zipCode}
          placeholder="Enter ZIP code"
        />
      </div>

      <Select
        label="Country"
        required
        options={countryOptions}
        value={formData.country}
        onChange={(value) => handleInputChange('country', value)}
        error={errors.country}
        placeholder="Select country"
      />

      <Checkbox
        label="Save this address for future orders"
        checked={formData.saveAddress}
        onChange={(e) => handleInputChange('saveAddress', e.target.checked)}
      />

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          loading={isLoading}
          className="flex-1"
        >
          Continue to Payment
        </Button>
      </div>
    </form>
  );
};

export default ShippingForm;