import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return 'Package';
      case 'wishlist':
        return 'Heart';
      case 'review':
        return 'Star';
      case 'points':
        return 'Crown';
      case 'promotion':
        return 'Tag';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order':
        return 'bg-blue-50 text-blue-600';
      case 'wishlist':
        return 'bg-red-50 text-red-600';
      case 'review':
        return 'bg-yellow-50 text-yellow-600';
      case 'points':
        return 'bg-purple-50 text-purple-600';
      case 'promotion':
        return 'bg-green-50 text-green-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return activityTime.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg p-6 commerce-shadow-card">
      <h2 className="text-xl font-semibold text-foreground mb-6">Recent Activity</h2>
      
      {activities.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No recent activity</h3>
          <p className="text-text-secondary">Your account activity will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-muted rounded-lg commerce-transition">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{activity.title}</h4>
                    <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                    
                    {activity.relatedItems && (
                      <div className="flex items-center space-x-2 mt-2">
                        {activity.relatedItems.slice(0, 3).map((item, index) => (
                          <Image
                            key={index}
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 rounded object-cover border border-border"
                          />
                        ))}
                        {activity.relatedItems.length > 3 && (
                          <span className="text-xs text-text-secondary">
                            +{activity.relatedItems.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    {activity.actionRequired && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                          <Icon name="AlertCircle" size={12} className="mr-1" />
                          Action Required
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-xs text-text-secondary">
                      {formatTimeAgo(activity.timestamp)}
                    </div>
                    {activity.amount && (
                      <div className="text-sm font-medium text-foreground mt-1">
                        ${activity.amount}
                      </div>
                    )}
                    {activity.points && (
                      <div className="text-sm font-medium text-primary mt-1">
                        +{activity.points} pts
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activities.length > 0 && (
        <div className="text-center mt-6">
          <button className="text-primary hover:text-primary/80 text-sm font-medium commerce-transition">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;