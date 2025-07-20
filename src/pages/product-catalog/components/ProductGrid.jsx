import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ products, loading, hasMore, onLoadMore }) => {
  const [wishlist, setWishlist] = useState(new Set());
  const [comparison, setComparison] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    // Load wishlist and comparison from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    const savedComparison = localStorage.getItem('comparison');
    
    if (savedWishlist) {
      setWishlist(new Set(JSON.parse(savedWishlist)));
    }
    if (savedComparison) {
      setComparison(new Set(JSON.parse(savedComparison)));
    }
  }, []);

  const handleWishlistToggle = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify([...newWishlist]));
  };

  const handleCompareToggle = (productId) => {
    const newComparison = new Set(comparison);
    if (newComparison.has(productId)) {
      newComparison.delete(productId);
    } else {
      if (newComparison.size >= 4) {
        // Limit comparison to 4 products
        alert('You can compare up to 4 products at a time');
        return;
      }
      newComparison.add(productId);
    }
    setComparison(newComparison);
    localStorage.setItem('comparison', JSON.stringify([...newComparison]));
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="aspect-square bg-muted rounded-lg mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-1/4"></div>
      </div>
    </div>
  );

  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-text-secondary mb-6 max-w-md">
          We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing {products.length} products
        </p>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" :"space-y-4"
      }>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onWishlistToggle={handleWishlistToggle}
            onCompareToggle={handleCompareToggle}
            isInWishlist={wishlist.has(product.id)}
            isInComparison={comparison.has(product.id)}
          />
        ))}
      </div>

      {/* Loading More */}
      {loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <LoadingSkeleton key={`loading-${index}`} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Load More Products
          </Button>
        </div>
      )}

      {/* Comparison Bar */}
      {comparison.size > 0 && (
        <div className="fixed bottom-4 left-4 right-4 lg:left-80 bg-background border border-border rounded-lg commerce-shadow-modal p-4 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="BarChart3" size={20} className="text-primary" />
              <span className="font-medium text-foreground">
                Compare Products ({comparison.size}/4)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                disabled={comparison.size < 2}
                onClick={() => console.log('Compare products:', [...comparison])}
              >
                Compare
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setComparison(new Set());
                  localStorage.removeItem('comparison');
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;