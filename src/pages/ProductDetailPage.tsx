
import { useParams } from "react-router-dom";
import { useProductData } from "@/hooks/useProductData";
import LoadingState from "@/components/product/LoadingState";
import ProductNotFound from "@/components/product/ProductNotFound";
import ProductDetail from "@/components/product/ProductDetail";
import RelatedProducts from "@/components/product/RelatedProducts";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, relatedProducts, loading } = useProductData(id);

  if (loading) {
    return <LoadingState />;
  }

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
