
import { Link } from "react-router-dom";
import { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  emptyMessage?: string;
}

const ProductGrid = ({ products, loading, emptyMessage = "No products available." }: ProductGridProps) => {
  if (loading) {
    return (
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
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
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
            
            {product.new && !product.sale && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                New
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
  );
};

export default ProductGrid;
