
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ProductsHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Products</h1>
      <Button asChild>
        <Link to="/admin/products/new">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Link>
      </Button>
    </div>
  );
};

export default ProductsHeader;
