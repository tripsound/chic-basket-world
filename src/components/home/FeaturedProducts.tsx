
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import { mapDatabaseProductToProduct } from "@/utils/productMapper";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("featured", true)
          .limit(4);

        if (error) {
          console.error("Error fetching featured products:", error);
        } else {
          // Transform the data to match the Product interface
          const mappedProducts = data.map(mapDatabaseProductToProduct);
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-brand-100">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Featured Products</h2>
          <Link
            to="/products?featured=true"
            className="flex items-center text-sm font-medium text-accent hover:underline transition-all"
          >
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <ProductGrid 
          products={products} 
          loading={loading} 
          emptyMessage="No featured products available."
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
