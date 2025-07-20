import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DashboardHeader = ({ user, loyaltyPoints, membershipTier }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
            <div className="absolute -bottom-1 -right-1 bg-success text-white rounded-full p-1">
              <Icon name="Check" size={12} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-headline">Welcome back, {user.firstName}!</h1>
            <p className="text-white/80">Member since {user.memberSince}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="text-center sm:text-right">
            <div className="text-2xl font-bold">{loyaltyPoints.toLocaleString()}</div>
            <div className="text-white/80 text-sm">Loyalty Points</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <Icon name="Crown" size={16} color="gold" />
              <span className="font-medium">{membershipTier}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;