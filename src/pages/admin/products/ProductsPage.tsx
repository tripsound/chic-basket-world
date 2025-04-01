
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Import new components
import ProductsHeader from "./components/ProductsHeader";
import SearchBar from "./components/SearchBar";
import ProductsTable from "./components/ProductsTable";
import LoadingState from "./components/LoadingState";
import ProductsErrorState from "./components/ProductsErrorState";
import EmptyProductsState from "./components/EmptyProductsState";

interface Product {
  id: string;
  name: string;
  price: number;
  sale_price: number | null;
  category: string;
  featured: boolean;
  new: boolean;
  sale: boolean;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*");
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setProducts(products.filter(product => product.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }
    
    if (error) {
      return <ProductsErrorState error={error} onRetry={fetchProducts} />;
    }
    
    if (filteredProducts.length === 0) {
      return <EmptyProductsState />;
    }
    
    return <ProductsTable products={filteredProducts} onDelete={handleDelete} />;
  };

  return (
    <div>
      <ProductsHeader />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      {renderContent()}
    </div>
  );
};

export default ProductsPage;
