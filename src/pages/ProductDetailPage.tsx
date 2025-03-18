import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import AddToCartForm from "@/components/product/AddToCartForm";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import BreadcrumbNav from "@/components/navigation/Breadcrumb";
import { Product } from "@/data/products";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Fetch the product from Supabase
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching product:", error);
          throw error;
        }

        if (data) {
          // Transform the data to match the Product interface
          const mappedProduct: Product = {
            id: data.id,
            name: data.name,
            description: data.description,
            price: parseFloat(String(data.price)),
            category: data.category as 'men' | 'women' | 'shoes' | 'accessories',
            images: data.images,
            colors: Array.isArray(data.colors) 
              ? data.colors.map((c: any) => typeof c === 'object' ? c.name : c)
              : [],
            sizes: Array.isArray(data.sizes) 
              ? data.sizes.map((s: any) => typeof s === 'object' ? s.name : s)
              : [],
            featured: Boolean(data.featured),
            new: Boolean(data.new),
            sale: Boolean(data.sale),
            salePrice: data.sale_price ? parseFloat(String(data.sale_price)) : undefined,
          };

          setProduct(mappedProduct);
          
          // Fetch related products
          const { data: relatedData, error: relatedError } = await supabase
            .from("products")
            .select("*")
            .eq("category", data.category)
            .neq("id", id)
            .limit(4);

          if (relatedError) {
            console.error("Error fetching related products:", relatedError);
          } else {
            // Transform the related products to match the Product interface
            const mappedRelated: Product[] = relatedData.map((item) => ({
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
            setRelatedProducts(mappedRelated);
          }
        }
      } catch (error) {
        toast.error("Failed to load product");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container-custom py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

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

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product?.name ?? "" }
  ];

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav items={breadcrumbItems} />
      
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
      
      {/* Related Products Section */}
      <RelatedProducts products={relatedProducts} currentProductId={product.id} />
    </div>
  );
};

export default ProductDetailPage;
