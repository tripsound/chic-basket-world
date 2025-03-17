
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'shoes' | 'accessories';
  images: string[];
  colors: string[];
  sizes: string[];
  featured: boolean;
  new: boolean;
  sale: boolean;
  salePrice?: number;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic Cotton T-Shirt",
    description: "A timeless cotton t-shirt featuring a classic fit and exceptional comfort. Perfect for everyday wear and easy to style with any outfit.",
    price: 35.99,
    category: "men",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    new: false,
    sale: false
  },
  {
    id: "p2",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with a touch of stretch for maximum comfort. Features a classic five-pocket design and a versatile mid-rise waist.",
    price: 89.99,
    category: "men",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1626394437673-7d5e71b914ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    colors: ["Blue", "Black", "Light Wash"],
    sizes: ["28", "30", "32", "34", "36"],
    featured: false,
    new: true,
    sale: false
  },
  {
    id: "p3",
    name: "Cashmere Sweater",
    description: "Luxuriously soft cashmere sweater with ribbed trim and a relaxed fit. Perfect for layering during cooler months.",
    price: 199.99,
    salePrice: 159.99,
    category: "women",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    colors: ["Cream", "Gray", "Black", "Camel"],
    sizes: ["XS", "S", "M", "L"],
    featured: true,
    new: false,
    sale: true
  },
  {
    id: "p4",
    name: "Silk Blouse",
    description: "Elegant silk blouse with a relaxed fit and hidden button front. Perfect for both office wear and evening occasions.",
    price: 129.99,
    category: "women",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    colors: ["White", "Black", "Blush", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
    new: true,
    sale: false
  },
  {
    id: "p5",
    name: "Leather Sneakers",
    description: "Handcrafted leather sneakers with exceptional comfort and durability. Features a cushioned insole and premium construction.",
    price: 149.99,
    salePrice: 119.99,
    category: "shoes",
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    colors: ["White", "Black", "Brown"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    featured: true,
    new: false,
    sale: true
  },
  {
    id: "p6",
    name: "Leather Belt",
    description: "Premium full-grain leather belt with a classic brushed silver buckle. Handcrafted for durability and timeless style.",
    price: 79.99,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1624623278313-a930126a11c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    colors: ["Brown", "Black", "Tan"],
    sizes: ["S", "M", "L"],
    featured: false,
    new: false,
    sale: false
  },
  {
    id: "p7",
    name: "Wool Coat",
    description: "Timeless wool coat with a classic silhouette. Features a button front, notched lapels, and a back vent for ease of movement.",
    price: 299.99,
    category: "women",
    images: [
      "https://images.unsplash.com/photo-1548624313-0396c75d8772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1574108233269-86d1bec3b722?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    colors: ["Camel", "Black", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    new: true,
    sale: false
  },
  {
    id: "p8",
    name: "Leather Boots",
    description: "Classic leather boots crafted with premium materials. Features a comfortable stacked heel and durable construction for years of wear.",
    price: 249.99,
    salePrice: 199.99,
    category: "shoes",
    images: [
      "https://images.unsplash.com/photo-1608256497843-67f2ef9048b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    colors: ["Brown", "Black"],
    sizes: ["6", "7", "8", "9", "10"],
    featured: false,
    new: false,
    sale: true
  }
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to get related products
export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const currentProduct = getProductById(productId);
  
  if (!currentProduct) {
    return [];
  }
  
  // Find products in the same category, excluding the current product
  return products
    .filter(product => 
      product.id !== productId && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
};

// Helper function to filter products by category and search
export const filterProducts = (
  categoryFilter?: string,
  searchQuery?: string,
  featuredOnly: boolean = false,
  newOnly: boolean = false,
  saleOnly: boolean = false
): Product[] => {
  return products.filter(product => {
    // Apply category filter if present
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    
    // Apply search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      const matchesCategory = product.category.toLowerCase().includes(query);
      
      if (!matchesName && !matchesDescription && !matchesCategory) {
        return false;
      }
    }
    
    // Apply featured filter if enabled
    if (featuredOnly && !product.featured) {
      return false;
    }
    
    // Apply new filter if enabled
    if (newOnly && !product.new) {
      return false;
    }
    
    // Apply sale filter if enabled
    if (saleOnly && !product.sale) {
      return false;
    }
    
    return true;
  });
};
