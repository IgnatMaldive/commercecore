import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ product, currentUrl }) => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: product.name,
    text: `Check out this amazing product: ${product.name}`,
    url: currentUrl || window.location.href
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
      color: '#1877F2'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
      color: '#1DA1F2'
    },
    {
      name: 'Pinterest',
      icon: 'Image',
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareData.url)}&description=${encodeURIComponent(shareData.text)}`,
      color: '#E60023'
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`,
      color: '#25D366'
    }
  ];

  const handleShare = async (platform) => {
    if (platform.url) {
      window.open(platform.url, '_blank', 'width=600,height=400');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Failed to copy link:', error);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Share2" size={20} />
        <span>Share this product</span>
      </h3>

      <div className="space-y-4">
        {/* Social Platform Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              size="sm"
              onClick={() => handleShare(platform)}
              className="flex flex-col items-center space-y-1 h-auto py-3"
            >
              <Icon name={platform.icon} size={20} color={platform.color} />
              <span className="text-xs">{platform.name}</span>
            </Button>
          ))}
        </div>

        {/* Native Share and Copy Link */}
        <div className="flex space-x-3">
          {navigator.share && (
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              iconName="Share"
              iconPosition="left"
              onClick={handleNativeShare}
            >
              Share
            </Button>
          )}
          
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            iconName={copied ? "Check" : "Copy"}
            iconPosition="left"
            onClick={handleCopyLink}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>

        {/* Product Share Preview */}
        <div className="border border-border rounded-lg p-4 bg-surface">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="var(--color-text-secondary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{product.name}</p>
              <p className="text-sm text-text-secondary">${product.price}</p>
            </div>
          </div>
        </div>

        {/* Share Stats */}
        <div className="text-center">
          <p className="text-xs text-text-secondary">
            This product has been shared {product.shareCount || 0} times
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;