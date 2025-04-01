
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmptyProductsState = () => {
  return (
    <div className="text-center py-12 bg-white rounded-md shadow">
      <p className="text-lg text-gray-500 mb-4">No products found</p>
      <Button asChild>
        <Link to="/admin/products/new">Add Your First Product</Link>
      </Button>
    </div>
  );
};

export default EmptyProductsState;
