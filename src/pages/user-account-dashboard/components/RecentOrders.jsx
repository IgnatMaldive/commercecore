import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentOrders = ({ orders }) => {
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'shipped':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'processing':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-card rounded-lg p-6 commerce-shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('View all orders')}
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-border rounded-lg p-4 hover:border-primary/20 commerce-transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-foreground">
                  Order #{order.orderNumber}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleOrderExpansion(order.id)}
              >
                <Icon name={expandedOrder === order.id ? "ChevronUp" : "ChevronDown"} size={16} />
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
              <span>Ordered on {order.orderDate}</span>
              <span className="font-medium text-foreground">${order.total}</span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              {order.items.slice(0, 3).map((item, index) => (
                <Image
                  key={index}
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover border border-border"
                />
              ))}
              {order.items.length > 3 && (
                <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center text-xs font-medium text-text-secondary">
                  +{order.items.length - 3}
                </div>
              )}
              <div className="text-sm text-text-secondary">
                {order.items.length} item{order.items.length > 1 ? 's' : ''}
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="border-t border-border pt-3 mt-3">
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <span>{item.name}</span>
                        <span className="text-text-secondary">x{item.quantity}</span>
                      </div>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  ))}
                </div>
                
                {order.trackingNumber && (
                  <div className="bg-muted rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Tracking Number</div>
                        <div className="text-sm text-text-secondary">{order.trackingNumber}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Track Package
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="RotateCcw" size={14} className="mr-1" />
                  Reorder
                </Button>
                {order.status === 'Delivered' && (
                  <Button variant="outline" size="sm">
                    <Icon name="Star" size={14} className="mr-1" />
                    Review
                  </Button>
                )}
              </div>
              {order.trackingNumber && (
                <Button variant="ghost" size="sm">
                  <Icon name="ExternalLink" size={14} className="mr-1" />
                  Track
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;