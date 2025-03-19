
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProductNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-custom py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
      <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
      <Button onClick={() => navigate('/products')}>
        Browse All Products
      </Button>
    </div>
  );
};

export default ProductNotFound;
