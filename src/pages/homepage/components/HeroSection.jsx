import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroProducts = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      subtitle: "Crystal Clear Audio Experience",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
      category: "Electronics",
      price: "$299.99",
      originalPrice: "$399.99"
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      subtitle: "Track Your Health Journey",
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?w=800&h=600&fit=crop",
      category: "Wearables",
      price: "$199.99",
      originalPrice: "$249.99"
    },
    {
      id: 3,
      title: "Ergonomic Office Chair",
      subtitle: "Comfort Meets Productivity",
      image: "https://images.pixabay.com/photo/2016/11/19/15/32/chair-1840011_1280.jpg?w=800&h=600&fit=crop",
      category: "Furniture",
      price: "$449.99",
      originalPrice: "$599.99"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  const currentProduct = heroProducts[currentSlide];

  return (
    <section className="relative bg-gradient-to-br from-background via-surface to-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16">
          {/* Content Side */}
          <div className="space-y-8 lg:pr-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <Icon name="Star" size={16} />
                <span>Featured Product</span>
              </div>
              
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                Quality you can trust,{' '}
                <span className="text-primary">Shopping made simple</span>
              </h1>
              
              <p className="text-lg text-text-secondary max-w-lg">
                Discover premium products with unmatched quality. From electronics to home essentials, 
                we curate the best for your lifestyle.
              </p>
            </div>

            {/* Product Info */}
            <div className="bg-card border border-border rounded-lg p-6 commerce-shadow-card">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-text-secondary">{currentProduct.category}</span>
                <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
                <span className="text-sm font-medium text-foreground">{currentProduct.title}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {currentProduct.subtitle}
              </h3>
              
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl font-bold text-primary">{currentProduct.price}</span>
                <span className="text-lg text-text-secondary line-through">{currentProduct.originalPrice}</span>
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-sm font-medium">
                  Save 25%
                </span>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={16} color="var(--color-accent)" />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">(2,847 reviews)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/product-catalog">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/product-catalog">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Collections
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">Secure Checkout</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={20} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RotateCcw" size={20} color="var(--color-success)" />
                <span className="text-sm text-text-secondary">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-6"></div>
              <div className="relative bg-card rounded-2xl overflow-hidden commerce-shadow-modal">
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center commerce-transition commerce-shadow-card"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center commerce-transition commerce-shadow-card"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {heroProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full commerce-transition ${
                    index === currentSlide ? 'bg-primary' : 'bg-border hover:bg-text-secondary'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;