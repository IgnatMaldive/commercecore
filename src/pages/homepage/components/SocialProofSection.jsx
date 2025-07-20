import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProofSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      review: "Absolutely love shopping here! The quality is outstanding and delivery is always on time. The customer service team went above and beyond to help me with my order.",
      product: "Wireless Headphones",
      verified: true,
      date: "2025-01-15",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "San Francisco, CA",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      review: "Fast shipping, great prices, and excellent product quality. I've been a customer for over a year now and they never disappoint. Highly recommend!",
      product: "Smart Watch",
      verified: true,
      date: "2025-01-12",
      images: []
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Austin, TX",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      review: "The best online shopping experience I've had. Easy returns, secure checkout, and the products always match the description perfectly.",
      product: "Office Chair",
      verified: true,
      date: "2025-01-10",
      images: [
        "https://images.pixabay.com/photo/2016/11/19/15/32/chair-1840011_1280.jpg?w=300&h=300&fit=crop"
      ]
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Chicago, IL",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 4,
      review: "Great selection of products and competitive prices. The website is easy to navigate and the checkout process is smooth. Will definitely shop again!",
      product: "Laptop Stand",
      verified: true,
      date: "2025-01-08",
      images: []
    }
  ];

  const stats = [
    {
      number: "50,000+",
      label: "Happy Customers",
      icon: "Users"
    },
    {
      number: "4.9/5",
      label: "Average Rating",
      icon: "Star"
    },
    {
      number: "99.2%",
      label: "Satisfaction Rate",
      icon: "ThumbsUp"
    },
    {
      number: "24/7",
      label: "Customer Support",
      icon: "Headphones"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const currentReview = testimonials[currentTestimonial];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust CommerceCore for their shopping needs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={stat.icon} size={24} color="var(--color-primary)" />
                </div>
              </div>
              <div className="font-headline text-2xl sm:text-3xl text-foreground mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 commerce-shadow-card">
            <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Customer Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="w-20 h-20 mx-auto lg:mx-0 mb-4">
                  <Image
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  {currentReview.name}
                </h4>
                <p className="text-sm text-text-secondary mb-2">
                  {currentReview.location}
                </p>
                {currentReview.verified && (
                  <div className="flex items-center justify-center lg:justify-start space-x-1 text-success text-sm">
                    <Icon name="CheckCircle" size={16} />
                    <span>Verified Purchase</span>
                  </div>
                )}
              </div>

              {/* Review Content */}
              <div className="flex-1">
                {/* Rating */}
                <div className="flex items-center justify-center lg:justify-start space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={20}
                      color={star <= currentReview.rating ? "var(--color-accent)" : "var(--color-border)"}
                    />
                  ))}
                  <span className="ml-2 text-sm text-text-secondary">
                    {formatDate(currentReview.date)}
                  </span>
                </div>

                {/* Review Text */}
                <blockquote className="text-lg text-foreground mb-4 leading-relaxed text-center lg:text-left">
                  "{currentReview.review}"
                </blockquote>

                {/* Product Info */}
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                  <Icon name="Package" size={16} color="var(--color-text-secondary)" />
                  <span className="text-sm text-text-secondary">
                    Purchased: {currentReview.product}
                  </span>
                </div>

                {/* Review Images */}
                {currentReview.images.length > 0 && (
                  <div className="flex justify-center lg:justify-start space-x-3">
                    {currentReview.images.map((image, index) => (
                      <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center commerce-shadow-card hover:commerce-shadow-hover commerce-transition"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center commerce-shadow-card hover:commerce-shadow-hover commerce-transition"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full commerce-transition ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-border hover:bg-text-secondary'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Award" size={20} />
              <span className="text-sm">BBB Accredited</span>
            </div>
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Shield" size={20} />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Truck" size={20} />
              <span className="text-sm">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="RotateCcw" size={20} />
              <span className="text-sm">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;