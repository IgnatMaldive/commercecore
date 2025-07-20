import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/product-catalog" },
        { name: "Electronics", href: "/product-catalog" },
        { name: "Home & Living", href: "/product-catalog" },
        { name: "Fashion", href: "/product-catalog" },
        { name: "Health & Wellness", href: "/product-catalog" },
        { name: "New Arrivals", href: "/product-catalog" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Shipping Info", href: "#" },
        { name: "Returns & Exchanges", href: "#" },
        { name: "Size Guide", href: "#" },
        { name: "Track Your Order", href: "/user-account-dashboard" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "/blog-resources" },
        { name: "Sustainability", href: "#" },
        { name: "Affiliate Program", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Accessibility", href: "#" },
        { name: "Security", href: "#" },
        { name: "Compliance", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" },
    { name: "LinkedIn", icon: "Linkedin", href: "#" },
    { name: "YouTube", icon: "Youtube", href: "#" }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" },
    { name: "Google Pay", icon: "Smartphone" }
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/homepage" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="font-headline text-xl text-background">CommerceCore</span>
            </Link>
            
            <p className="text-background/80 max-w-md">
              Your trusted partner for quality products and exceptional shopping experiences. 
              We're committed to bringing you the best in electronics, home goods, fashion, and more.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} color="rgba(255,255,255,0.8)" />
                <span className="text-background/80 text-sm">1-800-COMMERCE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} color="rgba(255,255,255,0.8)" />
                <span className="text-background/80 text-sm">support@commercecore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} color="rgba(255,255,255,0.8)" />
                <span className="text-background/80 text-sm">24/7 Customer Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-lg flex items-center justify-center commerce-transition"
                  title={social.name}
                >
                  <Icon name={social.icon} size={20} color="rgba(255,255,255,0.8)" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-background text-lg">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/80 hover:text-background text-sm commerce-transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-background/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-background/80 text-sm text-center lg:text-left">
              © {currentYear} CommerceCore. All rights reserved. | 
              <span className="ml-1">Quality you can trust, Shopping made simple.</span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-background/80 text-sm">We Accept:</span>
              <div className="flex items-center space-x-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="w-8 h-8 bg-background/10 rounded flex items-center justify-center"
                    title={method.name}
                  >
                    <Icon name={method.icon} size={16} color="rgba(255,255,255,0.8)" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-background/20">
            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} color="rgba(255,255,255,0.8)" />
                  <span className="text-background/80 text-sm">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} color="rgba(255,255,255,0.8)" />
                  <span className="text-background/80 text-sm">BBB Accredited</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} color="rgba(255,255,255,0.8)" />
                  <span className="text-background/80 text-sm">PCI Compliant</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Truck" size={16} color="rgba(255,255,255,0.8)" />
                  <span className="text-background/80 text-sm">Free Shipping $50+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="RotateCcw" size={16} color="rgba(255,255,255,0.8)" />
                  <span className="text-background/80 text-sm">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;