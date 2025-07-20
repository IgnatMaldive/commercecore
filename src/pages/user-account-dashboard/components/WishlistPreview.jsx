import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WishlistPreview = ({ wishlistItems }) => {
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item);
    // Add to cart logic here
  };

  const handleRemoveFromWishlist = (itemId) => {
    console.log('Removing from wishlist:', itemId);
    // Remove from wishlist logic here
  };

  return (
    <div className="bg-card rounded-lg p-6 commerce-shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Your Wishlist</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('View full wishlist')}
        >
          View All ({wishlistItems.length})
        </Button>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Heart" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Your wishlist is empty</h3>
          <p className="text-text-secondary mb-4">Save items you love to buy them later</p>
          <Button onClick={() => navigate('/product-catalog')}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.slice(0, 6).map((item) => (
            <div key={item.id} className="group border border-border rounded-lg p-4 hover:border-primary/20 commerce-transition">
              <div className="relative mb-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 commerce-transition"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Icon name="X" size={16} />
                </Button>
                {item.priceDropped && (
                  <div className="absolute top-2 left-2 bg-error text-white text-xs px-2 py-1 rounded">
                    Price Drop!
                  </div>
                )}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-foreground text-sm line-clamp-2">{item.name}</h3>
                
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-foreground">${item.currentPrice}</span>
                  {item.originalPrice > item.currentPrice && (
                    <span className="text-sm text-text-secondary line-through">${item.originalPrice}</span>
                  )}
                  {item.priceDropped && (
                    <span className="text-xs text-error font-medium">
                      -{Math.round(((item.originalPrice - item.currentPrice) / item.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1 text-xs text-text-secondary">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={i < Math.floor(item.rating) ? 'text-warning fill-current' : 'text-border'}
                      />
                    ))}
                  </div>
                  <span>({item.reviewCount})</span>
                </div>

                <Button
                  variant={item.inStock ? "default" : "outline"}
                  size="sm"
                  fullWidth
                  disabled={!item.inStock}
                  onClick={() => item.inStock && handleAddToCart(item)}
                >
                  {item.inStock ? (
                    <>
                      <Icon name="ShoppingCart" size={14} className="mr-1" />
                      Add to Cart
                    </>
                  ) : (
                    'Notify When Available'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {wishlistItems.length > 6 && (
        <div className="text-center mt-6">
          <Button variant="outline" onClick={() => console.log('View full wishlist')}>
            View {wishlistItems.length - 6} More Items
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishlistPreview;