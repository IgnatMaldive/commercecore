import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';
import Breadcrumb from './components/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentSort, setCurrentSort] = useState('relevance');
  const [filters, setFilters] = useState({
    priceRange: null,
    brands: [],
    minRating: null,
    availability: []
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      brand: "TechPro",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.5,
      reviewCount: 1247,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop"
      ],
      stock: 15,
      isNew: false,
      isOnSale: true,
      discount: 20,
      freeShipping: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      brand: "InnovateCorp",
      price: 299.99,
      rating: 4.8,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop"
      ],
      stock: 8,
      isNew: true,
      isOnSale: false,
      freeShipping: true
    },
    {
      id: 3,
      name: "Professional Camera Lens",
      brand: "QualityFirst",
      price: 899.99,
      rating: 4.7,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop"
      ],
      stock: 3,
      isNew: false,
      isOnSale: false,
      freeShipping: false
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      brand: "ModernDesign",
      price: 449.99,
      originalPrice: 599.99,
      rating: 4.3,
      reviewCount: 723,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop"
      ],
      stock: 12,
      isNew: false,
      isOnSale: true,
      discount: 25,
      freeShipping: true
    },
    {
      id: 5,
      name: "Wireless Charging Pad",
      brand: "SmartTech",
      price: 49.99,
      rating: 4.2,
      reviewCount: 1834,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
      ],
      stock: 25,
      isNew: true,
      isOnSale: false,
      freeShipping: true
    },
    {
      id: 6,
      name: "Gaming Mechanical Keyboard",
      brand: "PremiumBrand",
      price: 159.99,
      rating: 4.6,
      reviewCount: 967,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop"
      ],
      stock: 18,
      isNew: false,
      isOnSale: false,
      freeShipping: true
    },
    {
      id: 7,
      name: "Bluetooth Portable Speaker",
      brand: "TechPro",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviewCount: 1456,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop"
      ],
      stock: 22,
      isNew: false,
      isOnSale: true,
      discount: 20,
      freeShipping: true
    },
    {
      id: 8,
      name: "Laptop Stand Adjustable",
      brand: "ModernDesign",
      price: 89.99,
      rating: 4.1,
      reviewCount: 634,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop"
      ],
      stock: 14,
      isNew: true,
      isOnSale: false,
      freeShipping: false
    }
  ];

  // Initialize products on component mount
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useCallback(() => {
    let filtered = [...mockProducts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(p => p === '+' ? Infinity : parseInt(p));
      filtered = filtered.filter(product => {
        if (max === Infinity) return product.price >= min;
        return product.price >= min && product.price <= max;
      });
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Apply rating filter
    if (filters.minRating) {
      filtered = filtered.filter(product => product.rating >= filters.minRating);
    }

    // Apply availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter(product => {
        return filters.availability.some(filter => {
          switch (filter) {
            case 'in-stock':
              return product.stock > 0;
            case 'on-sale':
              return product.isOnSale;
            case 'free-shipping':
              return product.freeShipping;
            case 'new':
              return product.isNew;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    switch (currentSort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'name-az':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  }, [searchQuery, filters, currentSort]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const newSearchParams = new URLSearchParams(searchParams);
    if (query) {
      newSearchParams.set('search', query);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({
        priceRange: null,
        brands: [],
        minRating: null,
        availability: []
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const handleSortChange = (sort) => {
    setCurrentSort(sort);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const breadcrumbItems = [
    { label: 'Products', href: '/product-catalog' }
  ];

  if (searchQuery) {
    breadcrumbItems.push({ label: `Search: "${searchQuery}"` });
  }

  const displayedProducts = filteredAndSortedProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              searchQuery={searchQuery}
              onSearch={handleSearch}
              onFilterToggle={() => setIsFilterOpen(true)}
            />
          </div>

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                isOpen={false}
                onClose={() => {}}
                resultCount={displayedProducts.length}
              />
            </aside>

            {/* Mobile Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              resultCount={displayedProducts.length}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header with Sort */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
                  </h1>
                  <p className="text-text-secondary">
                    {displayedProducts.length} products found
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden"
                    iconName="SlidersHorizontal"
                    iconPosition="left"
                  >
                    Filters
                  </Button>

                  <SortDropdown
                    currentSort={currentSort}
                    onSortChange={handleSortChange}
                  />
                </div>
              </div>

              {/* Active Filters */}
              {(filters.priceRange || filters.brands.length > 0 || filters.minRating || filters.availability.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-surface rounded-lg">
                  <span className="text-sm font-medium text-foreground">Active filters:</span>
                  
                  {filters.priceRange && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      Price: ${filters.priceRange.replace('-', ' - $')}
                      <button
                        onClick={() => handleFilterChange('priceRange', null)}
                        className="ml-2 hover:text-primary/80"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  )}

                  {filters.brands.map(brand => (
                    <span key={brand} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {brand}
                      <button
                        onClick={() => handleFilterChange('brands', filters.brands.filter(b => b !== brand))}
                        className="ml-2 hover:text-primary/80"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}

                  {filters.minRating && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {filters.minRating}+ Stars
                      <button
                        onClick={() => handleFilterChange('minRating', null)}
                        className="ml-2 hover:text-primary/80"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  )}

                  {filters.availability.map(availability => (
                    <span key={availability} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {availability.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      <button
                        onClick={() => handleFilterChange('availability', filters.availability.filter(a => a !== availability))}
                        className="ml-2 hover:text-primary/80"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFilterChange('clear', null)}
                    className="text-text-secondary hover:text-foreground"
                  >
                    Clear all
                  </Button>
                </div>
              )}

              {/* Product Grid */}
              <ProductGrid
                products={displayedProducts}
                loading={loading}
                hasMore={hasMore && displayedProducts.length >= 8}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductCatalog;