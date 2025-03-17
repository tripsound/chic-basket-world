
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import AddToCartForm from "@/components/product/AddToCartForm";
import ProductTabs from "@/components/product/ProductTabs";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState(id ? getProductById(id) : undefined);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Browse All Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* Product Info */}
        <div>
          <ProductInfo product={product} />
          <AddToCartForm product={product} />
          <ProductTabs />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
