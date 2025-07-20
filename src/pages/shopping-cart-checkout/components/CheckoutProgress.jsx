import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep, onStepClick }) => {
  const steps = [
    { id: 1, name: 'Cart', icon: 'ShoppingCart' },
    { id: 2, name: 'Shipping', icon: 'Truck' },
    { id: 3, name: 'Payment', icon: 'CreditCard' },
    { id: 4, name: 'Review', icon: 'CheckCircle' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'current':
        return 'bg-primary text-primary-foreground';
      case 'upcoming':
        return 'bg-muted text-text-secondary';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isClickable = step.id <= currentStep;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center commerce-transition
                    ${getStepClasses(status)}
                    ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}
                  `}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <Icon name={step.icon} size={20} />
                  )}
                </button>
                
                {/* Step Label */}
                <span className={`
                  mt-2 text-xs font-medium
                  ${status === 'current' ? 'text-primary' : 'text-text-secondary'}
                `}>
                  {step.name}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`
                    h-0.5 commerce-transition
                    ${getConnectorClasses(step.id)}
                  `} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutProgress;