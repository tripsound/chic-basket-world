
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { ArrowRight } from "lucide-react";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

const RelatedProducts = ({ products, currentProductId }: RelatedProductsProps) => {
  if (products.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16 pt-12 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">You May Also Like</h2>
        <Link 
          to="/products" 
          className="flex items-center text-sm text-accent hover:underline"
        >
          View all products
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link 
            key={product.id}
            to={`/products/${product.id}`}
            className="group block overflow-hidden transition-all hover:shadow rounded-sm bg-white"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Product badge (Sale or New) */}
              {product.sale && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 text-xs font-medium">
                  Sale
                </span>
              )}
              
              {product.new && !product.sale && (
                <span className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 text-xs font-medium">
                  New
                </span>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-gray-900 mb-1">
                {product.name}
              </h3>
              <div className="flex items-center">
                {product.sale && product.salePrice ? (
                  <>
                    <span className="font-medium text-red-500">${product.salePrice.toFixed(2)}</span>
                    <span className="ml-2 text-xs text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="font-medium text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Simple rating display */}
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`block w-2 h-2 rounded-full mr-0.5 ${star <= 3 ? 'bg-gray-400' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
