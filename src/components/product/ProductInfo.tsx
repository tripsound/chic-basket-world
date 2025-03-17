
import { Product } from "@/data/products";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      
      {product.sale ? (
        <div className="mb-4">
          <span className="text-xl font-semibold text-accent">${product.salePrice?.toFixed(2)}</span>
          <span className="ml-2 text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
        </div>
      ) : (
        <div className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</div>
      )}
      
      <p className="text-muted-foreground mb-6 text-sm">{product.description}</p>
    </div>
  );
};

export default ProductInfo;
