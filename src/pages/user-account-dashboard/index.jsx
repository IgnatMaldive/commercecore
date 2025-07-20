import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import DashboardHeader from './components/DashboardHeader';
import AccountNavigation from './components/AccountNavigation';
import QuickActions from './components/QuickActions';
import RecentOrders from './components/RecentOrders';
import WishlistPreview from './components/WishlistPreview';
import ActivityFeed from './components/ActivityFeed';
import LoyaltyProgram from './components/LoyaltyProgram';

const UserAccountDashboard = () => {
  const { user, userProfile, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
    date_of_birth: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize profile form when userProfile is loaded
  useEffect(() => {
    if (userProfile) {
      setProfileForm({
        full_name: userProfile.full_name || '',
        phone: userProfile.phone || '',
        date_of_birth: userProfile.date_of_birth || ''
      });
    }
  }, [userProfile]);

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated (Rocket Platform Development Mode - show preview instead)
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 mb-8">
              <Icon name="Info" size={48} color="var(--color-primary)" className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Preview Mode - Account Dashboard</h2>
              <p className="text-text-secondary mb-6">
                This is what your account dashboard will look like once you're signed in. 
                Create an account or sign in to access your personal dashboard with real data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/signup">Create Account</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            
            {/* Preview Content */}
            <div className="opacity-60 pointer-events-none">
              <DashboardHeader 
                user={{ email: 'preview@example.com' }}
                userProfile={{ full_name: 'Preview User', role: 'customer' }}
              />
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                <div className="lg:col-span-1">
                  <AccountNavigation activeTab="overview" onTabChange={() => {}} />
                </div>
                <div className="lg:col-span-3 space-y-8">
                  <QuickActions />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <RecentOrders />
                    <WishlistPreview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const result = await updateProfile(profileForm);
    
    if (result?.success) {
      setIsEditingProfile(false);
    }
    
    setIsUpdating(false);
  };

  const handleInputChange = (field, value) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <DashboardHeader user={user} userProfile={userProfile} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <AccountNavigation 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <QuickActions />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <RecentOrders />
                    <WishlistPreview />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ActivityFeed />
                    <LoyaltyProgram />
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
                    {!isEditingProfile && (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingProfile(true)}
                        iconName="Edit"
                        iconPosition="left"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>

                  {isEditingProfile ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <Input
                        label="Full Name"
                        type="text"
                        value={profileForm.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                      
                      <Input
                        label="Phone Number"
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                      
                      <Input
                        label="Date of Birth"
                        type="date"
                        value={profileForm.date_of_birth}
                        onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                      />

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="submit"
                          loading={isUpdating}
                        >
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditingProfile(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Full Name</label>
                          <p className="mt-1 text-foreground">{userProfile?.full_name || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Email</label>
                          <p className="mt-1 text-foreground">{user?.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Phone</label>
                          <p className="mt-1 text-foreground">{userProfile?.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Date of Birth</label>
                          <p className="mt-1 text-foreground">
                            {userProfile?.date_of_birth ? 
                              new Date(userProfile.date_of_birth).toLocaleDateString() : 
                              'Not provided'
                            }
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Account Type</label>
                          <p className="mt-1 text-foreground capitalize">{userProfile?.role || 'Customer'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Member Since</label>
                          <p className="mt-1 text-foreground">
                            {userProfile?.created_at ? 
                              new Date(userProfile.created_at).toLocaleDateString() : 
                              'Recently'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && <RecentOrders showAll={true} />}
              {activeTab === 'wishlist' && <WishlistPreview showAll={true} />}
              {activeTab === 'addresses' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Saved Addresses</h2>
                  <p className="text-text-secondary">Address management will be available after implementing the address module.</p>
                </div>
              )}
              {activeTab === 'payment' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Payment Methods</h2>
                  <p className="text-text-secondary">Payment method management will be available after implementing the payment module.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAccountDashboard;