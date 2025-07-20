import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedCollections = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const collections = [
    {
      id: 1,
      title: "Electronics & Tech",
      description: "Latest gadgets and smart devices for modern living",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
      productCount: 245,
      badge: "Trending",
      products: [
        { name: "Wireless Earbuds", price: "$89.99" },
        { name: "Smart Watch", price: "$199.99" },
        { name: "Tablet Stand", price: "$29.99" }
      ]
    },
    {
      id: 2,
      title: "Home & Living",
      description: "Transform your space with stylish furniture and decor",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=600&h=400&fit=crop",
      productCount: 189,
      badge: "New Arrivals",
      products: [
        { name: "Throw Pillows", price: "$24.99" },
        { name: "Table Lamp", price: "$79.99" },
        { name: "Wall Art", price: "$49.99" }
      ]
    },
    {
      id: 3,
      title: "Fashion & Style",
      description: "Curated clothing and accessories for every occasion",
      image: "https://images.pixabay.com/photo/2016/03/27/19/32/fashion-1283863_1280.jpg?w=600&h=400&fit=crop",
      productCount: 312,
      badge: "Best Sellers",
      products: [
        { name: "Designer Bag", price: "$159.99" },
        { name: "Casual Shirt", price: "$39.99" },
        { name: "Sneakers", price: "$89.99" }
      ]
    },
    {
      id: 4,
      title: "Health & Wellness",
      description: "Products to support your healthy lifestyle journey",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      productCount: 156,
      badge: "Popular",
      products: [
        { name: "Yoga Mat", price: "$34.99" },
        { name: "Water Bottle", price: "$19.99" },
        { name: "Resistance Bands", price: "$24.99" }
      ]
    }
  ];

  const handleQuickAdd = (productName, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added ${productName} to cart`);
    // Add to cart logic would go here
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl text-foreground mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover our carefully curated collections featuring the best products 
            across categories, handpicked for quality and style.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to="/product-catalog"
              className="group block"
              onMouseEnter={() => setHoveredCard(collection.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden commerce-shadow-card hover:commerce-shadow-hover commerce-transition transform group-hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 commerce-transition duration-500"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {collection.badge}
                    </span>
                  </div>

                  {/* Product Count */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {collection.productCount} items
                    </span>
                  </div>

                  {/* Quick View Overlay */}
                  {hoveredCard === collection.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center commerce-transition">
                      <Button variant="secondary" size="sm">
                        <Icon name="Eye" size={16} className="mr-2" />
                        Quick View
                      </Button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary commerce-transition">
                    {collection.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>

                  {/* Sample Products */}
                  <div className="space-y-2 mb-4">
                    {collection.products.slice(0, 2).map((product, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">{product.name}</span>
                        <span className="font-medium text-foreground">{product.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Add Buttons */}
                  <div className="space-y-2">
                    {collection.products.slice(0, 2).map((product, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleQuickAdd(product.name, e)}
                        className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-surface hover:bg-muted border border-border rounded-lg text-sm font-medium commerce-transition"
                      >
                        <Icon name="Plus" size={14} />
                        <span>Add {product.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* View All Link */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">
                        +{collection.productCount - 2} more items
                      </span>
                      <div className="flex items-center space-x-1 text-primary text-sm font-medium">
                        <span>View All</span>
                        <Icon name="ArrowRight" size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Collections CTA */}
        <div className="text-center">
          <Link to="/product-catalog">
            <Button variant="outline" size="lg">
              <Icon name="Grid" size={20} className="mr-2" />
              View All Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;