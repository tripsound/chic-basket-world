import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/products";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch featured products
        const { data: featuredData, error: featuredError } = await supabase
          .from("products")
          .select("*")
          .eq("featured", true)
          .limit(4);

        if (featuredError) {
          console.error("Error fetching featured products:", featuredError);
        } else {
          // Transform the data to match the Product interface
          const mappedFeatured: Product[] = featuredData.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: parseFloat(String(item.price)),
            category: item.category as 'men' | 'women' | 'shoes' | 'accessories',
            images: item.images,
            colors: Array.isArray(item.colors)
              ? item.colors.map((c: any) => typeof c === 'object' ? c.name : c)
              : [],
            sizes: Array.isArray(item.sizes)
              ? item.sizes.map((s: any) => typeof s === 'object' ? s.name : s)
              : [],
            featured: Boolean(item.featured),
            new: Boolean(item.new),
            sale: Boolean(item.sale),
            salePrice: item.sale_price ? parseFloat(String(item.sale_price)) : undefined,
          }));
          setFeaturedProducts(mappedFeatured);
        }

        // Fetch new products
        const { data: newData, error: newError } = await supabase
          .from("products")
          .select("*")
          .eq("new", true)
          .limit(4);

        if (newError) {
          console.error("Error fetching new products:", newError);
        } else {
          // Transform the data to match the Product interface
          const mappedNew: Product[] = newData.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: parseFloat(String(item.price)),
            category: item.category as 'men' | 'women' | 'shoes' | 'accessories',
            images: item.images,
            colors: Array.isArray(item.colors)
              ? item.colors.map((c: any) => typeof c === 'object' ? c.name : c)
              : [],
            sizes: Array.isArray(item.sizes)
              ? item.sizes.map((s: any) => typeof s === 'object' ? s.name : s)
              : [],
            featured: Boolean(item.featured),
            new: Boolean(item.new),
            sale: Boolean(item.sale),
            salePrice: item.sale_price ? parseFloat(String(item.sale_price)) : undefined,
          }));
          setNewArrivals(mappedNew);
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
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww"
            alt="Fashion Model"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Elevate Your Everyday Style
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Discover our latest collection of timeless essentials designed for the modern wardrobe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/products?category=women">Shop Women</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
                <Link to="/products?category=men">Shop Men</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Women", image: "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww", link: "/products?category=women" },
              { name: "Men", image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", link: "/products?category=men" },
              { name: "Shoes", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", link: "/products?category=shoes" },
              { name: "Accessories", image: "https://images.unsplash.com/photo-1624623278313-a930126a11c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", link: "/products?category=accessories" },
            ].map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group block relative overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-serif text-2xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
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

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-lg animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No featured products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group block overflow-hidden transition-all hover:shadow-lg rounded-lg bg-white"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    
                    {product.sale && (
                      <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                        Sale
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-accent transition-colors">
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
      </section>

      {/* New Arrivals */}
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

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-lg animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : newArrivals.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No new products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newArrivals.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group block overflow-hidden transition-all hover:shadow-lg rounded-lg bg-white"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      New
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-accent transition-colors">
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
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-brand-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-brand-200 mb-8">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md bg-brand-700 border border-brand-600 text-white placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <Button className="bg-accent hover:bg-accent/90 text-white" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
