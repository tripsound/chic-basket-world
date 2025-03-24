
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { CartProvider } from "./contexts/CartContext";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminProductsPage from "./pages/admin/products/ProductsPage";
import ProductForm from "./pages/admin/products/ProductForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route 
                  path="cart" 
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="checkout" 
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="verify-email" element={<VerifyEmailPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/edit/:id" element={<ProductForm />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
