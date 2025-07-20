import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TrustSignalsBar from './components/TrustSignalsBar';
import FeaturedCollections from './components/FeaturedCollections';
import SocialProofSection from './components/SocialProofSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>CommerceCore - Quality you can trust, Shopping made simple</title>
        <meta name="description" content="Discover premium products with unmatched quality at CommerceCore. From electronics to home essentials, we curate the best for your lifestyle with secure checkout and fast shipping." />
        <meta name="keywords" content="online shopping, electronics, home goods, fashion, quality products, secure checkout, fast shipping" />
        <meta property="og:title" content="CommerceCore - Quality you can trust, Shopping made simple" />
        <meta property="og:description" content="Your trusted partner for quality products and exceptional shopping experiences." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16 lg:pt-24">
          <HeroSection />
          <TrustSignalsBar />
          <FeaturedCollections />
          <SocialProofSection />
          <NewsletterSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Homepage;