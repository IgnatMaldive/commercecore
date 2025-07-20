import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import BlogResources from "pages/blog-resources";
import UserAccountDashboard from "pages/user-account-dashboard";
import ProductDetailPage from "pages/product-detail-page";
import ProductCatalog from "pages/product-catalog";
import ShoppingCartCheckout from "pages/shopping-cart-checkout";
import Login from "components/auth/Login";
import Signup from "components/auth/Signup";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/blog-resources" element={<BlogResources />} />
        <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
        <Route path="/product-detail-page" element={<ProductDetailPage />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;