
import { Product } from "@/data/products";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import AddToCartForm from "./AddToCartForm";
import ProductTabs from "./ProductTabs";
import BreadcrumbNav from "@/components/navigation/Breadcrumb";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.name }
  ];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav items={breadcrumbItems} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* Product Info */}
        <div>
          <ProductInfo product={product} />
          <AddToCartForm product={product} />
          <ProductTabs 
            details={product.details} 
            care={product.care} 
            shipping={product.shipping} 
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
