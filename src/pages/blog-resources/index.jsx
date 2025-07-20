import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import HeroArticle from './components/HeroArticle';
import ArticleCard from './components/ArticleCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import TagCloud from './components/TagCloud';
import NewsletterSignup from './components/NewsletterSignup';
import FeaturedAuthors from './components/FeaturedAuthors';
import TrendingTopics from './components/TrendingTopics';

const BlogResources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTags, setActiveTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  // Mock data
  const heroArticle = {
    id: 1,
    title: "The Ultimate Guide to Smart Shopping in 2025: AI-Powered Recommendations and Personalized Experiences",
    excerpt: `Discover how artificial intelligence is revolutionizing the shopping experience with personalized product recommendations, dynamic pricing, and predictive analytics. Learn the strategies that savvy shoppers use to find the best deals and make informed purchasing decisions in today's digital marketplace.`,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "Shopping Tips",
    author: {
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    readTime: "8 min read",
    publishDate: "Jan 15, 2025",
    likes: 234,
    comments: 45,
    slug: "ultimate-guide-smart-shopping-2025"
  };

  const articles = [
    {
      id: 2,
      title: "Top 10 Tech Gadgets That Will Transform Your Daily Routine",
      excerpt: `From smart home devices to wearable technology, explore the latest innovations that are making everyday tasks more efficient and enjoyable.`,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      category: "Product Reviews",
      author: {
        name: "Michael Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      readTime: "6 min read",
      publishDate: "Jan 12, 2025",
      likes: 189,
      comments: 32,
      slug: "top-10-tech-gadgets-2025",
      tags: ["technology", "gadgets", "smart-home"]
    },
    {
      id: 3,
      title: "Sustainable Fashion: Building an Eco-Friendly Wardrobe on Any Budget",
      excerpt: `Learn how to make environmentally conscious fashion choices without breaking the bank. Discover sustainable brands and timeless pieces.`,
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=400&h=300&fit=crop",
      category: "Shopping Tips",
      author: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      readTime: "5 min read",
      publishDate: "Jan 10, 2025",
      likes: 156,
      comments: 28,
      slug: "sustainable-fashion-eco-friendly-wardrobe",
      tags: ["fashion", "sustainability", "budget"]
    },
    {
      id: 4,
      title: "E-commerce Trends Shaping the Future of Online Shopping",
      excerpt: `Explore the latest developments in digital commerce, from augmented reality try-ons to voice commerce and social shopping platforms.`,
      image: "https://images.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603_1280.jpg?w=400&h=300&fit=crop",
      category: "Industry News",
      author: {
        name: "David Park",
        avatar: "https://randomuser.me/api/portraits/men/35.jpg"
      },
      readTime: "7 min read",
      publishDate: "Jan 8, 2025",
      likes: 203,
      comments: 41,
      slug: "ecommerce-trends-future-online-shopping",
      tags: ["ecommerce", "trends", "technology"]
    },
    {
      id: 5,
      title: "Home Office Setup: Essential Products for Maximum Productivity",
      excerpt: `Create the perfect work-from-home environment with our curated selection of ergonomic furniture, tech accessories, and organization tools.`,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      category: "Product Reviews",
      author: {
        name: "Lisa Wang",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg"
      },
      readTime: "6 min read",
      publishDate: "Jan 5, 2025",
      likes: 178,
      comments: 35,
      slug: "home-office-setup-productivity-products",
      tags: ["home-office", "productivity", "workspace"]
    },
    {
      id: 6,
      title: "CommerceCore\'s New AI-Powered Recommendation Engine Launch",
      excerpt: `We're excited to announce the launch of our advanced recommendation system that learns from your shopping behavior to suggest perfect products.`,
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=400&h=300&fit=crop",
      category: "Company Updates",
      author: {
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg"
      },
      readTime: "4 min read",
      publishDate: "Jan 3, 2025",
      likes: 267,
      comments: 52,
      slug: "commercecore-ai-recommendation-engine-launch",
      tags: ["company-news", "ai", "features"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles', icon: 'Grid3X3', count: 25 },
    { id: 'shopping-tips', name: 'Shopping Tips', icon: 'ShoppingBag', count: 8 },
    { id: 'product-reviews', name: 'Product Reviews', icon: 'Star', count: 6 },
    { id: 'industry-news', name: 'Industry News', icon: 'Newspaper', count: 5 },
    { id: 'company-updates', name: 'Company Updates', icon: 'Building', count: 4 },
    { id: 'how-to-guides', name: 'How-to Guides', icon: 'BookOpen', count: 2 }
  ];

  const tags = [
    { id: 1, name: 'technology' },
    { id: 2, name: 'fashion' },
    { id: 3, name: 'sustainability' },
    { id: 4, name: 'productivity' },
    { id: 5, name: 'gadgets' },
    { id: 6, name: 'home-office' },
    { id: 7, name: 'ecommerce' },
    { id: 8, name: 'ai' },
    { id: 9, name: 'trends' },
    { id: 10, name: 'budget' }
  ];

  const featuredAuthors = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Commerce Analyst",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      articleCount: 12,
      rating: 4.9,
      slug: "sarah-chen"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Tech Product Reviewer",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      articleCount: 8,
      rating: 4.8,
      slug: "michael-rodriguez"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Sustainable Fashion Expert",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      articleCount: 6,
      rating: 4.9,
      slug: "emma-thompson"
    }
  ];

  const trendingTopics = [
    {
      id: 1,
      title: "AI Shopping Assistants",
      articleCount: 5,
      views: "12.5K",
      growth: 45,
      slug: "ai-shopping-assistants"
    },
    {
      id: 2,
      title: "Sustainable Products",
      articleCount: 8,
      views: "9.8K",
      growth: 32,
      slug: "sustainable-products"
    },
    {
      id: 3,
      title: "Smart Home Tech",
      articleCount: 6,
      views: "8.2K",
      growth: 28,
      slug: "smart-home-tech"
    },
    {
      id: 4,
      title: "Budget Shopping Tips",
      articleCount: 4,
      views: "7.1K",
      growth: 22,
      slug: "budget-shopping-tips"
    }
  ];

  // Filter articles based on category, tags, and search
  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.category.toLowerCase().replace(/\s+/g, '-') === activeCategory
      );
    }

    // Filter by tags
    if (activeTags.length > 0) {
      filtered = filtered.filter(article =>
        article.tags && article.tags.some(tag => 
          activeTags.includes(tags.find(t => t.name === tag)?.id)
        )
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [activeCategory, activeTags, searchTerm]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleTagToggle = (tagId) => {
    setActiveTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-surface to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl lg:text-5xl text-foreground mb-4">
              Blog & Resources
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Discover expert insights, shopping guides, and industry trends to make smarter purchasing decisions
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Hero Article */}
          <HeroArticle article={heroArticle} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
              
              <TagCloud
                tags={tags}
                activeTags={activeTags}
                onTagToggle={handleTagToggle}
              />

              <FeaturedAuthors authors={featuredAuthors} />

              <TrendingTopics topics={trendingTopics} />
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-value-prop text-2xl text-foreground">
                  {activeCategory === 'all' ? 'Latest Articles' : 
                   categories.find(c => c.id === activeCategory)?.name || 'Articles'}
                </h2>
                <span className="text-text-secondary">
                  {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                </span>
              </div>

              {filteredArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
                  <h3 className="font-value-prop text-xl text-foreground mb-2">No articles found</h3>
                  <p className="text-text-secondary">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </div>
              )}

              {/* Load More Button */}
              {filteredArticles.length > 0 && (
                <div className="text-center">
                  <button className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 commerce-transition">
                    <span>Load More Articles</span>
                    <Icon name="ChevronDown" size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingBag" size={20} color="white" />
                </div>
                <span className="font-headline text-xl">CommerceCore</span>
              </div>
              <p className="text-background/80">
                Your trusted partner for smart shopping decisions and product discoveries.
              </p>
            </div>

            <div>
              <h4 className="font-value-prop text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/homepage" className="text-background/80 hover:text-background commerce-transition">Home</a></li>
                <li><a href="/product-catalog" className="text-background/80 hover:text-background commerce-transition">Products</a></li>
                <li><a href="/user-account-dashboard" className="text-background/80 hover:text-background commerce-transition">Account</a></li>
                <li><a href="/shopping-cart-checkout" className="text-background/80 hover:text-background commerce-transition">Cart</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-value-prop text-lg mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-background/80 hover:text-background commerce-transition">Shopping Tips</a></li>
                <li><a href="#" className="text-background/80 hover:text-background commerce-transition">Product Reviews</a></li>
                <li><a href="#" className="text-background/80 hover:text-background commerce-transition">Industry News</a></li>
                <li><a href="#" className="text-background/80 hover:text-background commerce-transition">How-to Guides</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-value-prop text-lg mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-background/80 hover:text-background commerce-transition">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-background/80 hover:text-background commerce-transition">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-background/80 hover:text-background commerce-transition">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-background/80 hover:text-background commerce-transition">
                  <Icon name="Linkedin" size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center">
            <p className="text-background/60">
              © {new Date().getFullYear()} CommerceCore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogResources;