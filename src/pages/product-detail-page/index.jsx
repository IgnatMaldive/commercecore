import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import SocialShare from './components/SocialShare';
import StickyCartBar from './components/StickyCartBar';

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id') || '1';
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Premium Wireless Bluetooth Headphones",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.5,
    reviewCount: 128,
    sku: "WH-1000XM4",
    stock: 15,
    description: `Experience exceptional sound quality with our premium wireless Bluetooth headphones. Featuring industry-leading noise cancellation technology, these headphones deliver crystal-clear audio whether you're commuting, working, or relaxing at home.\n\nThe ergonomic design ensures comfortable wear for extended periods, while the premium materials provide durability and style. With up to 30 hours of battery life and quick charge functionality, you'll never miss a beat.`,
    features: [
      "Industry-leading noise cancellation technology",
      "30-hour battery life with quick charge",
      "Premium comfort with ergonomic design",
      "High-resolution audio support",
      "Touch sensor controls for easy operation",
      "Voice assistant compatibility",
      "Foldable design for easy portability",
      "Multiple device connectivity"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Midnight Black", hex: "#000000" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Blue", hex: "#1E40AF" }
    ],
    specifications: [
      { label: "Driver Unit", value: "40mm dome type" },
      { label: "Frequency Response", value: "4Hz-40,000Hz" },
      { label: "Impedance", value: "47 ohm" },
      { label: "Battery Life", value: "30 hours (NC ON), 38 hours (NC OFF)" },
      { label: "Charging Time", value: "3 hours (Quick charge: 10 min for 5 hours)" },
      { label: "Weight", value: "254g" },
      { label: "Connectivity", value: "Bluetooth 5.0, NFC, 3.5mm jack" },
      { label: "Microphone", value: "Built-in microphone for hands-free calls" }
    ],
    ratingBreakdown: {
      5: 65,
      4: 20,
      3: 10,
      2: 3,
      1: 2
    },
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        date: "July 15, 2025",
        verified: true,
        comment: "Absolutely amazing headphones! The noise cancellation is incredible and the sound quality is top-notch. Worth every penny.",
        helpful: 24
      },
      {
        id: 2,
        author: "Mike Chen",
        rating: 4,
        date: "July 10, 2025",
        verified: true,
        comment: "Great headphones overall. The battery life is excellent and they're very comfortable. Only minor complaint is they can feel a bit heavy after long sessions.",
        helpful: 18
      },
      {
        id: 3,
        author: "Emily Rodriguez",
        rating: 5,
        date: "July 8, 2025",
        verified: true,
        comment: "Perfect for my daily commute. The noise cancellation blocks out all the subway noise and the quick charge feature is a lifesaver.",
        helpful: 15
      }
    ],
    shippingOptions: [
      {
        name: "Standard Shipping",
        description: "5-7 business days",
        price: "Free"
      },
      {
        name: "Express Shipping",
        description: "2-3 business days",
        price: "$9.99"
      },
      {
        name: "Overnight Shipping",
        description: "Next business day",
        price: "$19.99"
      }
    ],
    shareCount: 342,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        alt: "Premium Wireless Headphones - Main View"
      },
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
        alt: "Premium Wireless Headphones - Side View"
      },
      {
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
        alt: "Premium Wireless Headphones - Folded"
      },
      {
        url: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop",
        alt: "Premium Wireless Headphones - In Use"
      }
    ]
  };

  // Mock related products
  const mockRelatedProducts = [
    {
      id: "2",
      name: "Wireless Earbuds Pro",
      price: 149.99,
      originalPrice: 179.99,
      discount: 17,
      rating: 4.3,
      reviewCount: 89,
      category: "Audio",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
      stock: 8,
      isNew: true
    },
    {
      id: "3",
      name: "Studio Monitor Speakers",
      price: 299.99,
      rating: 4.7,
      reviewCount: 156,
      category: "Audio",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
      stock: 12
    },
    {
      id: "4",
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.2,
      reviewCount: 203,
      category: "Audio",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      stock: 25
    },
    {
      id: "5",
      name: "Gaming Headset RGB",
      price: 129.99,
      rating: 4.4,
      reviewCount: 67,
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
      stock: 3
    }
  ];

  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      product: mockProduct.id,
      variants: selectedVariants,
      quantity
    });
    // Add to cart logic here
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/homepage" className="text-text-secondary hover:text-foreground commerce-transition">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
            <Link to="/product-catalog" className="text-text-secondary hover:text-foreground commerce-transition">
              Products
            </Link>
            <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
            <span className="text-foreground font-medium">Audio</span>
            <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
            <span className="text-foreground">{mockProduct.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery 
              images={mockProduct.images} 
              productName={mockProduct.name}
            />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo 
              product={mockProduct}
              selectedVariants={selectedVariants}
              onVariantChange={setSelectedVariants}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <ProductTabs product={mockProduct} />
        </div>

        {/* Social Share and Additional Info */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            {/* Trust Signals */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-medium text-foreground mb-4">Why choose CommerceCore?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={20} color="var(--color-success)" className="mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Secure Shopping</p>
                    <p className="text-sm text-text-secondary">SSL encryption and secure payment processing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Truck" size={20} color="var(--color-success)" className="mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Fast Shipping</p>
                    <p className="text-sm text-text-secondary">Free shipping on orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="RotateCcw" size={20} color="var(--color-success)" className="mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Easy Returns</p>
                    <p className="text-sm text-text-secondary">30-day hassle-free return policy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Headphones" size={20} color="var(--color-success)" className="mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">24/7 Support</p>
                    <p className="text-sm text-text-secondary">Expert customer service team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div>
            <SocialShare 
              product={mockProduct}
              currentUrl={window.location.href}
            />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={mockRelatedProducts} />
      </main>

      {/* Sticky Cart Bar for Mobile */}
      <StickyCartBar
        product={mockProduct}
        selectedVariants={selectedVariants}
        quantity={quantity}
        onAddToCart={handleAddToCart}
      />

      {/* Footer Spacer for Mobile Sticky Bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default ProductDetailPage;