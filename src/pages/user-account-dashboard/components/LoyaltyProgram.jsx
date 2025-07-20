import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoyaltyProgram = ({ loyaltyData }) => {
  const { currentPoints, tierStatus, nextTierPoints, availableRewards, recentActivity } = loyaltyData;

  const progressPercentage = (currentPoints / nextTierPoints) * 100;

  const getTierColor = (tier) => {
    switch (tier.toLowerCase()) {
      case 'bronze':
        return 'text-amber-600 bg-amber-50';
      case 'silver':
        return 'text-gray-600 bg-gray-50';
      case 'gold':
        return 'text-yellow-600 bg-yellow-50';
      case 'platinum':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tier Status Card */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Crown" size={24} color="gold" />
            <div>
              <h2 className="text-xl font-semibold">Loyalty Program</h2>
              <p className="text-white/80">Current Status: {tierStatus}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(tierStatus)} text-black`}>
            {tierStatus} Member
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-3xl font-bold mb-1">{currentPoints.toLocaleString()}</div>
            <div className="text-white/80">Available Points</div>
          </div>
          <div>
            <div className="text-lg font-semibold mb-2">
              {nextTierPoints - currentPoints} points to next tier
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 commerce-transition"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="bg-card rounded-lg p-6 commerce-shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRewards.map((reward) => (
            <div key={reward.id} className="border border-border rounded-lg p-4 hover:border-primary/20 commerce-transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={reward.icon} size={20} className="text-primary" />
                  <span className="font-medium text-foreground">{reward.title}</span>
                </div>
                <div className="text-sm font-semibold text-primary">{reward.points} pts</div>
              </div>
              
              <p className="text-sm text-text-secondary mb-4">{reward.description}</p>
              
              <Button
                variant={currentPoints >= reward.points ? "default" : "outline"}
                size="sm"
                fullWidth
                disabled={currentPoints < reward.points}
                onClick={() => console.log('Redeem reward:', reward.id)}
              >
                {currentPoints >= reward.points ? 'Redeem' : 'Not Enough Points'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Points Activity */}
      <div className="bg-card rounded-lg p-6 commerce-shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Points Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'earned' ? 'bg-success/10' : 'bg-error/10'
                }`}>
                  <Icon 
                    name={activity.type === 'earned' ? 'Plus' : 'Minus'} 
                    size={16} 
                    className={activity.type === 'earned' ? 'text-success' : 'text-error'}
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground">{activity.description}</div>
                  <div className="text-sm text-text-secondary">{activity.date}</div>
                </div>
              </div>
              <div className={`font-semibold ${
                activity.type === 'earned' ? 'text-success' : 'text-error'
              }`}>
                {activity.type === 'earned' ? '+' : '-'}{activity.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tier Benefits */}
      <div className="bg-card rounded-lg p-6 commerce-shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your {tierStatus} Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loyaltyData.tierBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;