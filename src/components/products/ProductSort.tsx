
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductSort = ({ value, onChange }: ProductSortProps) => {
  return (
    <div className="flex items-center">
      <span className="text-sm mr-2">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] h-9 text-sm">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Featured</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductSort;
