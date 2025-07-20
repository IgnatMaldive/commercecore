import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: "Browse Products",
      description: "Discover new items",
      icon: "Package",
      color: "bg-blue-50 text-blue-600",
      onClick: () => navigate('/product-catalog')
    },
    {
      id: 2,
      title: "Track Orders",
      description: "Check delivery status",
      icon: "Truck",
      color: "bg-green-50 text-green-600",
      onClick: () => console.log('Track orders')
    },
    {
      id: 3,
      title: "View Wishlist",
      description: "Saved items",
      icon: "Heart",
      color: "bg-red-50 text-red-600",
      onClick: () => console.log('View wishlist')
    },
    {
      id: 4,
      title: "Customer Support",
      description: "Get help",
      icon: "Headphones",
      color: "bg-purple-50 text-purple-600",
      onClick: () => console.log('Customer support')
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 commerce-shadow-card">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            className="h-auto p-4 flex-col space-y-2 hover:bg-muted commerce-transition"
            onClick={action.onClick}
          >
            <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center`}>
              <Icon name={action.icon} size={24} />
            </div>
            <div className="text-center">
              <div className="font-medium text-sm">{action.title}</div>
              <div className="text-xs text-text-secondary">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;