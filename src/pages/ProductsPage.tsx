
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/products";
import { mapDatabaseProductToProduct } from "@/utils/productMapper";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductList from "@/components/products/ProductList";
import ProductSort from "@/components/products/ProductSort";
import MobileFilters from "@/components/products/MobileFilters";

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    searchParams.get("category") || undefined
  );
  const [searchQuery, setSearchQuery] = useState<string | undefined>(
    searchParams.get("search") || undefined
  );
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get("featured") === "true");
  const [newOnly, setNewOnly] = useState(searchParams.get("new") === "true");
  const [saleOnly, setSaleOnly] = useState(searchParams.get("sale") === "true");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*");
        
        if (error) {
          console.error("Error fetching products:", error);
          throw error;
        }

        if (data) {
          const mappedProducts: Product[] = data.map(mapDatabaseProductToProduct);
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setCategoryFilter(searchParams.get("category") || undefined);
    setSearchQuery(searchParams.get("search") || undefined);
    setFeaturedOnly(searchParams.get("featured") === "true");
    setNewOnly(searchParams.get("new") === "true");
    setSaleOnly(searchParams.get("sale") === "true");
  }, [location.search]);

  useEffect(() => {
    let filtered = [...products];
    
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    if (featuredOnly) {
      filtered = filtered.filter(product => product.featured);
    }
    
    if (newOnly) {
      filtered = filtered.filter(product => product.new);
    }
    
    if (saleOnly) {
      filtered = filtered.filter(product => product.sale);
    }
    
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    if (sortOption === "price-asc") {
      filtered = [...filtered].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortOption === "price-desc") {
      filtered = [...filtered].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }
    
    setFilteredProducts(filtered);
  }, [products, categoryFilter, searchQuery, featuredOnly, newOnly, saleOnly, priceRange, sortOption]);

  const categories = [
    { id: "men", name: "Men" },
    { id: "women", name: "Women" },
    { id: "shoes", name: "Shoes" },
    { id: "accessories", name: "Accessories" }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setCategoryFilter(categoryFilter === categoryId ? undefined : categoryId);
  };

  const resetFilters = () => {
    setCategoryFilter(undefined);
    setFeaturedOnly(false);
    setNewOnly(false);
    setSaleOnly(false);
    setPriceRange([0, 500]);
  };

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results: "${searchQuery}"`;
    }
    if (categoryFilter) {
      return categories.find(c => c.id === categoryFilter)?.name || 'Products';
    }
    if (featuredOnly) return 'Featured Products';
    if (newOnly) return 'New Arrivals';
    if (saleOnly) return 'Sale Items';
    return 'All Products';
  };

  return (
    <div className="container-custom py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">{getPageTitle()}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 lg:w-72 shrink-0 hidden md:block">
          <div className="sticky top-24">
            <FilterSidebar
              categories={categories}
              categoryFilter={categoryFilter}
              featuredOnly={featuredOnly}
              newOnly={newOnly}
              saleOnly={saleOnly}
              priceRange={priceRange}
              onCategoryChange={handleCategoryClick}
              onFeaturedChange={setFeaturedOnly}
              onNewChange={setNewOnly}
              onSaleChange={setSaleOnly}
              onPriceChange={setPriceRange}
              onResetFilters={resetFilters}
            />
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <MobileFilters
              categories={categories}
              categoryFilter={categoryFilter}
              featuredOnly={featuredOnly}
              newOnly={newOnly}
              saleOnly={saleOnly}
              priceRange={priceRange}
              onCategoryChange={handleCategoryClick}
              onFeaturedChange={setFeaturedOnly}
              onNewChange={setNewOnly}
              onSaleChange={setSaleOnly}
              onPriceChange={setPriceRange}
              onResetFilters={resetFilters}
            />

            <ProductSort
              value={sortOption}
              onChange={setSortOption}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="hidden md:flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </div>
            <ProductSort
              value={sortOption}
              onChange={setSortOption}
            />
          </div>

          <ProductList
            products={filteredProducts}
            loading={loading}
            resetFilters={resetFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
