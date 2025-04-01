
import { Button } from "@/components/ui/button";

interface ProductsErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ProductsErrorState = ({ error, onRetry }: ProductsErrorStateProps) => {
  return (
    <div className="text-center py-12 bg-white rounded-md shadow">
      <p className="text-lg text-red-500 mb-4">{error}</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
};

export default ProductsErrorState;
