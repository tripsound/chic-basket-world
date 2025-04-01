
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import { mapDatabaseProductToProduct } from "@/utils/productMapper";

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("new", true)
          .limit(4);

        if (error) {
          console.error("Error fetching new products:", error);
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
    <section className="py-20">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">New Arrivals</h2>
          <Link
            to="/products?new=true"
            className="flex items-center text-sm font-medium text-accent hover:underline transition-all"
          >
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <ProductGrid 
          products={products} 
          loading={loading} 
          emptyMessage="No new arrivals available."
        />
      </div>
    </section>
  );
};

export default NewArrivals;
