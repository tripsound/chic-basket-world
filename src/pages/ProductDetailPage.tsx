
import { useParams } from "react-router-dom";
import { useProductData } from "@/hooks/useProductData";
import LoadingState from "@/components/product/LoadingState";
import ProductNotFound from "@/components/product/ProductNotFound";
import ProductDetail from "@/components/product/ProductDetail";
import RelatedProducts from "@/components/product/RelatedProducts";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, relatedProducts, loading: dataLoading } = useProductData(id);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Always show loading for exactly 2 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading state for exactly 2 seconds
  if (showLoading) {
    return <LoadingState />;
  }

  // After loading time, if no product found, show not found
  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <div className="container-custom py-8 md:py-12">
      <ProductDetail product={product} />
      
      {/* Related Products Section */}
      <RelatedProducts products={relatedProducts} currentProductId={product.id} />
    </div>
  );
};

export default ProductDetailPage;
