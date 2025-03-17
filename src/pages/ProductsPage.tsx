
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Filter, CheckCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { products, filterProducts } from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [filteredProducts, setFilteredProducts] = useState(products);
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

  // Update filters when URL params change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setCategoryFilter(searchParams.get("category") || undefined);
    setSearchQuery(searchParams.get("search") || undefined);
    setFeaturedOnly(searchParams.get("featured") === "true");
    setNewOnly(searchParams.get("new") === "true");
    setSaleOnly(searchParams.get("sale") === "true");
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let filtered = filterProducts(categoryFilter, searchQuery, featuredOnly, newOnly, saleOnly);
    
    // Apply price range
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply sorting
    if (sortOption === "price-asc") {
      filtered = [...filtered].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortOption === "price-desc") {
      filtered = [...filtered].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }
    
    setFilteredProducts(filtered);
  }, [categoryFilter, searchQuery, featuredOnly, newOnly, saleOnly, priceRange, sortOption]);

  // Categories for the sidebar
  const categories = [
    { id: "men", name: "Men" },
    { id: "women", name: "Women" },
    { id: "shoes", name: "Shoes" },
    { id: "accessories", name: "Accessories" }
  ];

  // Handler for category filter clicking
  const handleCategoryClick = (categoryId: string) => {
    setCategoryFilter(categoryFilter === categoryId ? undefined : categoryId);
  };

  // Reset all filters
  const resetFilters = () => {
    setCategoryFilter(undefined);
    setFeaturedOnly(false);
    setNewOnly(false);
    setSaleOnly(false);
    setPriceRange([0, 500]);
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`block w-full text-left px-2 py-1 rounded-md transition-colors ${
                categoryFilter === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={featuredOnly}
              onCheckedChange={(checked) => setFeaturedOnly(checked === true)}
            />
            <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
              Featured Items
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new"
              checked={newOnly}
              onCheckedChange={(checked) => setNewOnly(checked === true)}
            />
            <label htmlFor="new" className="text-sm font-medium cursor-pointer">
              New Arrivals
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sale"
              checked={saleOnly}
              onCheckedChange={(checked) => setSaleOnly(checked === true)}
            />
            <label htmlFor="sale" className="text-sm font-medium cursor-pointer">
              Sale Items
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
        <div className="flex justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Button onClick={resetFilters} variant="outline" className="w-full">
        Reset Filters
      </Button>
    </div>
  );

  // Page title based on filters
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
        {/* Desktop Sidebar */}
        <div className="w-full md:w-64 lg:w-72 shrink-0 hidden md:block">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center">
              <span className="text-sm mr-2">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm border rounded-md p-1"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Desktop Sort */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-2">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm border rounded-md p-1"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search criteria
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group block overflow-hidden transition-all hover:shadow-lg rounded-lg bg-white"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {product.sale && (
                      <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                        Sale
                      </span>
                    )}
                    
                    {product.new && !product.sale && (
                      <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-base md:text-lg mb-1 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      {product.sale && product.salePrice ? (
                        <>
                          <span className="font-medium text-accent">${product.salePrice.toFixed(2)}</span>
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
